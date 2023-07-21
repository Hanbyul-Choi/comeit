import { css, styled } from "styled-components";
import { flex, position } from "styles/mixins";

export const PlusButton = styled.button`
  ${position.absolute({ top: "-90px", left: "-20px" })};
`;
export const OverlayContainer = styled.div`
  box-sizing: border-box;
  ${flex.center({ direction: "column" })}
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 10px;

      border-radius: 10px;
    `} 
  position: absolute;
  top: -170px;
  left: -80px;
`;

export const ThumbnailContainer = styled.div`
  width: 150px;
  height: 50px;
  margin-bottom: 10px;
`;

export const OverlayTitle = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
`;

export const BtnBoxTwo = styled.div`
  ${flex({ justify: "end" })}
  width: 100%;
`;
