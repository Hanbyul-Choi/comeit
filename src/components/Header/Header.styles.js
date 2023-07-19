import { styled } from "styled-components";
import { flex, size } from "styles/mixins";
import { HEADER_HEIGHT } from "./Header.constants";

export const Container = styled.div`
  ${flex({ align: "center" })}

  ${size({ height: HEADER_HEIGHT })}

  padding: 0 24px;
`;
