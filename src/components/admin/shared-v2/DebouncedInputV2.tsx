import { memo, InputHTMLAttributes } from 'react';
import { Input } from "@/components/ui/input";
import { useDebouncedInput } from "@/hooks/useDebouncedInput";

interface DebouncedInputV2Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onDebouncedChange: (value: string) => void;
  debounceMs?: number;
}

export const DebouncedInputV2 = memo(({
  value,
  onDebouncedChange,
  debounceMs = 300,
  ...props
}: DebouncedInputV2Props) => {
  const [localValue, setLocalValue] = useDebouncedInput(
    value ?? '',
    onDebouncedChange,
    debounceMs
  );

  return (
    <Input
      {...props}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
});

DebouncedInputV2.displayName = 'DebouncedInputV2';
