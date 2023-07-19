import { css, styled } from "styled-components";
import { flex } from "styles/mixins";
import { hexToRgba } from "styles/utils";

export const SlideItem = styled.div`
  ${props => css`
    width: ${props.contentWidth}px;
    padding: 0 ${props.space}px;
    cursor: pointer;
  `}
`;

export const Img = styled.img`
  ${props => css`
    width: ${props.contentWidth}px;
    padding: 0 ${props.space}px;
    border-radius: 10px;
  `}
`;

export const SliderContainer = styled.div`
  display: flex;
  min-width: ${props => props.sliceWidth}px;
  position: relative;
`;

export const Container = styled.div`
  /* width: ${({ contentWidth, space, showContentNum }) =>
    (contentWidth + space / 2 - space) * showContentNum}px; */

  width: ${({ contentWidth, space, showContentNum }) =>
    contentWidth * showContentNum + space * 2}px;
  overflow: hidden;
  position: relative;
`;

export const ContainerBlock = styled.div`
  ${flex.center()}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    width: 22px;
    height: 22px;
    border: none;
    color: ${theme.colors.white};
    background-color: ${hexToRgba(theme.colors.gray3, 0.3)};
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${theme.palettes.blue.base};
      color: ${theme.colors.white};
    }
  `}

  &.prev {
    position: absolute;
    left: 10px;
    top: 35px;
  }
  &.next {
    position: absolute;
    right: 10px;
    top: 35px;
  }
`;
