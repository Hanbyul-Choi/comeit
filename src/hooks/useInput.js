import { useState } from "react";

export const useInput = (onError = () => {}) => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
    onError("");
  };

  return [value, onChange];
};
