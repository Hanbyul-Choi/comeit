import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

const variantStyle = ({ variant, theme: { palettes, shadows } }) => {
  const { base } = palettes.blue;

  switch (variant) {
    case "outline":
      return css`
        border: 1px solid ${base};

        box-shadow: ${shadows.drop1};

        color: ${base};
      `;

    default:
      return;
  }
};

const baseStyle = ({ showContentNum }) => {
  return css`
    width: ${750 / showContentNum}px;

    ${flex.center()}

    padding: 8px;

    border-radius: 8px;
  `;
};

export const Img = styled.img`
  ${props => baseStyle(props)}
`;

export const SliderContainer = styled.div`
  padding: 12px;
  width: 250px;
  display: flex;
  gap: 24px;
`;

export const Container = styled.div`
  width: 750px;
  overflow: hidden;
  position: relative;
  .prev {
    top: 100px;
    z-index: 1;
  }
  .next {
    top: 100px;
    right: 10px;
  }
  ${props => variantStyle(props)}
`;
