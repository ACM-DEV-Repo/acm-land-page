import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const BeforeAfterEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.beforeAfter; const images = s?.images || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Antes & Depois</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('beforeAfter','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('beforeAfter','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('beforeAfter','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('beforeAfter','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('beforeAfter','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Imagens ({images.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('beforeAfter',{...s,images:[...images,{before:'',after:'',caption:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {images.map((img,i)=>(<div key={i} className="border rounded-xl p-4 space-y-3">
        <div className="flex gap-4"><ImageUploadV2 label="Antes" value={img.before} onChange={u=>{const n=[...images];n[i]={...n[i],before:u};updateSection('beforeAfter',{...s,images:n});}} lpKey={lpKey} /><ImageUploadV2 label="Depois" value={img.after} onChange={u=>{const n=[...images];n[i]={...n[i],after:u};updateSection('beforeAfter',{...s,images:n});}} lpKey={lpKey} /></div>
        <DebouncedInputV2 value={img.caption||''} onDebouncedChange={v=>{const n=[...images];n[i]={...n[i],caption:v};updateSection('beforeAfter',{...s,images:n});}} placeholder="Legenda" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('beforeAfter',{...s,images:images.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Antes & Depois" ctaData={s?.footerCta} onUpdate={u=>updateSection('beforeAfter',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); BeforeAfterEditorV2.displayName='BeforeAfterEditorV2';
