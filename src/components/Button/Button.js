import * as Styled from "./Button.styles";

export const Button = ({ variant, size, children, ...props }) => {
  return (
    <Styled.Button variant={variant} size={size} {...props}>
      {children}
    </Styled.Button>
  );
};
