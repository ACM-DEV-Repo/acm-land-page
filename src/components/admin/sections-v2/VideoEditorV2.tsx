import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import type { V2SectionEditorProps } from "./types";
export const VideoEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.video;
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Vídeo</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('video','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('video','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('video','subtitle',v)} placeholder="Subtítulo" />
      <DebouncedInputV2 value={s?.url||''} onDebouncedChange={v=>updateField('video','url',v)} placeholder="URL do vídeo (YouTube/Vimeo)" />
    </div>
    <SectionCTAEditorV2 sectionTitle="Vídeo" ctaData={s?.footerCta} onUpdate={u=>updateSection('video',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); VideoEditorV2.displayName='VideoEditorV2';
