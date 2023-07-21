import { useMutation, useQueryClient } from "@tanstack/react-query";
import arrowPrev from "assets/buttonIcon/arrowPrev.svg";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Input } from "components/Input";
import { useDialog } from "components/Overlay";
import { Textarea } from "components/Textarea";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useInput } from "hooks";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { db, storage } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./PostForm.styles";

export const PostForm = ({ closePost }) => {
  const { Alert, Confirm } = useDialog();
  const queryClient = useQueryClient();

  const { currentUser, place, location } = useSelector(({ user, center }) => ({
    currentUser: user.user,
    place: center.place,
    location: center.position
  }));
  const [groupName, onChangeGroupName] = useInput();
  const [meetingDate, onChangeMeetingDate] = useInput();
  const [meetingPlace, onChangeMeetingPlace] = useInput(place);
  const [groupContact, onChangeGroupContact] = useInput();
  const [meetingNumber, onChangeMeetingNumber] = useInput();
  const [groupIntro, onChangeGroupIntro] = useInput();
  const [category, setCategory] = useState(null);
  const [attachment, setAttachment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    await addDoc(collectionRef, newContent);
  };

  const onFileChange = e => {
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

  const { mutate } = useMutation({
    mutationFn: Post,
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]);
      Alert("게시물이 등록되었습니다.");
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
    mutate();
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
            value={meetingDate}
            onChange={onChangeMeetingDate}
          />

          <Input
            variant="outline"
            placeholder="모임 장소"
            value={meetingPlace}
            onChange={onChangeMeetingPlace}
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
            <Dropdown.Option value="sports">운동/스포츠</Dropdown.Option>
            <Dropdown.Option value="game">게임</Dropdown.Option>
            <Dropdown.Option value="travel">아웃도어/여행</Dropdown.Option>
            <Dropdown.Option value="culture">문화/공연</Dropdown.Option>
            <Dropdown.Option value="language">외국/언어</Dropdown.Option>
            <Dropdown.Option value="social">친목</Dropdown.Option>
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
            <Button>모임 만들기</Button>
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
