import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { size, typography } from "styles/mixins";
import { theme } from "styles/theme";
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
  height: 25px;
  color: ${colors.gray4};

  ${size({ height: sizes.height.small })}

  padding: 0 ${sizes.padding.small}px;

  border-radius: 8px;

  ${typography(sizes.heading.medium)}
`;
export const ContentImg = styled.img`
  width: 280px;
  height: 240px;
  overflow: hidden;
`;
export const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 635px;
  z-index: 1;

  width: 22px;
  height: 22px;
  border: none;
  padding: 20px 0;
  background-color: ${theme.colors.gray3};
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
`;
