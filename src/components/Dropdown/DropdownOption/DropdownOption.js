import { useCallback } from "react";
import { useDropdownContext } from "../Dropdown";
import * as Styled from "./DropdownOption.styles";

export const DropdownOption = ({ children: label, value }) => {
  const { size, setData, setIsOpen } = useDropdownContext();

  const handleOnClick = useCallback(() => {
    setData({ label, value });

    setIsOpen.off();
  }, [label, setData, setIsOpen, value]);

  return (
    <Styled.Container size={size} onClick={handleOnClick}>
      {label}
    </Styled.Container>
  );
};
