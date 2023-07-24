import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetail } from "api/contents";
import arrowPrev from "assets/svgs/arrowPrev.svg";
import starImage from "assets/svgs/star.svg";
import starBorderImage from "assets/svgs/star_border.svg";
import { Button } from "components/Button";
import { Label } from "components/Label";
import { useDialog } from "components/Overlay";
import {
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { db } from "server/config";
import { Flex, FlexCenter, FlexColumn } from "styles/mixins";
import * as Styled from "./Show.styles";

export const Show = ({ id, closeDetail, openPost }) => {
  const { Confirm, Alert } = useDialog();
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState("");

  const [isLike, setIsLike] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [docId, setDocId] = useState("");

  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => getDetail(id),
    enabled: !!id
  });

  const { currentUser } = useSelector(({ user }) => ({ currentUser: user.user }));
  const navigate = useNavigate();

  const Delete = () => {
    deleteDoc(doc(db, "contents", id));
  };

  const { mutate } = useMutation({
    mutationFn: Delete,
    onSuccess: async () => {
      await Alert("게시물이 삭제되었습니다.");
      closeDetail();
      queryClient.invalidateQueries(["contents"]);
      queryClient.invalidateQueries(["marker"]);
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

  const handleLike = async () => {
    if (isLike) {
      await deleteDoc(doc(db, "likes", docId));
      setIsLike(false);
    } else {
      setDocId(`${id}-${Date.now()}`);
      await setDoc(doc(db, "likes", `${id}-${Date.now()}`), { postId: id, uid: currentUser.id });
      setIsLike(true);
    }
    queryClient.invalidateQueries(["detail", id]);
    queryClient.invalidateQueries(["markerIcon", id]);
  };

  useEffect(() => {
    const loadIsLiked = async postId => {
      if (id === undefined) return;
      const q = query(
        collection(db, "likes"),
        and(where("postId", "==", postId), where("uid", "==", currentUser.id))
      );
      const document = await getDocs(q);
      if (document.size) {
        setIsLike(true);
        document.forEach(el => {
          setDocId(el.id);
        });
      } else {
        setIsLike(false);
      }
    };
    if (currentUser) {
      loadIsLiked(id);
    }
  }, [currentUser, id]);

  useEffect(() => {
    const loadLikes = async postId => {
      if (id === undefined) return;
      const q = query(collection(db, "likes"), where("postId", "==", postId));
      const snapShot = await getDocs(q);
      setLikeNum(snapShot.size);
    };
    loadLikes(id);
  }, [currentUser?.id, id, isLike]);

  useEffect(() => {
    const loadUser = async postId => {
      if (id === undefined) return;
      const document = await getDoc(doc(db, "contents", postId));
      const querySnapshot = await getDoc(doc(db, "users", document.data().uid));
      setNickname(querySnapshot.data().nickname);
    };
    loadUser(id);
  }, [id]);
  if (id === undefined) {
    closeDetail();
  }

  return (
    <div>
      <Styled.ExtendSidebar>
        {data && (
          <FlexColumn gap={3}>
            <FlexCenter>
              <Styled.ContentImg src={data.groupImgUrl} alt={data.groupName} />
            </FlexCenter>
            <Styled.UpperContent>
              <FlexColumn gap={3}>
                <Label variant="variant">작성자</Label>
                <Styled.ContentBox>{nickname}</Styled.ContentBox>
              </FlexColumn>
              <Flex align="center">
                <Styled.LikedNum>찜 {likeNum}</Styled.LikedNum>
                <Styled.StarIcon
                  onClick={handleLike}
                  src={isLike ? starImage : starBorderImage}
                  alt={data.postId}
                />
              </Flex>
            </Styled.UpperContent>

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
                <Button onClick={() => onUpdate(id)}>수정</Button>
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
