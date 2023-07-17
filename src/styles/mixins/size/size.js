import { css } from "styled-components";
import { styleHelper } from "styles/utils/styleHelper";

export const size = sizes => css`
  ${Object.entries(sizes).map(([key, value]) => styleHelper(key, value))}
`;
