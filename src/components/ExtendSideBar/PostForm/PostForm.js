import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { useDialog } from "components/Overlay";
import { Textarea } from "components/Textarea";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./PostForm.styles";

export const PostForm = () => {
  const { Alert } = useDialog();
  const [groupName, setGroupName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");
  const [groupContact, setGroupContact] = useState("");
  const [meetingNumber, setMeetingNumber] = useState("");
  const [groupIntro, setGroupIntro] = useState("");

  const Post = async () => {
    const newContent = {
      groupName,
      meetingDate,
      meetingPlace,
      groupContact,
      meetingNumber,
      groupIntro
    };
    const collectionRef = collection(db, "contents");
    await addDoc(collectionRef, newContent);
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

  return (
    <div>
      <Styled.ExtendSidebar>
        <FlexColumn gap={12} as="form" onSubmit={submitHandler}>
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
          <FlexCenter style={{ marginTop: "15px" }}>
            <Button variant="outline" style={{ marginRight: "5px" }}>
              취소하기
            </Button>
            <Button type="submit">모임 만들기</Button>
          </FlexCenter>
        </FlexColumn>
      </Styled.ExtendSidebar>
    </div>
  );
};
