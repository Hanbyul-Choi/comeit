import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const UserDropdownWrapper = styled.div`
  ${flex({ direction: "column", align: "center", justify: "center" })}
  position: absolute;
  top: 50px;
  right: -20px;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  z-index: 1;
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
