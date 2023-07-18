import * as Styled from "./Textarea.styles";

export const Textarea = ({ variant, size, ...props }) => {
  return <Styled.Textarea variant={variant} size={size} {...props} />;
};
