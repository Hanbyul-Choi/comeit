import { styled } from "styled-components";
import { flex } from "styles/mixins";

export const UserDropdownWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 5px;

  ${flex({ direction: "column", align: "center", justify: "center", gap: 5 })}
  padding: 5px;
  background-color: white;
`;

export const Option = styled.div`
  height: 20px;
  cursor: pointer;
`;
