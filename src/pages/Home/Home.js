import PlaceImage from "assets/svgs/place.svg";
import { Header, InfoWindowItem } from "components";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import * as Styled from "./Home.styles";

export const Home = () => {
  const [position, setPosition] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Sidebar>사이드바</Styled.Sidebar>
        <Map
          center={{ lat: 33.45168, lng: 126.574942 }}
          style={{ width: "100%", height: "100%" }}
          onClick={(_t, e) => {
            setPosition({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
            setIsOpen(false);
          }}
        >
          <MapMarker
            position={position}
            image={{
              src: PlaceImage,
              size: {
                width: 64,
                height: 69
              }
            }}
            clickable
            onClick={() => setIsOpen(true)}
          />
          {isOpen && <InfoWindowItem position={position} />}
        </Map>
      </Styled.Container>
    </>
  );
};
