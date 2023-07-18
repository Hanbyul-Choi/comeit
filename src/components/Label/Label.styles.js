import { css, styled } from "styled-components";
import { size, typography } from "styles/mixins";

const variantStyle = ({ variant, theme: { colors, shadows } }) => {
  // variant에 따라 스타일을 정의
  switch (variant) {
    case "text":
      return css`
        box-shadow: ${shadows.drop1};
        // 글씨 색상
        color: ${colors.gray3};
      `;

    default:
      return;
  }
};

const baseStyle = ({ size: _size = "small", theme: { sizes } }) => {
  return css`
    ${size({ height: sizes.height[_size] })}

    padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}

    transition: 300ms;
  `;
};

export const Label = styled.label`
  ${props => baseStyle(props)}
  ${props => variantStyle(props)}
`;
