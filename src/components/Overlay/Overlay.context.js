import { Fragment, createContext, useCallback, useContext, useMemo, useState } from "react";

const OverlayContext = createContext(null);

export const OverlayProvider = ({ children }) => {
  const [overlays, setOverlays] = useState(new Map());

  const mount = useCallback((id, element) => {
    setOverlays(_overlays => {
      const __overlays = new Map(_overlays);
      __overlays.set(id, element);

      return __overlays;
    });
  }, []);

  const unmount = useCallback(id => {
    setOverlays(_overlays => {
      const __overlays = new Map(_overlays);
      __overlays.delete(id);

      return __overlays;
    });
  }, []);

  const values = useMemo(
    () => ({
      mount,
      unmount
    }),
    [mount, unmount]
  );

  return (
    <OverlayContext.Provider value={values}>
      {children}

      {[...overlays.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const overlayContext = useContext(OverlayContext);

  if (!overlayContext) {
    throw new Error("useOverlayContext is only available within OverlayProvider");
  }

  return overlayContext;
};
