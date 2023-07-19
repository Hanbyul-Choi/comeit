import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "server/config";
import * as Styled from "./Show.styles";

export const Show = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const snapContent = await getDoc(doc(db, "contents", "content"));
      console.log(snapContent);
      if (snapContent.exists()) {
        console.log(snapContent.data());
        setContent(snapContent.data());
      } else {
        console.log("No such document");
      }
    };

    fetchData();
  }, []);

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
