import { useEffect, useRef, useState } from "react";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const SIZE_XS: string = "xs";
export const SIZE_SM: string = "sm";
export const SIZE_MD: string = "md";
export const SIZE_LG: string = "lg";
export const SIZE_XL: string = "xl";
export const SIZE_XXL: string = "xxl";

const resolveBreakpoint = (width: number): string => {
  if (width < 576) {
    return SIZE_XS;
  } else if (width >= 576 && width < 768) {
    return SIZE_SM;
  } else if (width >= 768 && width < 992) {
    return SIZE_MD;
  } else if (width >= 992 && width < 1200) {
    return SIZE_LG;
  } else if (width >= 1200 && width < 1440) {
    return SIZE_XL;
  }
  return SIZE_XXL;
};

const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const useBreakpoint = (): string => {
  const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth));

  const calcInnerWidth = debounce(() => {
    setSize(resolveBreakpoint(window.innerWidth));
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, [calcInnerWidth]);

  return size;
};

export const useOutsideClick = (visible, callback) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
