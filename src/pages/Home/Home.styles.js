import { HEADER_HEIGHT } from "components/Header/Header.constants";
import { styled } from "styled-components";
import { position, size } from "styles/mixins";

export const Container = styled.div`
  display: flex;

  ${size({ width: "100vw", height: `calc(100vh - ${HEADER_HEIGHT}px)` })}
`;

export const Sidebar = styled.div`
  /* width: 300px; */
  ${size({ width: 300, height: `calc(100vh - ${HEADER_HEIGHT}px)` })}
`;
export const PlusButton = styled.button`
  ${position.absolute({ top: `calc(100% - 100px)`, right: "20px" })};
  z-index: 1;
`;
