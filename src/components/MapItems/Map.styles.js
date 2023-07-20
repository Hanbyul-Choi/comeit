import { css, styled } from "styled-components";
import { flex, position } from "styles/mixins";

export const ClickedOverlayContainer = styled.div`
  ${flex.center({ direction: "column" })}
  ${position.absolute({ top: "-110px", left: "-35px" })};
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
    `}
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
  top: -220px;
  left: -110px;
`;

export const ThumbnailContainer = styled.div`
  width: 200px;
  height: 100px;
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
