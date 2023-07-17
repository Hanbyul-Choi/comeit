import { css, styled } from "styled-components";
import { styleHelper } from "styles/utils";
import { FLEX_MAP } from "./flex.constants";

export const flex = ({ display = "flex", direction, align, justify, gap }) => css`
  display: ${display};
  ${direction && styleHelper("flexDirection", direction)}
  ${align && styleHelper("alignItems", FLEX_MAP[align])}
  ${justify && styleHelper("justifyContent", FLEX_MAP[justify])}
  ${gap && styleHelper("gap", gap)}
`;

const center = props => {
  return flex({ ...props, align: "center", justify: "center" });
};

const column = props => {
  return flex({ ...props, direction: "column" });
};

flex.center = center;
flex.column = column;

export const Flex = styled.div`
  ${props => flex(props)}
`;

export const FlexCenter = styled.div`
  ${props => flex.center(props)}
`;

export const FlexColumn = styled.div`
  ${props => flex.column(props)}
`;
