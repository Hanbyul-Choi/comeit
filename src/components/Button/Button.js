import * as Styled from "./Button.styles";

export const Button = ({ variant, size, ...props }) => {
  return <Styled.Button variant={variant} size={size} {...props} />;
};
