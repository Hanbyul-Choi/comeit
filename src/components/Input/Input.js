import * as Styled from "./Input.styles";

export const Input = ({ variant, size, ...props }) => {
  return <Styled.Input variant={variant} size={size} {...props} />;
};
