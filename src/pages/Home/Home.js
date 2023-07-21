import { useQuery } from "@tanstack/react-query";
import { getMarkers } from "api/contents";
import { ClickedMarker, Header, MarkerItem, PostForm, Show, Sidebar, useDialog } from "components";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Styled from "./Home.styles";

export const Home = () => {
  const { Alert } = useDialog();
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState(null);
  const { location, currentUser } = useSelector(({ center, user }) => ({
    location: center.center,
    currentUser: user.user
  }));
  const [showPost, setShowPost] = useState(false);
  const [showDetail, setShowDeatil] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { isLoading, data } = useQuery(["marker"], getMarkers);
  const MapClickHandler = (_t, e) => {
    setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    setSelected(null);
  };

  const openPost = () => {
    if (!currentUser) return Alert("로그인 후 이용가능합니다.");
    setShowDeatil(false);
    setShowPost(true);
    navigate("/home");
  };

  const openDetail = () => {
    setShowPost(false);
    setShowDeatil(true);
  };

  const closeDetail = () => {
    setShowDeatil(false);
  };

  const closePost = () => {
    setShowPost(false);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar openDetail={openDetail} />
        {showDetail && <Show id={params.contentid} closeDetail={closeDetail} openPost={openPost} />}
        {showPost && <PostForm closePost={closePost} />}
        <Map center={location} style={{ width: "100%", height: "100%" }} onClick={MapClickHandler}>
          {data.map(marker => (
            <MarkerItem
              key={marker.title}
              data={marker}
              onClick={() => setSelected(marker.title)}
              selected={selected}
            />
          ))}
          <ClickedMarker closePost={closePost} openPost={openPost} position={position} />
        </Map>
      </Styled.Container>
    </>
  );
};
