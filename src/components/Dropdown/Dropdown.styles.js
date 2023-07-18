import { css, styled } from "styled-components";
import { flex, position, selector, size, typography } from "styles/mixins";

const dropdownButtonStyle = ({ size: _size = "medium", theme: { colors, palettes, sizes } }) => {
  const { base, hover, active } = palettes.blue;

  return css`
    ${flex({ align: "center" })}

    background-color: ${colors.white};

    height: ${sizes.height[_size]}px;

    border: 1px solid ${base};
    ${selector("borderColor", { hover, active })}
    border-radius: 8px;

    padding: 0 ${sizes.padding[_size]}px;

    ${typography(sizes.paragraph[_size])}

    transition: 300ms;

    cursor: pointer;
  `;
};

export const DropdownButton = styled.div`
  ${props => dropdownButtonStyle(props)}
`;

const dropdownListStyle = ({ theme: { colors, shadows } }) => {
  return css`
    ${position.absolute()}
    z-index: 1;

    ${size({ width: "100%" })}

    padding: 8px 0;
    margin-top: 10px;

    background-color: ${colors.white};

    border: 1px solid ${colors.gray2};
    border-radius: 8px;

    box-shadow: ${shadows.drop2};
  `;
};

export const DropdownList = styled.div`
  ${props => dropdownListStyle(props)}
`;

export const Container = styled.div`
  position: relative;
`;
