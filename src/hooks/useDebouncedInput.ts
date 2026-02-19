import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebouncedInput(
  externalValue: string,
  onDebouncedChange: (value: string) => void,
  delay: number = 300
): [string, (value: string) => void] {
  const [localValue, setLocalValue] = useState(externalValue);
  const isInternalUpdate = useRef(false);
  const prevExternalValue = useRef(externalValue);
  
  useEffect(() => {
    if (externalValue !== prevExternalValue.current && !isInternalUpdate.current) {
      setLocalValue(externalValue);
    }
    prevExternalValue.current = externalValue;
    isInternalUpdate.current = false;
  }, [externalValue]);
  
  useEffect(() => {
    if (localValue === externalValue) return;
    const timer = setTimeout(() => {
      isInternalUpdate.current = true;
      onDebouncedChange(localValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [localValue, delay, onDebouncedChange, externalValue]);
  
  const handleChange = useCallback((value: string) => {
    setLocalValue(value);
  }, []);
  
  return [localValue, handleChange];
}

export function useDebouncedValue<T>(
  externalValue: T,
  onDebouncedChange: (value: T) => void,
  delay: number = 300
): [T, (value: T) => void] {
  const [localValue, setLocalValue] = useState<T>(externalValue);
  const isInternalUpdate = useRef(false);
  const prevExternalValue = useRef(externalValue);
  
  useEffect(() => {
    const externalStr = JSON.stringify(externalValue);
    const prevStr = JSON.stringify(prevExternalValue.current);
    if (externalStr !== prevStr && !isInternalUpdate.current) {
      setLocalValue(externalValue);
    }
    prevExternalValue.current = externalValue;
    isInternalUpdate.current = false;
  }, [externalValue]);
  
  useEffect(() => {
    const localStr = JSON.stringify(localValue);
    const externalStr = JSON.stringify(externalValue);
    if (localStr === externalStr) return;
    const timer = setTimeout(() => {
      isInternalUpdate.current = true;
      onDebouncedChange(localValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [localValue, delay, onDebouncedChange, externalValue]);
  
  const handleChange = useCallback((value: T) => {
    setLocalValue(value);
  }, []);
  
  return [localValue, handleChange];
}
