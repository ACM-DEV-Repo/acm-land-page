import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const ProcessEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.process; const steps = s?.steps || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Processo</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('process','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('process','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('process','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('process','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('process','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Etapas ({steps.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('process',{...s,steps:[...steps,{title:'',description:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {steps.map((step,i)=>(<div key={i} className="border rounded-xl p-4 space-y-2">
        <DebouncedInputV2 value={step.title||''} onDebouncedChange={v=>{const n=[...steps];n[i]={...n[i],title:v};updateSection('process',{...s,steps:n});}} placeholder="Título" />
        <DebouncedTextareaV2 value={step.description||''} onDebouncedChange={v=>{const n=[...steps];n[i]={...n[i],description:v};updateSection('process',{...s,steps:n});}} placeholder="Descrição" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('process',{...s,steps:steps.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Processo" ctaData={s?.footerCta} onUpdate={u=>updateSection('process',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); ProcessEditorV2.displayName='ProcessEditorV2';
