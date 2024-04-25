import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    // Ref to store the timeout ID
    const timeoutRef = useRef<any>();
  
    useEffect(() => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => clearTimeout(timeoutRef.current);
    }, [value, delay]);
  
    return debouncedValue;
  }