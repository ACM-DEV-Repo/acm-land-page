import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import type { V2SectionEditorProps } from "./types";
export const FloatingWhatsappEditorV2 = memo(({ draft, updateNestedField }: V2SectionEditorProps) => {
  const s = draft.floatingWhatsapp;
  const u = (f: string, v: unknown) => updateNestedField(`floatingWhatsapp.${f}`, v);
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">WhatsApp Flutuante</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled||false} onCheckedChange={c=>u('enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.phoneNumber||''} onDebouncedChange={v=>u('phoneNumber',v)} placeholder="Telefone" />
      <DebouncedInputV2 value={s?.message||''} onDebouncedChange={v=>u('message',v)} placeholder="Mensagem" />
      <DebouncedInputV2 value={s?.label||''} onDebouncedChange={v=>u('label',v)} placeholder="Label" />
      <div className="flex items-center gap-4">
        <Switch checked={s?.pulseEffect||false} onCheckedChange={c=>u('pulseEffect',c)} /><Label>Efeito Pulse</Label>
        <Switch checked={s?.showOnMobile!==false} onCheckedChange={c=>u('showOnMobile',c)} /><Label>Mobile</Label>
        <Switch checked={s?.showLabelOnMobile||false} onCheckedChange={c=>u('showLabelOnMobile',c)} /><Label>Label Mobile</Label>
      </div>
    </div>
  </div>);
}); FloatingWhatsappEditorV2.displayName='FloatingWhatsappEditorV2';
