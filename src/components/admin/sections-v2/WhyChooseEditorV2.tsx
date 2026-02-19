import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const WhyChooseEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.whyChoose; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Por Que Escolher</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('whyChoose','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('whyChoose','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('whyChoose','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('whyChoose','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('whyChoose','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Itens ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('whyChoose',{...s,items:[...items,{title:'',description:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((item,i)=>(<div key={i} className="border rounded-xl p-4 space-y-2">
        <DebouncedInputV2 value={item.title||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],title:v};updateSection('whyChoose',{...s,items:n});}} placeholder="Título" />
        <DebouncedTextareaV2 value={item.description||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],description:v};updateSection('whyChoose',{...s,items:n});}} placeholder="Descrição" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('whyChoose',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Por Que Escolher" ctaData={s?.footerCta} onUpdate={u=>updateSection('whyChoose',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); WhyChooseEditorV2.displayName='WhyChooseEditorV2';
