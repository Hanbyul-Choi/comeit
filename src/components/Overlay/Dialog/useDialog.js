import { useOverlayContext } from "../Overlay.context";
import { Dialog } from "./Dialog";

export const useDialog = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();

  const mount = (name, type, element) => {
    return new Promise(resolve => {
      switch (type) {
        case "Confirm": {
          _mount(
            name,
            <Dialog
              type={type}
              name={name}
              onClose={() => {
                resolve(false);
                _unmount(name);
              }}
              onSucess={() => {
                resolve(true);
                _unmount(name);
              }}
            >
              {element}
            </Dialog>
          );
          break;
        }
        case "Alert": {
          _mount(
            name,
            <Dialog
              type={type}
              name={name}
              onSucess={() => {
                resolve(true);
                _unmount(name);
              }}
            >
              {element}
            </Dialog>
          );
          break;
        }
        default:
      }
    });
  };

  return { mount };
};
