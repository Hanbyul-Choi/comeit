import { useBoolean, useClickAway, useMountLayout } from "hooks";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as Styled from "./Dropdown.styles";
import { DropdownOption } from "./DropdownOption";

const DropdownContext = createContext(null);

const DropdownOptionType = (<DropdownOption />).type;

export const DropdownMain = ({ children, size, onChange }) => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const [data, setData] = useState({
    label: "선택해주세요",
    value: null
  });

  const containerRef = useRef(null);

  const options = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === DropdownOptionType
  );

  useClickAway(containerRef, setIsOpen.off);

  useMountLayout(() => {
    const selectedOption = options.find(option => option.props?.selected);

    if (selectedOption) {
      const { children: label, value } = selectedOption.props;

      setData({ label, value });
    }
  });

  useEffect(() => {
    if (onChange && data.value) onChange(data.value);
  }, [data, onChange]);

  const values = useMemo(
    () => ({
      size,
      setIsOpen,
      setData
    }),
    [setIsOpen, size]
  );

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen.toggle();
      return;
    }
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider value={values}>
      <Styled.Container ref={containerRef}>
        <Styled.DropdownButton size={size} onClick={toggleMenu}>
          {data.label}
        </Styled.DropdownButton>

        {isOpen && <Styled.DropdownList>{options}</Styled.DropdownList>}
      </Styled.Container>
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const dropdownContext = useContext(DropdownContext);

  return dropdownContext;
};

export const Dropdown = Object.assign(DropdownMain, {
  Option: DropdownOption
});
