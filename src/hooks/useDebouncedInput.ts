import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook que isola o estado local de digitação do estado global.
 * Atualiza o estado externo apenas após pausa na digitação.
 * 
 * @param externalValue - Valor vindo do estado global (CMS draft)
 * @param onDebouncedChange - Callback para atualizar o estado global
 * @param delay - Tempo de debounce em ms (padrão: 300ms)
 * @returns Tuple [localValue, setLocalValue]
 */
export function useDebouncedInput(
  externalValue: string,
  onDebouncedChange: (value: string) => void,
  delay: number = 300
): [string, (value: string) => void] {
  const [localValue, setLocalValue] = useState(externalValue);
  const isInternalUpdate = useRef(false);
  const prevExternalValue = useRef(externalValue);
  
  // Sincroniza quando valor externo muda (ex: reset, mudança de seção)
  useEffect(() => {
    // Só atualiza se o valor externo realmente mudou de fora
    if (externalValue !== prevExternalValue.current && !isInternalUpdate.current) {
      setLocalValue(externalValue);
    }
    prevExternalValue.current = externalValue;
    isInternalUpdate.current = false;
  }, [externalValue]);
  
  // Debounce para atualizar estado global
  useEffect(() => {
    // Não dispara se valores são iguais
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

/**
 * Hook para valores não-string (números, arrays, objetos)
 * Útil para selects, checkboxes, etc.
 */
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
