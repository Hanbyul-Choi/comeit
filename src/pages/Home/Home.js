import { ClickedMarker, Header, MarkerItem, PostForm, Show, Sidebar } from "components";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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
  const data = useSelector(state => state.center);

  const MapClickHandler = (_t, e) => {
    setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    setSelected(null);
  };
  const currentUrl = useLocation();

  // const [extendtype, setExtendtype] = useState("");
  // const [showExtend, setshowExtend] = useState("");

  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar />
        {currentUrl.pathname !== "/home" && currentUrl.pathname.includes("post") ? (
          <PostForm />
        ) : (
          <Show />
        )}
        <Map center={data} style={{ width: "100%", height: "100%" }} onClick={MapClickHandler}>
          {TMP.map(marker => (
            <MarkerItem
              key={marker.title}
              data={marker}
              onClick={() => setSelected(marker.title)}
              selected={selected}
            />
          ))}
          <ClickedMarker position={position} />
        </Map>
      </Styled.Container>
    </>
  );
};
