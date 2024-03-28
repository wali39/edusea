import { useEffect, useState } from "react";

export function useDebunce<T>(value: T, delay?: number): T {
  const [debounceValue, setDedounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDedounceValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
