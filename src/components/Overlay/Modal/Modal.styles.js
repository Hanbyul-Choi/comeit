import { styled } from "styled-components";
import { flex, position, size } from "styles/mixins";
import { colors } from "styles/theme/colors";
import { shadows } from "styles/theme/shadows";
import { hexToRgba } from "styles/utils/hexToRgba";

export const ModalOuter = styled.div`
  ${position.fixed({ top: 0, left: 0 })}

  ${flex.center()};

  ${size({ width: "100%", height: "100%" })}

  background-color: ${hexToRgba(colors.gray3, 0.3)};

  backdrop-filter: blur(4px);
`;

export const ModalInner = styled.div`
  ${size({ width: "calc(100% - 80px)", maxWidth: 600 })}

  padding: 20px;

  background-color: ${colors.white};
  box-shadow: ${shadows.drop3};

  border-radius: 10px;
`;
