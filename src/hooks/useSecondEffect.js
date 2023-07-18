const { useRef, useEffect } = require("react");

export function useSecondEffect(effect, dependencies) {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      return effect();
    }
    isMountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
