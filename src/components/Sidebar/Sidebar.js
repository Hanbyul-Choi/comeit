import culture from "assets/culture.svg";
import game from "assets/game.svg";
import language from "assets/language.svg";
import social from "assets/social.svg";
import sports from "assets/sports.svg";
import travel from "assets/travel.svg";
import { Input, Slider } from "components";
import * as Styled from "./Sidebar.styles";

export const Sidebar = () => {
  const SliderArr = [
    { id: 1, imgUrl: sports },
    { id: 2, imgUrl: game },
    { id: 3, imgUrl: travel },
    { id: 4, imgUrl: culture },
    { id: 5, imgUrl: language },
    { id: 6, imgUrl: social }
  ];

  // 슬라이더 이미지 말고도 뭐든 대응되도록
  // 슬라이더 버튼 호버할때 뜨면..?

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
