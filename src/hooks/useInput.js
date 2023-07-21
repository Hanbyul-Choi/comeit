import { useState } from "react";

export const useInput = (init = "", onError = () => {}) => {
  const [value, setValue] = useState(init);

  const onChange = event => {
    setValue(event.target.value);
    onError("");
  };

  return [value, onChange];
};
