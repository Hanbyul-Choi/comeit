import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { theme } from "styles/theme";
import { sizes } from "styles/theme/sizes";

export const Sidebar = styled.div`
  width: 300px;
`;
export const ExtendSidebar = styled.div`
  /* width: 300px; */
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}
  ${flex({ justify: "center" })}
  /* background-color: white; */
  color: ${theme.colors.white};
  padding: ${sizes.padding.medium}px;
`;

export const ImgBox = styled.div`
  ${flex({ align: "center", justify: "center" })}
  width: 17.2rem;
  height: 14rem;
  background-color: #d9d9d9;
  border-radius: 10px;
  position: relative;
`;
export const PreView = styled.div`
  ${flex({ align: "center", justify: "center" })}
  cursor: pointer;
`;

export const PreViewImg = styled.img`
  ${flex({ align: "center", justify: "center" })}
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

export const RemoveImg = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const BtnUpload = styled.div`
  ${flex({ align: "center", justify: "center" })}
  width: 150px;
  height: 30px;
  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;
