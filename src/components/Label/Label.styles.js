import { css, styled } from "styled-components";
import { size, typography } from "styles/mixins";

const baseStyle = ({ size: _size = "small", theme: { colors, shadows, sizes } }) => {
  return css`
    // 글씨 색상
    color: ${colors.gray3};

    ${size({ height: sizes.height[_size] })}

    padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}

    transition: 300ms;
  `;
};

export const Label = styled.label`
  ${props => baseStyle(props)}
`;
