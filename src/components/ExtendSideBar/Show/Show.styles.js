import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { size } from "styles/mixins";
import { sizes } from "styles/theme/sizes";

export const Sidebar = styled.div`
  width: 300px;
`;
export const ExtendSidebar = styled.div`
  /* width: 300px; */
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}

  background-color: lightblue;
  padding: ${sizes.padding.medium}px;
`;
export const ContentBox = styled.div`
  width: 280px;
  height: 30px;
`;
export const ContentImg = styled.img`
  width: 280px;
  height: 200px;
  overflow: hidden;
`;
