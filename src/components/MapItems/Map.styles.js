import { css, styled } from "styled-components";
import { flex, position } from "styles/mixins";
import { shadows } from "styles/theme/shadows";

export const PlusButton = styled.button`
  ${position.absolute({ top: "-90px", left: "-19px" })};
`;
export const OverlayContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 13px;

      border-radius: 10px;
      box-shadow: ${shadows.drop3};
    `}
  position: absolute;
  top: -185px;
  left: -81px;
`;

export const ThumbnailContainer = styled.div`
  width: 140px;
  height: 80px;
  margin-bottom: 10px;
`;
export const CategoryImg = styled.img`
  height: 30px;
`;

export const OverlayTitle = styled.h2`
  ${({ theme }) => css`
    top: 10px;
    left: 10px;

    padding-top: 10px;

    overflow: auto;
    white-space: pre-wrap;
    line-height: 1.3;

    color: ${theme.colors.gray4};
  `}
`;

export const BtnBoxTwo = styled.div`
  ${flex({ justify: "end" })}
  width: 100%;
`;
export const DetailButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.gray3};

    &:hover {
      color: ${theme.colors.black};
    }
  `}
`;
