import { css, styled } from "styled-components";
import { fontSize, fontWeight, lineHeight } from "./typography.constants";

export const typography = size => css`
  font-size: ${fontSize[size]}px;
  font-weight: ${fontWeight[size]};
  line-height: ${lineHeight[size]}px;
`;

export const Typography = styled.span`
  ${({ size }) => typography(size)}
`;
