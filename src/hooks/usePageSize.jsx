import { useEffect, useState } from "react";

function usePageSize(desktop, tablet, mobile) {
  const getPageSize = () => {
    if (window.innerWidth >= 1200) return desktop;
    if (window.innerWidth >= 768) return tablet;
    return mobile; // 기본은 모바일 사이즈
  };

  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}

export default usePageSize;
