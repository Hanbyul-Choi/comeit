import { useState } from "react";

export const useInput = onError => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
    if (onError) onError("");
  };

  return [value, onChange];
};
