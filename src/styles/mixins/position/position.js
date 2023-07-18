import { css, styled } from "styled-components";
import { styleHelper } from "styles/utils";

export const position = ({ ...props }) => css`
  ${Object.entries(props).map(([key, value]) => styleHelper(key, value))}
`;

const absolute = props => css`
  ${position({ position: "absolute", ...props })}
`;

const fixed = props => css`
  ${position({ position: "fixed", ...props })}
`;

const sticky = props => css`
  ${position({ position: "sticky", ...props })}
`;

const posCenter = () => css`
  ${position({ position: "absolute", top: "50%", left: "50%" })}

  transform: translate(-50%, -50%);
`;

const posCenterX = props => css`
  ${position({ ...props, position: "absolute", left: "50%" })}

  transform: translateX(-50%)
`;

const posCenterY = props => css`
  ${position({ ...props, position: "absolute", top: "50%" })}

  transform: translateY(-50%)
`;

position.absolute = absolute;
position.fixed = fixed;
position.sticky = sticky;
position.posCenter = posCenter;
position.posCenterX = posCenterX;
position.posCenterY = posCenterY;

export const Position = styled.div`
  ${props => position(props)}
`;

export const PosCenter = styled.div`
  ${posCenter()}
`;

export const PosCenterX = styled.div`
  ${props => posCenterX(props)}
`;

export const PosCenterY = styled.div`
  ${props => posCenterY(props)}
`;
