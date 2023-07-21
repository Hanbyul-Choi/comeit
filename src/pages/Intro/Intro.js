import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import mainImage from "assets/Intro/main1.png";
import { Header, Slider } from "components";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Intro.styles";

export const Intro = () => {
  const { data } = useQuery(["contents"], fetchData);
  const navigate = useNavigate();

  const onClickHandler = id => {
    // id에 따라 클릭할 데이터를 처리합니다. 예를 들어, Redux를 사용하여 상태를 저장할 수 있습니다.

    navigate("/home");
  };

  return (
    <Styled.Layout>
      <Header />
      <Styled.Container>
        <Styled.Img src={mainImage} alt="Intro 이미지" />
        <Styled.Box>
          <Styled.NavigateButton to="/home">동네 모임 둘러보기</Styled.NavigateButton>
        </Styled.Box>
      </Styled.Container>

      <div>
        <Slider showContentNum={3} space={5} contentWidth={data} onClickHandler={onClickHandler} />
      </div>
    </Styled.Layout>
  );
};
