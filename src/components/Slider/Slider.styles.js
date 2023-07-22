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
    border-radius: 15px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  `}
`;

export const SliderContainer = styled.div`
  display: flex;
  min-width: ${props => props.sliceWidth}px;
  position: relative;
`;

export const Container = styled.div`
  width: ${({ contentWidth, space, showContentNum }) =>
    contentWidth * showContentNum + space * 2}px;
  overflow: hidden;
  position: relative;
`;

export const ContainerBlock = styled.div`
  ${flex.center()}
`;

export const Button = styled.button`
  ${({ theme, position }) => css`
    position: absolute;
    top: 25px;
    ${position}: 10px;

    width: 22px;
    height: 22px;
    border: none;
    padding: 20px 0;
    background-color: ${hexToRgba(theme.colors.gray3, 0.3)};
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${theme.palettes.blue.base};
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`;

export const CardContents = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 0 0 15px 15px;
`;

export const ImgBox = styled.div`
  ${props => css`
    position: relative;
    width: ${props.contentWidth}px;
    padding: 0 ${props.space}px;
    cursor: pointer;
    overflow: hidden;
    height: 200px; // 고정된 높이로 변경하세요.
  `}
`;

export const IntroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
