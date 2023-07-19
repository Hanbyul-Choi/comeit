import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const Img = styled.img`
  ${props => css`
    width: ${props.contentWidth}px;
    padding: 0 ${props.space}px;
  `}
`;

export const SliderContainer = styled.div`
  display: flex;
  min-width: ${props => props.sliceWidth}px;
`;

export const Container = styled.div`
  width: ${({ contentWidth, space, showContentNum }) =>
    (contentWidth + space / 2 - space) * showContentNum}px;
  overflow: hidden;
  position: relative;
`;

export const ContainerBlock = styled.div`
  ${flex.center()}
  gap: 12px;
`;

export const Button = styled.button`
  ${({ theme }) => css`
    width: 22px;
    height: 22px;
    border: 1px solid ${theme.palettes.blue.base};
    color: ${theme.palettes.blue.base};
    background-color: ${theme.colors.white};
    border-radius: 5px;
    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: ${theme.palettes.blue.base};
      color: ${theme.colors.white};
    }
  `}
`;
