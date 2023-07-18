import * as Styled from "./Label.styles";

export const Label = ({ variant, size, ...props }) => {
  return <Styled.Label variant={variant} size={size} {...props} />;
};
