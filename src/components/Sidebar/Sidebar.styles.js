import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
import { flex } from "styles/mixins";
import { colors } from "styles/theme/colors";
import { sizes } from "styles/theme/sizes";

export const SidebarWrapper = styled.div`
  ${flex.column({ gap: 20 })}
  padding: ${sizes.padding.medium}px;
`;

export const PostContainer = styled.ul`
  ${flex.column()}
  ${flex.center()}
`;

export const Link = styled(RouterLink)`
  ${flex({ align: "center", gap: "20px" })}
  width: 300px;
  height: 100px;
  color: ${colors.gray4};
  padding: ${sizes.padding.medium}px;

  border: none;
  border-bottom: 1px solid ${colors.gray2};
  &:hover {
    background-color: ${colors.gray1};
    transition: 300ms;
  }
`;
export const ContentImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;
export const ContentBox = styled.div`
  padding-bottom: ${sizes.padding.small}px;
`;
