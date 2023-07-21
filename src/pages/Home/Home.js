import plusbutton from "assets/svgs/add_circle3.svg";
import { ClickedMarker, Header, MarkerItem, PostForm, Show, Sidebar, useDialog } from "components";
import { useMount } from "hooks";

import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCenter } from "redux/modules/centerSlice";
import * as Styled from "./Home.styles";

const TMP = [
  {
    title: "title1",
    category: "game",
    latlng: { lat: 33.450705, lng: 126.570677 }
  },
  {
    title: "title2",
    category: "trip",
    latlng: { lat: 33.450936, lng: 126.569477 }
  },
  {
    title: "title3",
    category: "language",
    latlng: { lat: 33.450879, lng: 126.56994 }
  },
  {
    title: "title4",
    category: "culture",
    latlng: { lat: 33.451393, lng: 126.570738 }
  }
];

export const Home = () => {
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const { data, currentUser } = useSelector(({ center, user }) => ({
    data: center.center,
    currentUser: user.user
  }));
  const [showPost, setShowPost] = useState(false);
  const [showDetail, setShowDeatil] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

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

  useMount(() => {
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
  };

  const closePost = () => {
    setShowPost(false);
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar openDetail={openDetail} />
        {showDetail && <Show id={params.contentid} closeDetail={closeDetail} />}
        {showPost && <PostForm closePost={closePost} />}
        <Map center={data} style={{ width: "100%", height: "100%" }} onClick={MapClickHandler}>
          {TMP.map(marker => (
            <MarkerItem
              key={marker.title}
              data={marker}
              onClick={() => setSelected(marker.title)}
              selected={selected}
            />
          ))}
          <ClickedMarker closePost={closePost} openPost={openPost} position={position} />
        </Map>
        <Styled.PlusButton>
          <img src={plusbutton} alt="게시물 등록" style={{ width: "80px" }} />
        </Styled.PlusButton>
      </Styled.Container>
    </>
  );
};
