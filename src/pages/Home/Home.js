import { Header } from "components";
import { Container, NaverMap } from "react-naver-maps";
import * as Styled from "./Home.styles";

export const Home = () => {
  return (
    <>
      <Header />

      <Styled.Container>
        <Styled.Sidebar>사이드바</Styled.Sidebar>

        <Container style={{ flex: 1 }}>
          <NaverMap />
        </Container>
      </Styled.Container>
    </>
  );
};
