import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const SpeakersEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.speakers; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Palestrantes</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('speakers','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('speakers','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('speakers','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Palestrantes ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('speakers',{...s,items:[...items,{name:'',role:'',bio:'',image:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((sp,i)=>(<div key={i} className="border rounded-xl p-4 space-y-3">
        <ImageUploadV2 label="Foto" value={sp.image} onChange={u=>{const n=[...items];n[i]={...n[i],image:u};updateSection('speakers',{...s,items:n});}} lpKey={lpKey} />
        <DebouncedInputV2 value={sp.name||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],name:v};updateSection('speakers',{...s,items:n});}} placeholder="Nome" />
        <DebouncedInputV2 value={sp.role||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],role:v};updateSection('speakers',{...s,items:n});}} placeholder="Cargo" />
        <DebouncedTextareaV2 value={sp.bio||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],bio:v};updateSection('speakers',{...s,items:n});}} placeholder="Bio" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('speakers',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Palestrantes" ctaData={s?.footerCta} onUpdate={u=>updateSection('speakers',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); SpeakersEditorV2.displayName='SpeakersEditorV2';
