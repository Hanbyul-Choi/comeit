import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { size, typography } from "styles/mixins";
import { colors } from "styles/theme/colors";
import { shadows } from "styles/theme/shadows";
import { sizes } from "styles/theme/sizes";

export const Sidebar = styled.div`
  width: 300px;
`;
export const ExtendSidebar = styled.div`
  /* width: 300px; */
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}

  background-color: white;
  box-shadow: ${shadows.drop3};
  padding: ${sizes.padding.medium}px;
`;
export const ContentBox = styled.div`
  width: 280px;
  height: 25px;
  color: ${colors.gray4};

  ${size({ height: sizes.height.small })}

  padding-left: ${sizes.padding.small}px;

  border-radius: 8px;

  ${typography(sizes.heading.medium)}
`;
export const ContentImg = styled.img`
  width: 280px;
  height: 240px;
  overflow: hidden;
`;
