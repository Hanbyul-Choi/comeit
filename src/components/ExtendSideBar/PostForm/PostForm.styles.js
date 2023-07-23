import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { theme } from "styles/theme";
import { colors } from "styles/theme/colors";
import { sizes } from "styles/theme/sizes";

export const PostFormBlock = styled.div`
  ${flex({ align: "center", justify: "center" })}
`;
export const ExtendSidebar = styled.div`
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}
  border-left: 1px solid ${theme.colors.gray2};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  padding: ${sizes.padding.medium}px;
`;

export const ImgBox = styled.div`
  ${flex({ align: "center", justify: "center" })}
  width: 17.2rem;
  height: 14rem;

  background-color: ${colors.gray2};
  border-radius: 10px;

  position: relative;
`;

export const PreView = styled.div`
  cursor: pointer;
`;

export const PreViewImg = styled.img`
  position: absolute;

  width: 17.2rem;
  height: 14rem;

  top: 0px;
  right: 0px;
  border-radius: 10px;
  object-fit: cover;
  &:hover {
    border: 1px solid black;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const BtnUpload = styled.div`
  ${flex({ align: "center", justify: "center" })}

  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: 500;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: ${theme.palettes.blue.hover};
    color: ${theme.colors.white};
  }
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 634px;
  z-index: 1;

  width: 22px;
  height: 70px;
  border: none;
  padding: 20px 0;
  background-color: ${colors.white};
  border-radius: 0 5px 5px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${theme.palettes.blue.hover};
  }

  img {
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
