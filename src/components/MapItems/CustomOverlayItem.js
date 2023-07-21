import { Button } from "components/Button";

import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Map.styles";

export const CustomOverlayItem = ({ title, position, postId, open }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/home/${postId}`);
    open();
  };

  return (
    <CustomOverlayMap position={position} clickable>
      <Styled.OverlayContainer>
        <Styled.ThumbnailContainer>
          <Styled.OverlayTitle>{title}</Styled.OverlayTitle>
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
