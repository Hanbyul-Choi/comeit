import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import { all, culture, game, language, social, sports, travel } from "assets/categories";
import { Button, Input, Slider } from "components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCenter } from "redux/modules/centerSlice";
import * as Styled from "./Sidebar.styles";

const CategoryImages = [
  { name: "전체", image: all },
  { name: "운동/스포츠", image: sports },
  { name: "게임", image: game },
  { name: "아웃도어/여행", image: travel },
  { name: "문화/공연", image: culture },
  { name: "외국/언어", image: language },
  { name: "친목", image: social }
];

export const Sidebar = ({ openDetail }) => {
  const { data } = useQuery(["contents"], fetchData);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterData = () => {
    let filteredData = [];

    if (data) {
      filteredData = data;
    }

    if (searchTerm) {
      filteredData = filteredData.filter(content =>
        content.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "전체") {
      filteredData = filteredData.filter(content => content.category === selectedCategory);
    }

    return filteredData;
  };

  const filteredData = filterData();

  const handleCategoryClick = categoryImage => {
    const clickedCategory = CategoryImages.find(category => category.image === categoryImage);

    setSelectedCategory(currentCategory => {
      return currentCategory === clickedCategory.name ? null : clickedCategory.name;
    });
  };

  const getDisplayCategoryText = () => {
    const currentCategory = CategoryImages.find(category => category.name === selectedCategory);
    return selectedCategory && currentCategory ? currentCategory.name : "전체";
  };

  const onClickContent = location => {
    if (!localStorage.getItem("user")) {
      Alert("로그인 후 확인 가능 합니다.");
      return;
    }
    dispatch(setCenter(location));
    openDetail();
  };

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
        contents={CategoryImages.map(category => category.image)}
        onClickHandler={handleCategoryClick}
      />

      {/* 리덕스 테스트 버튼 */}
      <Button onClick={() => dispatch(setCenter({ lat: 37.54699, lng: 127.09598 }))}>click</Button>
      <p>{getDisplayCategoryText()}</p>
      <Styled.PostContainer>
        {filteredData.length === 0 ? (
          <Styled.NoResultMessage>검색 결과가 없습니다</Styled.NoResultMessage>
        ) : (
          filteredData.map(content => {
            return (
              <Styled.Link
                to={`/home/${content.id}`}
                key={content.id}
                onClick={() => onClickContent(content.location)}
              >
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
          })
        )}
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
