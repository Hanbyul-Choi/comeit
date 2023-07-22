import { Button } from "components/Button";
import { Link } from "react-router-dom";
import { css, styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { shadows } from "styles/theme/shadows";
import { HEADER_HEIGHT } from "./Header.constants";

export const Container = styled.div`
  ${flex({ align: "center" })}
  box-shadow: ${shadows.drop2};

  ${size({ height: HEADER_HEIGHT })}

  width: 100%;
  padding: 0 24px;
`;

export const StLink = styled(Link)`
  ${({ theme }) => css`
    font-weight: 600;
    ${flex({ align: "center", justify: "between" })}
    color: ${theme.colors.black};
    img {
      width: 40px;
    }
    &:hover {
      color: ${theme.palettes.blue.hover};
    }
  `}
`;

export const Wrapper = styled.div`
  ${flex({ align: "center", justify: "between" })}
  width: 100%;
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
  width: 40px;
  height: 40px;
  border-radius: 20px;
  ${({ theme }) => css`
    &:hover {
      border: 1px solid ${theme.colors.black};
    }
  `}

  ${flex({ align: "center", justify: "center" })}
  cursor: pointer;
`;
