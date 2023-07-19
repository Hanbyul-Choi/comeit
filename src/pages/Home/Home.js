import { Header } from "components";
import { Post } from "components/ExtendSideBar";
import { Show } from "components/ExtendSideBar/Show/Show";
import { useState } from "react";
import { Container, NaverMap } from "react-naver-maps";
import * as Styled from "./Home.styles";

export const Home = () => {
  const [extendtype, setExtendtype] = useState("");
  // const [showExtend, setshowExtend] = useState("");

  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Sidebar>사이드바</Styled.Sidebar>

        {/* {showExtend && extendtype === "post" ? <Post /> : <Show />}         */}
        {/* {extendtype === "post" ? <Post /> : <Show />} */}
        <Post />
        <Show />
        <Container style={{ flex: 1 }}>
          <NaverMap />
        </Container>
      </Styled.Container>
    </>
  );
};
