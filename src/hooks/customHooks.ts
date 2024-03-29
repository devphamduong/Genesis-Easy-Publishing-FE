import { useEffect, useRef } from "react";

export const useOutsideClick = (callback) => {
  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event) => {
      console.log(ref);
      if (ref.current && !ref.current.contains(event.target)) {
        console.log(event);
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);

  return ref;
};
