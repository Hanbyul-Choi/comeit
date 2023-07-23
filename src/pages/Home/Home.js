import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import plusbutton from "assets/pngs/post_plus.png";
import { ClickedMarker, Header, MarkerItem, PostForm, Show, Sidebar, useDialog } from "components";
import { useMount } from "hooks";
import { getData } from "hooks/api";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCenter, setPlace, setPostPosition } from "redux/modules/mapSlice";
import * as Styled from "./Home.styles";

export const Home = () => {
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const { Alert } = useDialog();
  const { location, currentUser } = useSelector(({ center, user }) => ({
    location: center.center,
    currentUser: user.user
  }));

  const [showPost, setShowPost] = useState(false);
  const [showDetail, setShowDeatil] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const currentUrl = useLocation();
  const { isLoading, data } = useQuery(["marker"], fetchData);

  const MapClickHandler = async (_t, e) => {
    setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    setSelected(null);

    if (showPost) {
      const address = await getData({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
      dispatch(setPlace(address));
      dispatch(setPostPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() }));
    }
  };

  const openPost = () => {
    if (!currentUser) return Alert("로그인 후 이용 가능합니다.");

    if (currentUrl.pathname.includes("edit")) {
      return;
    }

    setShowDeatil(false);
    setShowPost(true);
    navigate("/home");
  };

  useMount(() => {
    if (params.contentid) {
      openDetail();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        posi => dispatch(setCenter({ lat: posi.coords.latitude, lng: posi.coords.longitude })),
        () => Alert("현재위치를 불러올 수 없습니다.")
      );
    } else {
      Alert("geolocation을 사용할 수 없습니다.");
    }
  });

  const openDetail = () => {
    setShowPost(false);
    setShowDeatil(true);
  };

  const closeDetail = () => {
    setShowDeatil(false);
    navigate("/home");
  };

  const closePost = () => {
    setPosition({});
    setShowPost(false);
    navigate("/home");
  };

  const postButtonClick = () => {
    dispatch(setPlace(null));
    openPost();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar openDetail={openDetail} />
        {showDetail && <Show id={params.contentid} closeDetail={closeDetail} openPost={openPost} />}
        {showPost && <PostForm closePost={closePost} openDetail={openDetail} />}
        <Map center={location} style={{ width: "100%", height: "100%" }} onClick={MapClickHandler}>
          {data.map(marker => {
            return (
              <MarkerItem
                key={marker.postId}
                data={marker}
                open={openDetail}
                onClick={() => setSelected(marker.groupName)}
                selected={selected}
              />
            );
          })}
          <ClickedMarker openPost={openPost} position={position} />
        </Map>
        <Styled.PlusButton onClick={postButtonClick}>
          <img src={plusbutton} alt="게시물 등록" style={{ width: "80px" }} />
        </Styled.PlusButton>
      </Styled.Container>
    </>
  );
};
