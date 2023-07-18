import { css, styled } from "styled-components";
import { flex, size, typography } from "styles/mixins";

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
    // Textarea 박스 높이
    ${size({ height: 150 })} 

    transition: 300ms;

    &::placeholder {
      color: ${colors.gray2};
    }
  `;
};

export const Textarea = styled.textarea`
  ${props => baseStyle(props)}
`;
