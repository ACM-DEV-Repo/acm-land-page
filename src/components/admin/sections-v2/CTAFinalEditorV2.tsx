import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import type { V2SectionEditorProps } from "./types";
export const CTAFinalEditorV2 = memo(({ draft, lpKey, updateField }: V2SectionEditorProps) => {
  const s = draft.ctaFinal;
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">CTA Final</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('ctaFinal','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('ctaFinal','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('ctaFinal','subtitle',v)} placeholder="Subtítulo" />
      <DebouncedInputV2 value={s?.buttonText||''} onDebouncedChange={v=>updateField('ctaFinal','buttonText',v)} placeholder="Texto do botão" />
      <DebouncedInputV2 value={s?.buttonLink||''} onDebouncedChange={v=>updateField('ctaFinal','buttonLink',v)} placeholder="Link do botão" />
      <DebouncedInputV2 value={s?.trustText||''} onDebouncedChange={v=>updateField('ctaFinal','trustText',v)} placeholder="Texto de confiança" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('ctaFinal','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('ctaFinal','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
  </div>);
}); CTAFinalEditorV2.displayName='CTAFinalEditorV2';
