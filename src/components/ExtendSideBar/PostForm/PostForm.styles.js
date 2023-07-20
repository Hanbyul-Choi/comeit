import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { size } from "styles/mixins";
import { theme } from "styles/theme";
import { sizes } from "styles/theme/sizes";

export const Sidebar = styled.div`
  width: 300px;
`;
export const ExtendSidebar = styled.div`
  /* width: 300px; */
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}

  /* background-color: white; */
  color: ${theme.colors.white};
  padding: ${sizes.padding.medium}px;
`;
