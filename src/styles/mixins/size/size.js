import { css } from "styled-components";
import { styleHelper } from "styles/utils/styleHelper";

// styled-components와 styleHelper를 사용하여 크기(size) 설정
export const size = sizes => css`
  ${Object.entries(sizes).map(([key, value]) => styleHelper(key, value))}
`;
