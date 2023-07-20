import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { useDialog } from "components/Overlay";
import { Textarea } from "components/Textarea";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, storage } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./PostForm.styles";

export const PostForm = () => {
  const { Alert } = useDialog();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [groupContact, setGroupContact] = useState("");
  const [meetingNumber, setMeetingNumber] = useState("");
  const [groupIntro, setGroupIntro] = useState("");
  const [attachment, setAttachment] = useState("");

  const { id } = useSelector(state => state.user);

  const Post = async () => {
    const attachmentRef = ref(storage, `${id}/${Date.now()}`);
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
      time: Date.now()
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
      setGroupName("");
      setMeetingDate("");
      setMeetingPlace("");
      setGroupContact("");
      setMeetingNumber("");
      setGroupIntro("");

      Alert("게시물이 등록되었습니다.");
      navigate("/home");
    },
    onError: error => {
      Alert.alert("Error", error.message);
    }
  });
  const onGroupNameChangeHandler = event => {
    setGroupName(event.target.value);
  };
  const onMeetingDateChangeHandler = event => {
    setMeetingDate(event.target.value);
  };
  const onMeetingPlaceChangeHandler = event => {
    setMeetingPlace(event.target.value);
  };
  const onGroupContactChangeHandler = event => {
    setGroupContact(event.target.value);
  };
  const onMeetingNumberChangeHandler = event => {
    setMeetingNumber(event.target.value);
  };
  const onGroupIntroChangeHandler = event => {
    setGroupIntro(event.target.value);
  };
  const submitHandler = event => {
    event.preventDefault();
    mutate();
  };

  const onCancle = () => {
    navigate("/");
  };
  return (
    <div>
      <Styled.ExtendSidebar>
        <FlexColumn gap={12} as="form" onSubmit={submitHandler}>
          <Styled.ImgBox>
            <label htmlFor="file">
              <Styled.BtnUpload>파일 업로드하기</Styled.BtnUpload>
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
            onChange={onGroupNameChangeHandler}
          />

          <Input
            variant="outline"
            placeholder="모임 날짜"
            value={meetingDate}
            onChange={onMeetingDateChangeHandler}
          />

          <Input
            variant="outline"
            placeholder="모임 장소"
            value={meetingPlace}
            onChange={onMeetingPlaceChangeHandler}
          />

          <Input
            variant="outline"
            placeholder="오픈톡방/모임주 연락처"
            value={groupContact}
            onChange={onGroupContactChangeHandler}
          />
          <Input
            type="number"
            variant="outline"
            placeholder="참여 정원"
            value={meetingNumber}
            onChange={onMeetingNumberChangeHandler}
          />

          <Textarea
            placeholder="모임 소개"
            value={groupIntro}
            onChange={onGroupIntroChangeHandler}
          />
          <FlexCenter style={{ marginTop: "15px", gap: 20 }}>
            <Button
              type="button"
              variant="outline"
              style={{ marginRight: "5px" }}
              onClick={onCancle}
            >
              취소하기
            </Button>
            <Button>모임 만들기</Button>
          </FlexCenter>
        </FlexColumn>
      </Styled.ExtendSidebar>
    </div>
  );
};
