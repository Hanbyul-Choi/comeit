import { css, styled } from "styled-components";
import { flex, selector, size, typography } from "styles/mixins";

const variantStyle = ({ variant, theme: { colors, palettes, shadows } }) => {
  const { focus } = palettes.blue;

  switch (variant) {
    case "outline":
      return css`
        border: 1px solid ${colors.gray2};

        ${selector("borderColor", { focus })}

        box-shadow: ${shadows.drop1};
        // 글씨 색상
        color: ${colors.gray4};

        ${selector("color", { focus })}
      `;

    default:
      return css`
        border: 1px solid ${colors.gray2};

        box-shadow: ${shadows.drop1};
        // 글씨 색상
        color: ${colors.gray4};
      `;
  }
};

// baseStyle 함수는 공통 요소
// baseStyle 함수는 객체를 매개변수로 받음
// size: _size = "medium"는 size 프로퍼티를 추출하고, '기본값'으로 "medium"을 설정
// _size는 추출된 값이 할당되는 변수
// theme.sizes는 테마의 크기에 대한 정보를 담고 있는 객체
const baseStyle = ({ size: _size = "medium", theme: { sizes } }) => {
  return css`
    ${flex.center()}

    ${size({ height: sizes.height[_size] })}
  
      padding: ${sizes.padding[_size]}px;

    border-radius: 8px;

    ${typography(sizes.heading[_size])}

    transition: 300ms;
  `;
};

export const Input = styled.input`
  ${props => baseStyle(props)}
  ${props => variantStyle(props)}
`;
