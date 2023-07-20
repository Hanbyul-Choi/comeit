import mainImage from "assets/Intro/main1.png";
import { Header } from "components";
import * as Styled from "./Intro.styles";

export const Intro = () => {
  return (
    <Styled.Layout>
      <Header />
      <Styled.Container>
        <Styled.Img src={mainImage} alt="Intro 이미지" />
        <Styled.Box>
          <Styled.NavigateButton to="/home">동네 모임 둘러보기</Styled.NavigateButton>
        </Styled.Box>
      </Styled.Container>
    </Styled.Layout>
  );
};
