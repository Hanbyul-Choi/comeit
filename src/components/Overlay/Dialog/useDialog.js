import { useOverlayContext } from "../Overlay.context";
import { Dialog } from "./Dialog";

export const useDialog = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();

  const Confirm = element => {
    return new Promise(resolve => {
      _mount(
        "Confirm",
        <Dialog
          type="Confirm"
          onClose={() => {
            resolve(false);
            _unmount("Confirm");
          }}
          onSucess={() => {
            resolve(true);
            _unmount("Confirm");
          }}
        >
          {element}
        </Dialog>
      );
    });
  };

  const Alert = element => {
    return new Promise(resolve => {
      _mount(
        "Alert",
        <Dialog
          type="Alert"
          onClose={() => {
            resolve(true);
            _unmount("Alert");
          }}
        >
          {element}
        </Dialog>
      );
    });
  };

  return { Alert, Confirm };
};
