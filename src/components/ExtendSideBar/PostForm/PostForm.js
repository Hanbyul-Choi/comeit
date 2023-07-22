import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDetail } from "api/contents";
import arrowPrev from "assets/svgs/arrowPrev.svg";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Input } from "components/Input";
import { useDialog } from "components/Overlay";
import { Textarea } from "components/Textarea";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useInput, useMount } from "hooks";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setPostion } from "redux/modules/centerSlice";
import { db, storage } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./PostForm.styles";

export const PostForm = ({ closePost }) => {
  const { Alert, Confirm } = useDialog();
  const queryClient = useQueryClient();
  const params = useParams();

  const { currentUser, place, location } = useSelector(({ user, center }) => ({
    currentUser: user.user,
    place: center.place,
    location: center.position
  }));

  const dispatch = useDispatch();

  const [groupName, onChangeGroupName, onSetgroupName] = useInput();
  const [meetingDate, onChangeMeetingDate, onSetmeetingDate] = useInput();
  const [groupContact, onChangeGroupContact, onSetgroupContact] = useInput();
  const [meetingNumber, onChangeMeetingNumber, onSetmeetingNumber] = useInput();
  const [groupIntro, onChangeGroupIntro, onSetgroupIntro] = useInput();
  const [meetingPlace, setMeetingPlace] = useState(place);
  const [category, setCategory] = useState(null);
  const [attachment, setAttachment] = useState("");
  const [fileChanged, setFileChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useMount(() => {
    const editSet = async () => {
      if (!params.contentid) {
        return;
      }
      const data = await getDetail(params.contentid);
      onSetgroupName(data.groupName);
      onSetmeetingDate(data.meetingDate);
      onSetgroupContact(data.groupContact);
      onSetmeetingNumber(data.meetingNumber);
      onSetgroupIntro(data.groupIntro);
      setMeetingPlace(data.meetingPlace);
      setAttachment(data.groupImgUrl);
      setCategory(data.category);
      dispatch(setPostion(data.location));
    };

    editSet();
  });

  useEffect(() => {
    setMeetingPlace(place);
  }, [place]);

  const Post = async () => {
    const attachmentRef = ref(storage, `${currentUser.id}/${Date.now()}`);
    await uploadString(attachmentRef, attachment, "data_url");
    const groupImgUrl = await getDownloadURL(ref(storage, attachmentRef));
    const newContent = {
      groupName,
      meetingDate,
      meetingPlace,
      groupContact,
      meetingNumber,
      groupIntro,
      groupImgUrl,
      time: Date.now(),
      category,
      location,
      uid: currentUser.id
    };
    const collectionRef = collection(db, "contents");
    addDoc(collectionRef, newContent);
  };

  const Update = async () => {
    const attachmentRef = ref(storage, `${currentUser.id}/${Date.now()}`);
    if (fileChanged) {
      await uploadString(attachmentRef, attachment, "data_url");
      setAttachment(await getDownloadURL(ref(storage, attachmentRef)));
    }

    const newContent = {
      groupName,
      meetingDate,
      meetingPlace,
      groupContact,
      meetingNumber,
      groupIntro,
      groupImgUrl: attachment,
      time: Date.now(),
      category,
      location,
      uid: currentUser.id
    };
    const collectionRef = doc(db, "contents", params.contentid);
    updateDoc(collectionRef, newContent);
  };

  const onFileChange = e => {
    setFileChanged(true);
    const {
      target: { files }
    } = e;
    if (files.length === 0) {
      onClearAttachment();
      return;
    }
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  const { mutate: postMutate } = useMutation({
    mutationFn: Post,
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]);
      queryClient.invalidateQueries(["marker"]);
      Alert("게시물이 등록되었습니다.");
      closePost();
    }
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: Update,
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]);
      queryClient.invalidateQueries(["marker"]);
      Alert("게시물이 수정되었습니다.");
      closePost();
    }
  });

  const submitHandler = async event => {
    event.preventDefault();
    if (
      groupName.trim() === "" ||
      meetingDate.trim() === "" ||
      groupContact.trim() === "" ||
      meetingNumber.trim() === "" ||
      groupIntro.trim() === "" ||
      groupName.trim() === ""
    ) {
      setErrorMessage("빈칸을 모두 작성해 주세요.");
      return;
    }
    if (category === null) {
      setErrorMessage("카테고리를 선택하세요");
      return;
    }
    if (attachment === "") {
      setErrorMessage("사진을 등록하세요");
      return;
    }

    if (meetingNumber < 2) {
      setErrorMessage("모집인원은 최소 2명입니다.");
      return;
    }
    if (!(await Confirm("이대로 등록하시겠습니까?"))) return;
    if (params.contentid) {
      updateMutate();
    } else {
      postMutate();
    }
  };

  return (
    <Styled.PostFormBlock>
      <Styled.ExtendSidebar>
        <FlexColumn gap={12} as="form" onSubmit={submitHandler}>
          <Styled.ImgBox>
            <label htmlFor="file">
              <Styled.BtnUpload>대표사진</Styled.BtnUpload>
            </label>
            <Styled.ImgInput type="file" id="file" accept="image/*" onChange={onFileChange} />
            {attachment && (
              <Styled.PreView onClick={onClearAttachment}>
                <Styled.PreViewImg src={attachment} alt="" />
              </Styled.PreView>
            )}
          </Styled.ImgBox>
          <Input
            variant="outline"
            placeholder="모임 이름"
            value={groupName}
            onChange={onChangeGroupName}
          />

          <Input
            variant="outline"
            placeholder="모임 날짜"
            type="date"
            value={meetingDate}
            onChange={onChangeMeetingDate}
          />

          <Input
            variant="outline"
            placeholder="모임 장소를 지도에서 추가해주세요."
            value={meetingPlace}
            disabled
          />

          <Input
            variant="outline"
            placeholder="오픈톡방/모임주 연락처"
            value={groupContact}
            onChange={onChangeGroupContact}
          />
          <Input
            type="number"
            variant="outline"
            placeholder="참여 정원"
            value={meetingNumber}
            onChange={onChangeMeetingNumber}
          />

          <Dropdown onChange={value => setCategory(value)}>
            <Dropdown.Option value="운동/스포츠">운동/스포츠</Dropdown.Option>
            <Dropdown.Option value="게임">게임</Dropdown.Option>
            <Dropdown.Option value="아웃도어/여행">아웃도어/여행</Dropdown.Option>
            <Dropdown.Option value="문화/공연">문화/공연</Dropdown.Option>
            <Dropdown.Option value="외국/언어">외국/언어</Dropdown.Option>
            <Dropdown.Option value="친목">친목</Dropdown.Option>
          </Dropdown>

          <Textarea placeholder="모임 소개" value={groupIntro} onChange={onChangeGroupIntro} />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <FlexCenter style={{ marginTop: "15px", gap: 5 }}>
            <Button
              type="button"
              variant="outline"
              style={{ marginRight: "5px" }}
              onClick={closePost}
            >
              취소하기
            </Button>
            <Button>{params.contentid ? "수정하기" : "모임 만들기"}</Button>
          </FlexCenter>
        </FlexColumn>
      </Styled.ExtendSidebar>
      {createPortal(
        <Styled.Button onClick={closePost}>
          <img src={arrowPrev} alt="이전버튼" />
        </Styled.Button>,
        document.getElementById("portal-root")
      )}
    </Styled.PostFormBlock>
  );
};
