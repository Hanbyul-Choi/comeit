import { Button } from "components";
import { css, styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LogoImg = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
`;
export const Img = styled.img`
  display: flex;
  padding-top: 100px;
  padding-bottom: 50px;
`;
export const Box = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  padding-right: 200px;
`;
export const NavigateButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.black};

    color: ${theme.colors.black};
    &:hover {
      border: 1px solid ${theme.colors.deepblue};
      color: ${theme.colors.white};
    }
  `}
`;
