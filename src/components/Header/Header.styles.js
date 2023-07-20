import { Button } from "components/Button";
import { css, styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { HEADER_HEIGHT } from "./Header.constants";

export const Container = styled.div`
  ${flex({ align: "center" })}

  ${size({ height: HEADER_HEIGHT })}
  
  width: 100%;
  padding: 0 24px;
`;

export const Wrapper = styled.div`
  ${flex({ align: "center", justify: "between" })}
  width: 100%;
  .logo {
    font-weight: 600;
    ${flex({ align: "center", justify: "between" })}
    img {
      width: 40px;
    }
  }
  .right {
    position: relative;
    ${flex({ align: "center", gap: 12 })}
    p {
      font-size: 14px;
      font-weight: 500;
    }
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

export const UserImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 20px;
  ${({ theme }) => css`
    &:hover {
      border: 1px solid ${theme.colors.black};
    }
  `}

  ${flex({ align: "center", justify: "center" })}
  cursor: pointer;
`;
