import { ClickedMarker, Header, MarkerItem, PostForm, Show, Sidebar } from "components";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
<<<<<<< HEAD
import { useNavigate, useParams } from "react-router-dom";
=======
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
>>>>>>> 0f4ef46cc3f5c0e4f200b40750366719335e4ce6
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
<<<<<<< HEAD
  const [showPost, setshowPost] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
=======
  const data = useSelector(state => state.center);
>>>>>>> 0f4ef46cc3f5c0e4f200b40750366719335e4ce6

  const MapClickHandler = (_t, e) => {
    setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    setSelected(null);
  };
  const currentUrl = useLocation();

<<<<<<< HEAD
  const openPost = () => {
    setshowPost(true);
    navigate("/home");
  };
  const closePost = () => {
    setshowPost(false);
  };
=======
  // const [extendtype, setExtendtype] = useState("");
  // const [showExtend, setshowExtend] = useState("");
>>>>>>> 0f4ef46cc3f5c0e4f200b40750366719335e4ce6

  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar />
<<<<<<< HEAD
        {params && !showPost && <Show id={params.contentid} />}
        {showPost && <PostForm closePost={closePost} />}
        <Map
          center={{ lat: 33.45168, lng: 126.574942 }}
          style={{ width: "100%", height: "100%" }}
          onClick={MapClickHandler}
        >
=======
        {currentUrl.pathname !== "/home" && currentUrl.pathname.includes("post") ? (
          <PostForm />
        ) : (
          <Show />
        )}
        <Map center={data} style={{ width: "100%", height: "100%" }} onClick={MapClickHandler}>
>>>>>>> 0f4ef46cc3f5c0e4f200b40750366719335e4ce6
          {TMP.map(marker => (
            <MarkerItem
              key={marker.title}
              data={marker}
              onClick={() => setSelected(marker.title)}
              selected={selected}
            />
          ))}
          <ClickedMarker openPost={openPost} position={position} />
        </Map>
      </Styled.Container>
    </>
  );
};
