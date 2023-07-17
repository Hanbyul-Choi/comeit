import { css, styled } from "styled-components";
import { flex, selector, size, typography } from "styles/mixins";
import { hexToRgba } from "styles/utils/hexToRgba";

const variantStyle = ({ variant, theme: { colors, palettes, shadows } }) => {
  const { base, hover, active } = palettes.blue;

  switch (variant) {
    case "outline":
      return css`
        border: 1px solid ${base};
        ${selector("borderColor", { hover, active })}

        box-shadow: ${shadows.drop1};

        color: ${base};
        ${selector("color", { hover, active })}
      `;

    case "hover":
      return css`
        ${selector("backgroundColor", { hover: hexToRgba(base, 0.1) })}

        color: ${colors.gray3};
        ${selector("color", { hover })};
      `;

    default:
      return css`
        background-color: ${base};
        ${selector("backgroundColor", { hover, active })}

        box-shadow: ${shadows.drop2};

        color: ${colors.white};
      `;
  }
};

const baseStyle = ({ size: _size = "medium", theme: { sizes } }) => {
  return css`
    ${flex.center()}

    ${size({ height: sizes.height[_size] })}

    padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}

    ${selector("opacity", { disabled: 0.5 })}

    transition: 300ms;
  `;
};

export const Button = styled.button`
  ${props => baseStyle(props)}
  ${props => variantStyle(props)}
`;