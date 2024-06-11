import { useEffect } from "react";

const useDisableScroll = () => {
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = "hidden";

    return () => {
      document.documentElement.style.overflowY = originalOverflow;
    };
  }, []);
};

export default useDisableScroll;
