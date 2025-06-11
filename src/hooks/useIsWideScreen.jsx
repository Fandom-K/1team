import { useEffect, useState } from "react";

const useIsWideScreen = (minWidth = 745) => {
  const [isWide, setIsWide] = useState(() => window.innerWidth >= minWidth);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const handleChange = (e) => setIsWide(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [minWidth]);

  return isWide;
};

export default useIsWideScreen;
