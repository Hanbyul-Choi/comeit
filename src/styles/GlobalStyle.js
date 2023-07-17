import { createGlobalStyle } from "styled-components";
import { font, more, reset } from "./base";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${more}
  ${font}
`;
