import { ClickedMarker, Header, MarkerItem } from "components";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import * as Styled from "./Home.styles";

const TMP = [
  {
    title: "title1",

    latlng: { lat: 33.450705, lng: 126.570677 }
  },
  {
    title: "title2",

    latlng: { lat: 33.450936, lng: 126.569477 }
  },
  {
    title: "title3",

    latlng: { lat: 33.450879, lng: 126.56994 }
  },
  {
    title: "title4",

    latlng: { lat: 33.451393, lng: 126.570738 }
  }
];

export const Home = () => {
  const [position, setPosition] = useState({});
  const [selected, setSelected] = useState(null);

  const MapClickHandler = (_t, e) => {
    setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    setSelected(null);
  };
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Sidebar>사이드바</Styled.Sidebar>
        <Map
          center={{ lat: 33.45168, lng: 126.574942 }}
          style={{ width: "100%", height: "100%" }}
          onClick={MapClickHandler}
        >
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
