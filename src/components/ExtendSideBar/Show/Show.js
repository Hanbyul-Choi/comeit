import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./Show.styles";

export const Show = ({ id }) => {
  const [content, setContent] = useState("");

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

  return (
    <div>
      <Styled.ExtendSidebar>
        {content && (
          <FlexColumn gap={12}>
            <FlexCenter>
              <Styled.ContentImg src={content.groupImgUrl} alt={content.groupName} />
            </FlexCenter>
            <Styled.ContentBox>{content.groupName}</Styled.ContentBox>
            <Styled.ContentBox>{content.meetingDate}</Styled.ContentBox>
            <Styled.ContentBox>{content.meetingPlace}</Styled.ContentBox>
            <Styled.ContentBox>{content.groupContact}</Styled.ContentBox>
            <Styled.ContentBox>{content.groupIntro}</Styled.ContentBox>
            <Styled.ContentBox>{content.meetingMember}</Styled.ContentBox>
          </FlexColumn>
        )}
      </Styled.ExtendSidebar>
    </div>
  );
};
