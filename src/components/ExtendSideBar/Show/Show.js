import { Label } from "components/Label";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import arrowPrev from "assets/buttonIcon/arrowPrev.svg";
import { db } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./Show.styles";

export const Show = ({ id }) => {
  const [content, setContent] = useState("");
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const snapContent = await getDoc(doc(db, "contents", id));
      if (snapContent.exists()) {
        setContent(snapContent.data());
      } else {
        console.log("No such document");
      }
    };
    fetchData();
  }, [id]);
  // getPostUser(content.uid);

  return (
    <div>
      <Styled.ExtendSidebar>
        {content && (
          <FlexColumn gap={3}>
            <FlexCenter>
              <Styled.ContentImg src={content.groupImgUrl} alt={content.groupName} />
            </FlexCenter>
            <Label variant="variant">작성자</Label>
            <Styled.ContentBox>{content.uid}</Styled.ContentBox>
            <Label variant="variant">모임 이름</Label>
            <Styled.ContentBox>{content.groupName}</Styled.ContentBox>
            <Label variant="variant">모임 날짜</Label>
            <Styled.ContentBox>{content.meetingDate}</Styled.ContentBox>
            <Label variant="variant">모임 장소</Label>
            <Styled.ContentBox>{content.meetingPlace}</Styled.ContentBox>
            <Label variant="variant">오픈톡방/모임주 연락처</Label>
            <Styled.ContentBox>{content.groupContact}</Styled.ContentBox>
            <Label variant="variant">모집 정원</Label>
            <Styled.ContentBox>{content.meetingMember}</Styled.ContentBox>
            <Label variant="variant">모임 소개</Label>
            <Styled.ContentBox>{content.groupIntro}</Styled.ContentBox>
          </FlexColumn>
        )}
      </Styled.ExtendSidebar>
      {createPortal(
        <Styled.Button>
          <img src={arrowPrev} alt="이전버튼" />
        </Styled.Button>,
        document.getElementById("portal-root")
      )}
    </div>
  );
};
