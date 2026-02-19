import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/lib/cms-v2/cms-types";
import { getMaskFunction } from "@/lib/cms-v2/form-masks-v2";
import { cn } from "@/lib/utils";
import { CEPFieldWithButtonV2 } from "./CEPFieldWithButtonV2";

// SVG oficial do WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface DynamicFormFieldV2Props {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  onAddressFound?: (address: { logradouro: string; bairro: string; cidade: string; uf: string }) => void;
  onAddressFieldsChange?: (fields: { bairro: string; cidade: string; uf: string }) => void;
  error?: string;
}

export const DynamicFormFieldV2 = ({
  field,
  value,
  onChange,
  onAddressFound,
  onAddressFieldsChange,
  error,
}: DynamicFormFieldV2Props) => {
  const handleChange = (newValue: string) => {
    const maskFn = getMaskFunction(field.type);
    if (maskFn) {
      onChange(maskFn(newValue));
    } else {
      onChange(newValue);
    }
  };

  const inputClasses = cn(
    "bg-[hsl(var(--ds-color-glass)/var(--ds-glass-opacity))] border-[hsl(var(--ds-border-color)/var(--ds-border-opacity))] text-foreground placeholder:text-muted-foreground focus:border-[hsl(var(--ds-color-accent))] focus:ring-[hsl(var(--ds-color-accent)/0.3)] transition-colors duration-200",
    error && "border-destructive focus:border-destructive"
  );

  // Paragraph — static text, no data collection
  if (field.type === 'paragraph') {
    return (
      <div className={cn(
        "w-full",
        field.width === '50%' ? 'md:w-[calc(50%-0.5rem)]' : ''
      )}>
        <p className="text-sm text-muted-foreground py-3 px-4 bg-muted/20 rounded-lg border border-border/30">
          {field.content || field.label}
        </p>
      </div>
    );
  }

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={cn(inputClasses, "min-h-[100px] resize-none")}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={inputClasses}>
              <SelectValue placeholder={field.placeholder || 'Selecione...'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox': {
        const selectedValues = value ? value.split(',').filter(Boolean) : [];
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/10 p-2 rounded-md transition-colors"
              >
                <Checkbox
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    let newValues = [...selectedValues];
                    if (checked) {
                      if (!field.maxSelect || newValues.length < field.maxSelect) {
                        newValues.push(option);
                      }
                    } else {
                      newValues = newValues.filter(v => v !== option);
                    }
                    onChange(newValues.join(','));
                  }}
                />
                <span className="text-sm text-foreground">{option}</span>
              </label>
            ))}
            {(field.minSelect || field.maxSelect) && (
              <p className="text-xs text-muted-foreground mt-1">
                {field.minSelect && field.maxSelect
                  ? `Selecione de ${field.minSelect} a ${field.maxSelect} opções`
                  : field.minSelect
                    ? `Selecione pelo menos ${field.minSelect} opção(ões)`
                    : `Selecione no máximo ${field.maxSelect} opção(ões)`
                }
              </p>
            )}
          </div>
        );
      }

      case 'cep':
        return (
          <CEPFieldWithButtonV2
            value={value}
            onChange={onChange}
            onAddressFound={onAddressFound}
            onAddressFieldsChange={onAddressFieldsChange}
            error={error}
            placeholder={field.placeholder || '00000-000'}
          />
        );

      case 'whatsapp':
        return (
          <div className="relative">
            <Input
              id={field.id}
              type="tel"
              inputMode="tel"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={field.placeholder || '(00) 00000-0000'}
              className={cn(inputClasses, "pl-10")}
              maxLength={15}
            />
            <WhatsAppIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25D366]" />
          </div>
        );

      case 'date':
        return (
          <Input
            id={field.id}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder || 'DD/MM/AAAA'}
            className={inputClasses}
            maxLength={10}
          />
        );

      case 'phone':
        return (
          <Input
            id={field.id}
            type="tel"
            inputMode="tel"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder || '(00) 00000-0000'}
            className={inputClasses}
            maxLength={15}
          />
        );

      case 'cpf':
        return (
          <Input
            id={field.id}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder || '000.000.000-00'}
            className={inputClasses}
            maxLength={14}
          />
        );

      case 'email':
        return (
          <Input
            id={field.id}
            type="email"
            inputMode="email"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClasses}
          />
        );

      case 'text':
      default:
        return (
          <Input
            id={field.id}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className={cn(
      "space-y-2",
      field.width === '50%' ? 'w-full md:w-[calc(50%-0.5rem)]' : 'w-full'
    )}>
      <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};
