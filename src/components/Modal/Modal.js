import { Portal } from "common";
import { Button } from "components";
import { useBoolean, useClickAway } from "hooks";
import { useRef } from "react";
import * as Styled from "./Modal.styles";

/**
 * 모달 컴포넌트의 props로 showCloseButton={false}와 같이
 * 넘겨준다면 모달 내의 닫기 버튼을 숨길 수 있다
 *
 * 모달 컴포넌트의 props로 as를 이용하면 모든 태그에 대응 할 수 있다.
 *
 * 예시1) 모달을 여는 태그를 a태그로 하고 싶다면 as="a"
 *
 * 예시2) 모달을 여는 태그 커스텀한 버튼 컴포넌트로 하고 싶다면 as={Button}
 *
 * @param {} param0
 * @returns
 */

export const Modal = ({
  children,
  openModalText = "Open",
  closeModalText = "Close",
  showCloseButton = true,
  as: Component = Button,
  ...props
}) => {
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
      <Component onClick={openModal} {...props}>
        {openModalText}
      </Component>

      {isOpen && (
        <Portal>
          <Styled.ModalOuter>
            <Styled.ModalInner ref={innerRef}>
              {children}
              {showCloseButton && <Button onClick={closeModal}>{closeModalText}</Button>}
            </Styled.ModalInner>
          </Styled.ModalOuter>
        </Portal>
      )}
    </>
  );
};
