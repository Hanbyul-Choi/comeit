import { useBoolean, useClickAway } from "hooks";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useLayoutEffect,
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
  const options = useMemo(
    () =>
      Children.toArray(children).filter(
        child => isValidElement(child) && child.type === DropdownOptionType
      ),
    [children]
  );
  const _selectedOption = useMemo(() => options.find(option => option.props?.selected), [options]);
  useLayoutEffect(() => {
    if (_selectedOption) {
      const { children: label, value } = _selectedOption.props;
      setData({ label, value });
    }
  }, [_selectedOption]);
  useClickAway(containerRef, setIsOpen.off);
  const values = useMemo(
    () => ({
      size,
      setIsOpen,
      setData,
      onChange
    }),
    [onChange, setIsOpen, size]
  );
  return (
    <DropdownContext.Provider value={values}>
      <Styled.Container ref={containerRef}>
        <Styled.DropdownButton size={size} onClick={setIsOpen.toggle}>
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
