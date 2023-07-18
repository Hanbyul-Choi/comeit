import { Portal } from "common/Portal";
import { useRef, useState } from "react";
import * as Styled from "./Modal.styles";

export const Modal = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const innerRef = useRef();

  const closeHandler = e => {
    if (e.currentTarget === e.target) setIsModalOpen(false);
    console.log("hi");
    console.log("타겟", e.target);
    console.log("커런트", e.currentTarget);
  };
  // 타켓, 커런트 타겟 같을때 닫아줘

  return (
    <Portal>
      <Styled.ModalOuter onClick={closeHandler}>
        <Styled.ModalInner ref={innerRef}>{children}</Styled.ModalInner>
      </Styled.ModalOuter>
    </Portal>
  );
};
