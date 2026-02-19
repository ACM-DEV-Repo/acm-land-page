import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import type { V2SectionEditorProps } from "./types";
export const ContactEditorV2 = memo(({ draft, updateField }: V2SectionEditorProps) => {
  const s = draft.contact;
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Contato</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('contact','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('contact','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('contact','subtitle',v)} placeholder="Subtítulo" />
      <DebouncedInputV2 value={s?.whatsappLink||''} onDebouncedChange={v=>updateField('contact','whatsappLink',v)} placeholder="Link WhatsApp" />
    </div>
  </div>);
}); ContactEditorV2.displayName='ContactEditorV2';
