import { useQuery } from "@tanstack/react-query";
import { fetchData } from "api/contents";
import culture from "assets/categories/culture.png";
import game from "assets/categories/game.png";
import language from "assets/categories/language.png";
import social from "assets/categories/social.png";
import sports from "assets/categories/sports.png";
import travel from "assets/categories/travel.png";
import { Input, Slider, useDialog } from "components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCenter } from "redux/modules/centerSlice";
import { Flex } from "styles/mixins";
import * as Styled from "./Sidebar.styles";

export const Sidebar = ({ openDetail }) => {
  const SliderArr = [sports, game, travel, culture, language, social];
  const { Alert } = useDialog();

  const { data } = useQuery(["contents"], fetchData);
  const dispatch = useDispatch();

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

      <Slider showContentNum={3} space={5} contents={SliderArr} />

      <Styled.PostContainer>
        {filteredData?.map(content => {
          return (
            <Styled.Link
              to={`/home/${content.id}`}
              key={content.id}
              onClick={() => onClickContent(content.location)}
            >
              <div>
                <Styled.ContentImg src={content.groupImgUrl} alt={content.groupName} />
              </div>
              <Flex>
                <div>
                  <Styled.ContentBox>{content.groupName}</Styled.ContentBox>
                  <Styled.ContentBox>{content.meetingDate}</Styled.ContentBox>
                  <Styled.ContentBox>{content.meetingPlace}</Styled.ContentBox>
                </div>
              </Flex>
            </Styled.Link>
          );
        })}
      </Styled.PostContainer>
    </Styled.SidebarWrapper>
  );
};
