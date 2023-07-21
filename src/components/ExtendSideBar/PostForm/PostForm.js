import { useMutation } from "@tanstack/react-query";
import arrowPrev from "assets/svgs/arrowPrev.svg";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import { Input } from "components/Input";
import { useDialog } from "components/Overlay";
import { Textarea } from "components/Textarea";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useInput } from "hooks";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, storage } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./PostForm.styles";

export const PostForm = ({ closePost }) => {
  const { Alert } = useDialog();
  const navigate = useNavigate();
  const [groupName, onChangeGroupName] = useInput();
  const [meetingDate, onChangeMeetingDate] = useInput();
  const [meetingPlace, onChangeMeetingPlace] = useInput();
  const [groupContact, onChangeGroupContact] = useInput();
  const [meetingNumber, onChangeMeetingNumber] = useInput();
  const [category, setCategory] = useState(null);
  const [groupIntro, onChangeGroupIntro] = useInput();
  const [attachment, setAttachment] = useState("");

  const { user } = useSelector(state => state.user);
  useEffect(() => {
    if (!user) {
      Alert("로그인 후 이용 가능합니다.");
      navigate("/home");
    }
  }, [user, navigate, Alert]);

  const Post = async () => {
    const attachmentRef = ref(storage, `${user.id}/${Date.now()}`);
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
      uid: user.id
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
      Alert("게시물이 등록되었습니다.");
      closePost();
    },
    onError: error => {
      Alert.alert("Error", error.message);
    }
  });

  const submitHandler = event => {
    event.preventDefault();
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
            type="date"
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
            <Dropdown.DropdownMain />
            <Dropdown.Option value="운동/스포츠">운동/스포츠</Dropdown.Option>
            <Dropdown.Option value="게임">게임</Dropdown.Option>
            <Dropdown.Option value="아웃도어/여행">아웃도어/여행</Dropdown.Option>
            <Dropdown.Option value="문화/공연">문화/공연</Dropdown.Option>
            <Dropdown.Option value="외국/언어">외국/언어</Dropdown.Option>
            <Dropdown.Option value="친목">친목</Dropdown.Option>
          </Dropdown>

          <Textarea placeholder="모임 소개" value={groupIntro} onChange={onChangeGroupIntro} />
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
