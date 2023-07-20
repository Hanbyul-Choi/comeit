import { Button } from "components/Button";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { css, styled } from "styled-components";
import { FlexCenter, flex } from "styles/mixins";

export const InfoWindowItem = ({ position }) => {
  return (
    <CustomOverlayMap position={position} yAnchor={1}>
      <OverlayContainer>
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "red",
            marginBottom: "10px"
          }}
        >
          image
        </div>

        <FlexCenter
          style={{
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Button size="medium">삭제</Button>
          <Button size="medium">수정</Button>
          <Button size="medium">상세</Button>
        </FlexCenter>
      </OverlayContainer>
    </CustomOverlayMap>
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
  top: -340px;
  left: -110px;
`;
