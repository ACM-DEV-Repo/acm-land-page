import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const TestimonialsEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.testimonials; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Depoimentos</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('testimonials','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('testimonials','title',v)} placeholder="Título" /></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Depoimentos ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('testimonials',{...s,items:[...items,{image:'',text:'',name:'',city:'',rating:5}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((t,i)=>(<div key={i} className="border rounded-xl p-4 space-y-3">
        <ImageUploadV2 label="Foto" value={t.image} onChange={u=>{const n=[...items];n[i]={...n[i],image:u};updateSection('testimonials',{...s,items:n});}} lpKey={lpKey} />
        <DebouncedInputV2 value={t.name||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],name:v};updateSection('testimonials',{...s,items:n});}} placeholder="Nome" />
        <DebouncedInputV2 value={t.city||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],city:v};updateSection('testimonials',{...s,items:n});}} placeholder="Cidade" />
        <DebouncedTextareaV2 value={t.text||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],text:v};updateSection('testimonials',{...s,items:n});}} placeholder="Depoimento" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('testimonials',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Depoimentos" ctaData={s?.footerCta} onUpdate={u=>updateSection('testimonials',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); TestimonialsEditorV2.displayName='TestimonialsEditorV2';
