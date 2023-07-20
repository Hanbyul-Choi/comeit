import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import culture from "assets/categories/culture.png";
import game from "assets/categories/game.png";
import language from "assets/categories/language.png";
import social from "assets/categories/social.png";
import sports from "assets/categories/sports.png";
import travel from "assets/categories/travel.png";
import { Input, Slider } from "components";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Sidebar.styles";

export const Sidebar = () => {
  const SliderArr = [sports, game, travel, culture, language, social];
  // 1. 파이어스토어에 있는 post 전체를 가져오는 함수를 만든다. (비동기함수)
  // 2. 리액트 쿼리(useQuery)를 사용해서 그 함수를 실행시킨다.
  // 3. data를 추출해서 map메서드로 리스트를 생성한다.

  const { data } = useQuery(["contents"], fetchData);

  const [searchTerm, setSearchTerm] = useState("");

  const filterData = () => {
    if (!searchTerm) {
      return data;
    }

    const filteredData = data.filter(content =>
      content.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredData;
  };

  const filteredData = filterData();

  return (
    <Styled.SidebarWrapper>
      <Input
        placeholder="검색어를 입력해 주세요"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Slider showContentNum={3} space={5} contents={SliderArr} />

      <Styled.PostContainer>
        {filteredData?.map(content => {
          return (
            <Link to={`/home/${content.id}`} key={content.id}>
              <div>{content.groupName}</div>
              <div>{content.meeingDate}</div>
              <div>{content.meetingPlace}</div>
            </Link>
          );
        })}
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
