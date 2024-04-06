import { useEffect, useRef } from "react";

export const useOutsideClick = (visible, callback) => {
  const ref = useRef<any>();

  useEffect(() => {
    if (visible) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [visible]);

  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
      document.removeEventListener("click", handleClick);
    }
  };

  return ref;
};
