import { Button } from "components/Button";
import { css, styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { HEADER_HEIGHT } from "./Header.constants";

export const Container = styled.div`
  ${flex({ align: "center" })}

  ${size({ height: HEADER_HEIGHT })}

  /* ${({ theme }) => css`
    background-color: ${theme.colors.blue};
  `} */

  padding: 0 24px;
`;

export const Wrapper = styled.div`
  ${flex({ align: "center", justify: "between" })}
  width: 100%;
  .right {
    ${flex({ align: "center", gap: 12 })}
  }
`;

export const SigninButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    &:hover {
      color: ${theme.colors.white};
    }
  `}
`;

export const UserImg = styled.div`
  width: 40px;
  height: 40px;
  background-color: coral;
  border-radius: 20px;
  ${flex({ align: "center", justify: "center" })}
  cursor: pointer;
`;
