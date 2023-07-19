import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const UserDropdownWrapper = styled.div`
  ${flex({ direction: "column", align: "center", justify: "center" })}
  position: absolute;
  top: 55px;
  right: 5px;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
`;

export const Option = styled.div`
  width: 80px;
  cursor: pointer;
  padding: 5px 0;
  font-size: 14px;
  ${flex({ justify: "center" })}
  ${({ theme }) => css`
    &:hover {
      background-color: ${theme.colors.gray2};
    }
  `}
`;
