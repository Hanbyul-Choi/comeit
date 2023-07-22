import CommunityImage from "assets/svgs/community.svg";
import CultureImage from "assets/svgs/culture.svg";
import GameImage from "assets/svgs/game.svg";
import LanguageImage from "assets/svgs/language.svg";
import SportsImage from "assets/svgs/sports.svg";
import TripImage from "assets/svgs/trip.svg";

import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Map.styles";

const getImageByCategory = category => {
  switch (category) {
    case "운동/스포츠":
      return SportsImage;
    case "게임":
      return GameImage;
    case "아웃도어/여행":
      return TripImage;
    case "문화/공연":
      return CultureImage;
    case "외국/언어":
      return LanguageImage;
    case "친목":
      return CommunityImage;

    default:
      return null; // 디폴트 이미지 URL을 반환하거나 null을 반환합니다.
  }
};

export const CustomOverlayItem = ({ groupName, category, meetingDate, position, postId, open }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/home/${postId}`);
    open();
  };
  const svgUrl = getImageByCategory(category);

  return (
    <CustomOverlayMap position={position} clickable>
      <Styled.OverlayContainer>
        <Styled.ThumbnailContainer>
          {/* {svgUrl && <img src={svgUrl} alt={category} style={{ width: "50px" }} />} */}
          <div style={{ display: "flex" }}>
            <Styled.CategoryImg src={svgUrl} alt={category} />
            <Styled.BtnBoxTwo>
              <Styled.DetailButton onClick={handleDetail}>상세보기</Styled.DetailButton>
            </Styled.BtnBoxTwo>
          </div>

          <div>
            <Styled.OverlayTitle>{groupName}</Styled.OverlayTitle>
            <Styled.OverlayTitle>{meetingDate}</Styled.OverlayTitle>
          </div>
        </Styled.ThumbnailContainer>
      </Styled.OverlayContainer>
    </CustomOverlayMap>
  );
};
