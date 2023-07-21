import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import all from "assets/categories/all.png";
import culture from "assets/categories/culture.png";
import game from "assets/categories/game.png";
import language from "assets/categories/language.png";
import social from "assets/categories/social.png";
import sports from "assets/categories/sports.png";
import travel from "assets/categories/travel.png";
import { Button, Input, Slider } from "components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCenter } from "redux/modules/centerSlice";
import * as Styled from "./Sidebar.styles";

const CategoryImages = [all, sports, game, travel, culture, language, social];
const CategoryNames = [all, "sports", "game", "travel", "culture", "language", "social"];

export const Sidebar = () => {
  const { data } = useQuery(["contents"], fetchData);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = categoryImage => {
    const categoryIndex = CategoryImages.indexOf(categoryImage);
    setSelectedCategory(CategoryNames[categoryIndex]);
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
        contents={CategoryImages}
        onClickHandler={handleCategoryClick}
      />

      {/* 리덕스 테스트 버튼 */}
      <Button onClick={() => dispatch(setCenter({ lat: 37.54699, lng: 127.09598 }))}>click</Button>

      <Styled.PostContainer>
        {filteredData?.map(content => {
          return (
            <Styled.Link to={`/home/${content.id}`} key={content.id}>
              <div>
                <Styled.ContentImg src={content.groupImgUrl} alt={content.groupName} />
              </div>
              <div>
                <Styled.ContentBox>{content.groupName}</Styled.ContentBox>
                <Styled.ContentBox>{content.meetingDate}</Styled.ContentBox>
                <Styled.ContentBox>{content.meetingPlace}</Styled.ContentBox>
              </div>
            </Styled.Link>
          );
        })}
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
