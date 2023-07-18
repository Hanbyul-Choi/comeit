import { Portal } from "common";
import { Button } from "components";
import { useBoolean, useClickAway } from "hooks";
import { useRef } from "react";
import * as Styled from "./Modal.styles";

export const Modal = ({ children, openModalText = "Open", closeModalText = "Close" }) => {
  const innerRef = useRef();
  const [isOpen, setIsOpen] = useBoolean(false);

  const openModal = () => {
    setIsOpen.on();
  };

  const closeModal = () => {
    setIsOpen.off();
  };

  useClickAway(innerRef, closeModal);

  return (
    <>
      <Button onClick={openModal}>{openModalText}</Button>

      {isOpen && (
        <Portal>
          <Styled.ModalOuter>
            <Styled.ModalInner ref={innerRef}>
              {children}
              <Button onClick={closeModal}>{closeModalText}</Button>
            </Styled.ModalInner>
          </Styled.ModalOuter>
        </Portal>
      )}
    </>
  );
};
