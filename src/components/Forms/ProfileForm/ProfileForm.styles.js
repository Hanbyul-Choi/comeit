import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const UserImg = styled.img`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  cursor: pointer;
  ${({ theme }) => css`
    &:hover {
      border: 2px solid ${theme.colors.blue.hover};
    }
  `}
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  ${flex({ justify: "center" })}
`;
