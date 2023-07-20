import PlaceImage from "assets/svgs/addLocation.svg";
import { Button } from "components/Button";
import { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const ClickedMarker = ({ position, openPost }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [position]);
  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: PlaceImage,
          size: {
            width: 48,
            height: 49
          }
        }}
        clickable
        onClick={() => setIsOpen(prev => !prev)}
      />
      {isOpen && (
        <CustomOverlayMap position={position} clickable>
          <OverlayContainer>
            <Button size="medium" onClick={openPost}>
              생성
            </Button>
          </OverlayContainer>
        </CustomOverlayMap>
      )}
    </>
  );
};

const OverlayContainer = styled.div`
  box-sizing: border-box;
  ${flex.center({ direction: "column" })}
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 10px;

      border-radius: 10px;
    `} 
  position: absolute;
  top: -110px;
  left: -35px;
`;
