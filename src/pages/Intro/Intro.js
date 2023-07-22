import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import mainImage from "assets/Intro/main1.png";
import badEmotion from "assets/svgs/bad_emotion.svg";
import { Header, Label, Slider, useDialog } from "components";
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
    else navigate(`/home/${item.id}`);
  };

  const todayDate = new Date();
  const todayYear = todayDate.getFullYear();
  const todayMonth = String(todayDate.getMonth() + 1).padStart(2, "0");
  const todayDay = String(todayDate.getDate()).padStart(2, "0");
  const today = `${todayYear}-${todayMonth}-${todayDay}`;

  const filteredData = data && data.filter(item => item.meetingDate === today);

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

      {filteredData.length > 0 ? (
        <Styled.TodayBox>
          <Label style={{ color: "black", marginBottom: "10px" }}>TODAY’S MEETING</Label>
          <Styled.SliderBox>
            <Slider
              key={`intro-${data && data.uid}`}
              showContentNum={5}
              space={10}
              contents={filteredData}
              contentWidth={300}
              onClickHandler={onPostClickHandler}
              type="intro"
            />
          </Styled.SliderBox>
        </Styled.TodayBox>
      ) : (
        <Styled.TodayBox>
          <Label style={{ color: "black", marginBottom: "10px" }}>TODAY’S MEETING</Label>
          <Styled.SliderBox>
            <Styled.TodayEmpty>
              <img src={badEmotion} alt="모임없음" />
              <p>오늘은 활동하는 모임이 없어요</p>
            </Styled.TodayEmpty>
          </Styled.SliderBox>
        </Styled.TodayBox>
      )}
    </Styled.Layout>
  );
};
