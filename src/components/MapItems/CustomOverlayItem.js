import { Button } from "components/Button";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { css, styled } from "styled-components";
import { FlexCenter, flex } from "styles/mixins";

export const CustomOverlayItem = ({ title, position, auth = true }) => {
  return (
    <CustomOverlayMap position={position} clickable>
      <OverlayContainer>
        <ThumbnailContainer>
          <OverlayTitle>{title}</OverlayTitle>
        </ThumbnailContainer>
        {/* 추후 uid와 data.uid를 비교하는 삼항연산자를 쓸것 */}
        {auth ? (
          <FlexCenter gap={20}>
            <Button>삭제</Button>
            <Button>수정</Button>
            <Button>상세</Button>
          </FlexCenter>
        ) : (
          <FlexCenter
            style={{
              width: "100%",
              justifyContent: "flex-end"
            }}
          >
            <Button size="medium">상세</Button>
          </FlexCenter>
        )}
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
  top: -220px;
  left: -110px;
`;

const ThumbnailContainer = styled.div`
  width: 200px;
  height: 100px;
  margin-bottom: 10px;
`;

const OverlayTitle = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
`;
