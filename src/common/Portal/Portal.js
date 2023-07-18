import ReactDom from "react-dom";

export const Portal = ({ children }) => {
  const el = document.getElementById("modal-root");
  return ReactDom.createPortal(children, el);
};
