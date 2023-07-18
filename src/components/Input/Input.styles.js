import { css, styled } from "styled-components";
import { flex, selector, size, typography } from "styles/mixins";

const variantStyle = ({ variant, theme: { palettes } }) => {
  const { focus } = palettes.blue;

  switch (variant) {
    case "outline":
      return css`
        ${selector("borderColor", { focus })}

        ${selector("color", { focus })}
      `;

    default:
      return;
  }
};

const baseStyle = ({ size: _size = "medium", theme: { sizes, colors, shadows } }) => {
  return css`
    border: 1px solid ${colors.gray2};

    box-shadow: ${shadows.drop1};
    // 글씨 색상
    color: ${colors.gray4};

    ${flex.center()}

    ${size({ height: sizes.height[_size] })}
  
    padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}

    transition: 300ms;

    &::placeholder {
      color: ${colors.gray2};
    }
  `;
};

export const Input = styled.input`
  ${props => baseStyle(props)}
  ${props => variantStyle(props)}
`;
