import { memo } from "react"; import { Label } from "@/components/ui/label"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import type { V2SectionEditorProps } from "./types";
export const DesignEditorV2 = memo(({ draft, updateField }: V2SectionEditorProps) => {
  const s = draft.design;
  const ColorField = ({ label, field }: { label: string; field: string }) => (
    <div className="flex items-center gap-3"><Label className="w-32">{label}</Label>
      <input type="color" value={s?.[field as keyof typeof s] as string || '#000000'} onChange={e=>updateField('design',field,e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
      <DebouncedInputV2 value={(s?.[field as keyof typeof s] as string)||''} onDebouncedChange={v=>updateField('design',field,v)} className="flex-1" />
    </div>
  );
  return (<div className="rounded-3xl p-10 space-y-6">
    <h2 className="text-2xl font-bold text-foreground">Design</h2>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <ColorField label="Cor Primária" field="primaryColor" />
      <ColorField label="Cor Secundária" field="secondaryColor" />
      <ColorField label="Fundo" field="backgroundColor" />
      <ColorField label="Botão" field="buttonColor" />
      <ColorField label="Título" field="titleColor" />
      <ColorField label="Borda" field="borderColor" />
      <ColorField label="Ícone" field="iconColor" />
      <ColorField label="Estrela" field="starColor" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3"><Label className="w-32">Arredondamento</Label>
        <Select value={s?.cardRoundness||'medio'} onValueChange={v=>updateField('design','cardRoundness',v)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="leve">Leve</SelectItem><SelectItem value="medio">Médio</SelectItem><SelectItem value="full">Full</SelectItem></SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3"><Label className="w-32">Espaçamento</Label>
        <Select value={s?.verticalSpacing||'medium'} onValueChange={v=>updateField('design','verticalSpacing',v)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="small">Pequeno</SelectItem><SelectItem value="medium">Médio</SelectItem><SelectItem value="large">Grande</SelectItem></SelectContent>
        </Select>
      </div>
      <DebouncedInputV2 value={s?.fontFamily||''} onDebouncedChange={v=>updateField('design','fontFamily',v)} placeholder="Fonte (ex: Inter, Poppins)" />
    </div>
  </div>);
}); DesignEditorV2.displayName='DesignEditorV2';
