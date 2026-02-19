import { memo, TextareaHTMLAttributes } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useDebouncedInput } from "@/hooks/useDebouncedInput";

interface DebouncedTextareaV2Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value: string;
  onDebouncedChange: (value: string) => void;
  debounceMs?: number;
}

export const DebouncedTextareaV2 = memo(({
  value,
  onDebouncedChange,
  debounceMs = 300,
  ...props
}: DebouncedTextareaV2Props) => {
  const [localValue, setLocalValue] = useDebouncedInput(
    value ?? '',
    onDebouncedChange,
    debounceMs
  );

  return (
    <Textarea
      {...props}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
});

DebouncedTextareaV2.displayName = 'DebouncedTextareaV2';
