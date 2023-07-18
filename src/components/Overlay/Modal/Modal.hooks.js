import { Modal } from "./Modal";

const { useOverlayContext } = require("../Overlay.context");

export const useModal = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();

  const mount = (name, element) => {
    _mount(name, <Modal name={name}>{element}</Modal>);
  };

  const unmount = name => {
    _unmount(name);
  };

  return { mount, unmount };
};
