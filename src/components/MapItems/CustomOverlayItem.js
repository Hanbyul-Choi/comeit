import { Button } from "components/Button";

import SportsImage from "assets/svgs/my.svg";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Map.styles";

const getImageByCategory = category => {
  switch (category) {
    case "sports":
      return SportsImage;

    default:
      return null; // 디폴트 이미지 URL을 반환하거나 null을 반환합니다.
  }
};

export const CustomOverlayItem = ({ title, category, position, postId, open }) => {
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
          {svgUrl && <img src={svgUrl} alt={category} style={{ width: "50px" }} />}
          <Styled.OverlayTitle>{title}</Styled.OverlayTitle>
          <Styled.OverlayTitle>{category}</Styled.OverlayTitle>
        </Styled.ThumbnailContainer>
        <Styled.BtnBoxTwo>
          <Button onClick={handleDetail} variant="confirm">
            상세
          </Button>
        </Styled.BtnBoxTwo>
      </Styled.OverlayContainer>
    </CustomOverlayMap>
  );
};
