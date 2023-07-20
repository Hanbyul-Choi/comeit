import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import { flex } from "styles/mixins";
import { palettes } from "styles/theme/palettes";
import { shadows } from "styles/theme/shadows";
import { sizes } from "styles/theme/sizes";

export const SidebarWrapper = styled.div`
  ${flex.column({ gap: 20 })}
  padding: ${sizes.padding.medium}px;
`;

export const PostContainer = styled.ul`
  ${flex.column({ gap: 20 })}
  ${flex.center()}
`;

export const Link = styled(RouterLink)`
  width: 300px;
  height: 100px;

  padding: ${sizes.padding.medium}px;

  border: 1px solid ${palettes.blue.base};

  box-shadow: ${shadows.drop1};
  border-radius: 8px;
`;

export const ContentBox = styled.div`
  padding-bottom: ${sizes.padding.small}px;
`;
