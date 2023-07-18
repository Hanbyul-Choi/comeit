import { styled } from "styled-components";
import { flex } from "styles/mixins";
import { colors } from "styles/theme/colors";
import { shadows } from "styles/theme/shadows";
import { hexToRgba } from "styles/utils/hexToRgba";

export const ModalOuter = styled.div`
  ${flex.center()};
  background-color: ${hexToRgba(colors.gray3, 0.8)};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const ModalInner = styled.div`
  ${flex.column()};
  ${flex({ gap: "15px" })};
  background-color: ${colors.white};
  box-shadow: ${shadows.drop3};
  width: 25%;
  padding: 20px;
  border-radius: 10px;
`;
