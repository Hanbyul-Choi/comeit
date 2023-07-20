import { css, styled } from "styled-components";
import { flex } from "styles/mixins";

export const baseStyle = ({ gap = 0, padding = "none" }) => css`
  ${flex.column()}
  gap: ${gap}px;
  padding: ${padding}px;
`;

export const SidebarWrapper = styled.div`
  ${props => baseStyle(props)}
`;

export const SearchContainer = styled.div`
  ${props => baseStyle(props)}
`;

export const PostContainer = styled.ul`
  ${props => baseStyle(props)}
`;
