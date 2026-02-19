import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const PlansEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.plans; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Planos</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('plans','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('plans','title',v)} placeholder="Título" /></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Planos ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('plans',{...s,items:[...items,{id:crypto.randomUUID(),name:'',frequency:'',price:'',link:'',recommended:false}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((plan,i)=>(<div key={plan.id||i} className="border rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between"><DebouncedInputV2 value={plan.name||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],name:v};updateSection('plans',{...s,items:n});}} placeholder="Nome" className="flex-1 mr-2" />
        <Switch checked={plan.recommended} onCheckedChange={c=>{const n=[...items];n[i]={...n[i],recommended:c};updateSection('plans',{...s,items:n});}} /><Label className="text-xs">Destaque</Label></div>
        <div className="grid grid-cols-2 gap-3">
          <DebouncedInputV2 value={plan.price||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],price:v};updateSection('plans',{...s,items:n});}} placeholder="Preço" />
          <DebouncedInputV2 value={plan.frequency||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],frequency:v};updateSection('plans',{...s,items:n});}} placeholder="Frequência" />
          <DebouncedInputV2 value={plan.originalPrice||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],originalPrice:v};updateSection('plans',{...s,items:n});}} placeholder="Preço original" />
          <DebouncedInputV2 value={plan.discount||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],discount:v};updateSection('plans',{...s,items:n});}} placeholder="Desconto" />
          <DebouncedInputV2 value={plan.ctaText||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],ctaText:v};updateSection('plans',{...s,items:n});}} placeholder="Texto CTA" />
          <DebouncedInputV2 value={plan.link||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],link:v};updateSection('plans',{...s,items:n});}} placeholder="Link" />
        </div>
        <Button variant="ghost" size="sm" onClick={()=>updateSection('plans',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Planos" ctaData={s?.footerCta} onUpdate={u=>updateSection('plans',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); PlansEditorV2.displayName='PlansEditorV2';
