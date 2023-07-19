import { Header, Sidebar } from "components";
import { Container, NaverMap } from "react-naver-maps";
import * as Styled from "./Home.styles";

export const Home = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar />

        <Container style={{ flex: 1 }}>
          <NaverMap />
        </Container>
      </Styled.Container>
    </>
  );
};
