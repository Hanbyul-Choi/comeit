import { css, styled } from "styled-components";
import { flex, size, typography } from "styles/mixins";

const baseStyle = ({ size: _size = "medium", theme: { sizes, colors, shadows } }) => {
  return css`
    border: 1px solid ${colors.gray2};
    box-shadow: ${shadows.drop1};

    color: ${colors.gray4};
    ${flex.center()}

    ${size({ height: sizes.height[_size] })}
  
    padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    resize: none;

    ${typography(sizes.heading[_size])}

    min-height: 150px;

    transition: 300ms;

    &::placeholder {
      color: ${colors.gray2};
    }
  `;
};

export const Textarea = styled.textarea`
  ${props => baseStyle(props)}
`;
