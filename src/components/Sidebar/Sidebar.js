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

  return (
    <Styled.SidebarWrapper>
      <Input placeholder="검색어를 입력해 주세요" />

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
