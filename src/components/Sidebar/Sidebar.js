import culture from "assets/culture.png";
import game from "assets/game.png";
import language from "assets/language.png";
import social from "assets/social.png";
import sports from "assets/sports.png";
import travel from "assets/travel.png";
import { Input, Slider } from "components";
import * as Styled from "./Sidebar.styles";

export const Sidebar = () => {
  const SliderArr = [sports, game, travel, culture, language, social];

  // 🌟슬라이더 이미지 말고도 뭐든 대응되도록

  // 🌟슬라이더 버튼 호버할때 뜨면..?
  // 슬라이드 끝에 도달했을때 버튼 사라지도록

  // 🌟슬라이더 우측에 잘리는 부분이 마음에 안든다 => 계산 수정
  // 🌟이미지에도 매번 이렇게 space와 contentWidth props를 내려줘야하는건지..

  // 공용 컴포넌트는 common에 옮기면 안되나?

  return (
    <Styled.SidebarWrapper>
      <Styled.SearchContainer>
        <Input placeholder="검색어를 입력해 주세요" />
      </Styled.SearchContainer>

      <Slider showContentNum={3} space={5} contents={SliderArr} />

      <Styled.PostContainer>
        <li style={{ border: "1px solid black" }}>게시물1</li>
        <li style={{ border: "1px solid black" }}>게시물2</li>
        <li style={{ border: "1px solid black" }}>게시물3</li>
        <li style={{ border: "1px solid black" }}>게시물4</li>
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
