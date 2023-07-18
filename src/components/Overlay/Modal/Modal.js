import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import { useOverlayContext } from "../Overlay.context";
import * as Styled from "./Modal.styles";

export const Modal = ({ children, name }) => {
  const { unmount } = useOverlayContext();

  const handleClose = event => {
    const { target, currentTarget } = event;

    if (target !== currentTarget) return;

    unmount(name);
  };

  useLockBodyScroll(true);

  return (
    <Styled.ModalOuter onClick={handleClose}>
      <Styled.ModalInner>{children}</Styled.ModalInner>
    </Styled.ModalOuter>
  );
};
