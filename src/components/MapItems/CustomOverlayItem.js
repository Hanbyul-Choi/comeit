import { Button } from "components/Button";

import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { FlexCenter } from "styles/mixins";
import * as Styled from "./Map.styles";

export const CustomOverlayItem = ({ title, position, auth = false }) => {
  return (
    <CustomOverlayMap position={position} clickable>
      <Styled.OverlayContainer>
        <Styled.ThumbnailContainer>
          <Styled.OverlayTitle>{title}</Styled.OverlayTitle>
        </Styled.ThumbnailContainer>
        {/* 추후 uid와 data.uid를 비교하는 삼항연산자를 쓸것 */}
        {auth ? (
          <FlexCenter gap={20}>
            <Button variant="cancel">삭제</Button>
            <Button variant="confirm">수정</Button>
            <Button variant="confirm">상세</Button>
          </FlexCenter>
        ) : (
          <Styled.BtnBoxTwo>
            <Button variant="confirm">상세</Button>
          </Styled.BtnBoxTwo>
        )}
      </Styled.OverlayContainer>
    </CustomOverlayMap>
  );
};
