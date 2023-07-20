import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "server/config";
import * as Styled from "./Show.styles";

export const Show = () => {
  const [content, setContent] = useState("");
  const params = useParams().contentid;

  useEffect(() => {
    const fetchData = async () => {
      if (!params) return;
      const snapContent = await getDoc(doc(db, "contents", params));
      if (snapContent.exists()) {
        setContent(snapContent.data());
      } else {
        console.log("No such document");
      }
    };
    fetchData();
  }, [params]);

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
