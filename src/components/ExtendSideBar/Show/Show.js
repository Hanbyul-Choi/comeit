import { Label } from "components/Label";
import { deleteDoc, doc } from "firebase/firestore";
import { createPortal } from "react-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDetail } from "api/contents";
import arrowPrev from "assets/buttonIcon/arrowPrev.svg";
import { Button } from "components/Button";
import { useDialog } from "components/Overlay";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { db } from "server/config";
import { FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./Show.styles";

export const Show = ({ id, closeDetail, openPost }) => {
  const { Confirm } = useDialog();
  const params = useParams();
  const queryClient = useQueryClient();
  const [data, setData] = useState(null);

  const { currentUser } = useSelector(({ user }) => ({ currentUser: user.user }));
  const navigate = useNavigate();
  // const { data } = useQuery(["detail"], () => getDetail(id));

  useEffect(() => {
    const test = async () => {
      setData(await getDetail(id));
    };
    test();
  }, [id]);

  const Delete = () => {
    deleteDoc(doc(db, "contents", params.contentid));
  };

  const { mutate } = useMutation({
    mutationFn: Delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["contents"]);
      closeDetail();
    }
  });

  const onUpdate = () => {
    openPost();
    navigate(`/edit/${id}`);
  };
  const onDelete = async () => {
    if (!(await Confirm("게시물을 삭제하시겠습니까?"))) return;
    mutate();
  };

  return (
    <div>
      <Styled.ExtendSidebar>
        {data && (
          <FlexColumn gap={3}>
            <FlexCenter>
              <Styled.ContentImg src={data.groupImgUrl} alt={data.groupName} />
            </FlexCenter>
            <Label variant="variant">작성자</Label>
            <Styled.ContentBox>{data.uid}</Styled.ContentBox>
            <Label variant="variant">모임 이름</Label>
            <Styled.ContentBox>{data.groupName}</Styled.ContentBox>
            <Label variant="variant">모임 날짜</Label>
            <Styled.ContentBox>{data.meetingDate}</Styled.ContentBox>
            <Label variant="variant">모임 장소</Label>
            <Styled.ContentBox>{data.meetingPlace}</Styled.ContentBox>
            <Label variant="variant">오픈톡방/모임주 연락처</Label>
            <Styled.ContentBox>{data.groupContact}</Styled.ContentBox>
            <Label variant="variant">모집 정원</Label>
            <Styled.ContentBox>{data.meetingNumber}</Styled.ContentBox>
            <Label variant="variant">모임 소개</Label>
            <Styled.ContentBox>{data.groupIntro}</Styled.ContentBox>
            {currentUser.id === data.uid && (
              <Styled.Btns>
                <Button onClick={() => onUpdate(params.contentid)}>수정</Button>
                <Button onClick={onDelete}>삭제</Button>
              </Styled.Btns>
            )}
          </FlexColumn>
        )}
      </Styled.ExtendSidebar>
      {createPortal(
        <Styled.Button onClick={closeDetail}>
          <img src={arrowPrev} alt="이전버튼" />
        </Styled.Button>,
        document.getElementById("portal-root")
      )}
    </div>
  );
};
