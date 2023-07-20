import { useLockBodyScroll } from "hooks";
import { createPortal } from "react-dom";
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

  return createPortal(
    <Styled.ModalOuter onClick={handleClose}>
      <Styled.ModalInner>{children}</Styled.ModalInner>
    </Styled.ModalOuter>,
    document.getElementById("portal-root")
  );
};
