import { styled } from "styled-components";
import { flex } from "styles/mixins";
import { sizes } from "styles/theme/sizes";

export const SidebarWrapper = styled.div`
  ${flex.column({ gap: 20 })}
  padding: ${sizes.padding.medium}px;
`;

export const PostContainer = styled.ul`
  ${flex.column({ gap: 20 })}
`;
