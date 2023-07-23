import { useState } from "react";

export const useInput = (init = "", onError = () => {}) => {
  const [value, setValue] = useState(init);

  const onChange = event => {
    setValue(event.target.value);
    onError("");
  };
  const onSet = val => {
    setValue(val);
  };

  return [value, onChange, onSet];
};
