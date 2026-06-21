import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const h = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setW(window.innerWidth), 100);
    };
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("resize", h);
      clearTimeout(timeout);
    };
  }, []);
  return w;
}