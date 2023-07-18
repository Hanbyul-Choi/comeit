import { createContext, useMemo, useState } from "react";

export const DialogContext = createContext({
  dialog: [],
  setModal: () => {}
});

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState([]);

  const open = (component, props) => {
    setDialog(prev => [...prev, { component, props }]);
  };
  const close = component => {
    setDialog(prev => {
      return prev.filter(el => el.component !== component);
    });
  };

  const values = useMemo(() => ({ dialog, open, close }), [dialog]);

  return <DialogContext.Provider value={values}>{children}</DialogContext.Provider>;
};
