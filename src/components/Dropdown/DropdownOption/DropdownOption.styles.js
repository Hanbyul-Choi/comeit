import { css, styled } from "styled-components";
import { flex, selector, typography } from "styles/mixins";
import { hexToRgba } from "styles/utils/hexToRgba";

const containerStyle = ({ theme: { palettes, sizes }, size = "medium" }) => css`
  ${flex({ align: "center" })}

  height: ${sizes.height[size]}px;

  padding: 0 ${sizes.padding[size]}px;

  ${selector("backgroundColor", { hover: hexToRgba(palettes.blue.base, 0.2) })}

  ${typography(sizes.paragraph[size])}

  cursor: pointer;
`;

export const Container = styled.div`
  ${props => containerStyle(props)}
`;
