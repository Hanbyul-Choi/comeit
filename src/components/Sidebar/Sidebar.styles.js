import { styled } from "styled-components";
import { flex } from "styles/mixins";

export const SidebarWrapper = styled.div`
  ${flex.column({ gap: 20 })}

  padding: 20px;
`;

export const SearchContainer = styled.div`
  ${flex.column()}
`;

export const PostContainer = styled.ul`
  ${flex.column({ gap: 20 })}
`;
