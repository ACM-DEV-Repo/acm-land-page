import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import type { V2SectionEditorProps } from "./types";
export const AboutEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.about;
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Sobre</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('about','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('about','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.text||''} onDebouncedChange={v=>updateField('about','text',v)} placeholder="Texto" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('about','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('about','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
    <SectionCTAEditorV2 sectionTitle="Sobre" ctaData={s?.footerCta} onUpdate={u=>updateSection('about',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); AboutEditorV2.displayName='AboutEditorV2';
