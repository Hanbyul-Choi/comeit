import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import mainImage from "assets/Intro/main1.png";
import { Header, Slider, useDialog } from "components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Intro.styles";

export const Intro = () => {
  const { isLoading, data } = useQuery(["contents"], fetchData);
  const navigate = useNavigate();
  const { currentUser } = useSelector(user => user.user);
  const { Alert } = useDialog();

  const onPostClickHandler = item => {
    if (!currentUser) Alert("로그인 후 이용가능합니다.");
    else navigate(`/posts/${item.id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Styled.Layout>
      <Header />
      <Styled.Container>
        <Styled.Img src={mainImage} alt="Intro 이미지" />
        <Styled.Box>
          <Styled.NavigateButton to="/home">동네 모임 둘러보기</Styled.NavigateButton>
        </Styled.Box>
      </Styled.Container>

      <Slider
        key={`intro-${data.uid}`}
        showContentNum={5}
        space={5}
        contents={data}
        contentWidth={250}
        onClickHandler={onPostClickHandler}
        type="intro"
      />
    </Styled.Layout>
  );
};
