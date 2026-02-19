import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const FAQEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.faq; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">FAQ</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('faq','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('faq','title',v)} placeholder="Título" /></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Perguntas ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('faq',{...s,items:[...items,{question:'',answer:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((item,i)=>(<div key={i} className="border rounded-xl p-4 space-y-2">
        <DebouncedInputV2 value={item.question||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],question:v};updateSection('faq',{...s,items:n});}} placeholder="Pergunta" />
        <DebouncedTextareaV2 value={item.answer||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],answer:v};updateSection('faq',{...s,items:n});}} placeholder="Resposta" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('faq',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="FAQ" ctaData={s?.footerCta} onUpdate={u=>updateSection('faq',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); FAQEditorV2.displayName='FAQEditorV2';
