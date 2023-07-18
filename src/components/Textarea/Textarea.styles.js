import { css, styled } from "styled-components";
import { flex, size, typography } from "styles/mixins";

const variantStyle = ({ variant, theme: { colors, shadows } }) => {
  // variant에 따라 스타일을 정의
  switch (variant) {
    // outline인 경우, 테두리, 그림자, 색상을 설정
    case "outline":
      return css`
        // input 상자
        border: 1px solid ${colors.gray2};

        box-shadow: ${shadows.drop1};
        // 글씨 색상
        color: ${colors.gray4};
      `;

    default:
      return;
  }
};

const baseStyle = ({ size: _size = "medium", theme: { sizes } }) => {
  return css`
    ${flex.center()}

    ${size({ height: sizes.height[_size] })}
  
      padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}
    // Textarea 박스 높이
    ${size({ height: "150px" })} 

 

    transition: 300ms;
  `;
};

export const Textarea = styled.textarea`
  ${props => baseStyle(props)}
  ${props => variantStyle(props)}
`;
