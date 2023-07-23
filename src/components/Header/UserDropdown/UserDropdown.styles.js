import { css, styled } from "styled-components";
import { flex } from "styles/mixins";
import { shadows } from "styles/theme/shadows";

export const UserDropdownWrapper = styled.div`
  ${flex({ direction: "column", align: "center", justify: "center" })}
  position: absolute;
  top: 54px;
  right: 7px;
  border-radius: 5px;

  overflow: hidden;
  background-color: white;
  z-index: 1;

  box-shadow: ${shadows.drop3};
`;

export const Option = styled.div`
  width: 80px;
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
  ${flex({ justify: "center" })}
  ${({ theme }) => css`
    &:hover {
      background-color: ${theme.colors.gray2};
    }
  `}
`;
