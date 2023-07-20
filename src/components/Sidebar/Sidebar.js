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

const CategoryArr = [sports, game, travel, culture, language, social];

export const Sidebar = () => {
<<<<<<< HEAD
  // 1. 파이어스토어에 있는 post 전체를 가져오는 함수를 만든다. (비동기함수)
=======
  const SliderArr = [sports, game, travel, culture, language, social];
>>>>>>> 0bc1e064e7c9ec1c8d2d36387bb8af24cae3f8f6
  // 2. 리액트 쿼리(useQuery)를 사용해서 그 함수를 실행시킨다.
  // 3. data를 추출해서 map메서드로 리스트를 생성한다.

  const { data } = useQuery(["contents"], fetchData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const filterData = () => {
    let filteredData = data;

    if (searchTerm) {
      filteredData = filteredData.filter(content =>
        content.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredData = filteredData.filter(content => {
        console.log("카테고리", content.category);
        console.log("배열 인덱스", selectedCategory);
        return content.category === selectedCategory;
      });
    }

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

      <Slider
        showContentNum={3}
        space={5}
        contents={CategoryArr}
        onClickHandler={handleCategoryClick}
      />

      <Styled.PostContainer>
        {filteredData?.map(content => {
          return (
            <Link to={`/home/${content.id}`} key={content.id}>
              <div>
                <div>{content.groupName}</div>
                <div>{content.meeingDate}</div>
                <div>{content.meetingPlace}</div>
              </div>
            </Link>
          );
        })}
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
