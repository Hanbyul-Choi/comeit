import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "server/config";
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
      {content && (
        <Styled.ExtendSidebar>
          <div>{content.groupName}</div>
          <div>{content.groupLeader}</div>
          <div>{content.meetingDate}</div>
          <div>{content.meetingPlace}</div>
          <div>{content.groupContact}</div>
          <div>{content.groupIntro}</div>
          <div>{content.meetingMember}</div>
        </Styled.ExtendSidebar>
      )}
    </div>
  );
};
