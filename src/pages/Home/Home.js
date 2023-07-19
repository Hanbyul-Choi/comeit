import { Header } from "components";
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import * as Styled from "./Home.styles";

export const Home = () => {
  const [position, setPosition] = useState({
    center: { lat: 33.45168, lng: 126.574942 },
    isPanto: false
  });
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Sidebar>사이드바</Styled.Sidebar>
        <Map
          center={position.center}
          isPanto={position.isPanto}
          style={{ width: "100%", height: "100%" }}
        >
          <div>
            <button
              onClick={() => {
                setPosition({
                  center: { lat: 33.45058, lng: 126.574942 },
                  isPanto: true
                });
              }}
            >
              이동
            </button>
          </div>
        </Map>
      </Styled.Container>
    </>
  );
};
