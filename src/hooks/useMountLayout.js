import { useLayoutEffect, useRef } from "react";

export const useMountLayout = callback => {
  const _callback = useRef(callback);

  useLayoutEffect(() => {
    _callback.current();
  }, []);
};
