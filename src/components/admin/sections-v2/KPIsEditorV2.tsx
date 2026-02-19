import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const KPIsEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.kpis; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">KPIs</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('kpis','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Métricas ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('kpis',{...s,items:[...items,{value:'',label:'',enabled:true}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((item,i)=>(<div key={i} className="flex items-center gap-3">
        <Switch checked={item.enabled!==false} onCheckedChange={c=>{const n=[...items];n[i]={...n[i],enabled:c};updateSection('kpis',{...s,items:n});}} />
        <DebouncedInputV2 value={item.value||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],value:v};updateSection('kpis',{...s,items:n});}} placeholder="Valor" className="w-24" />
        <DebouncedInputV2 value={item.label||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],label:v};updateSection('kpis',{...s,items:n});}} placeholder="Label" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('kpis',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="KPIs" ctaData={s?.footerCta} onUpdate={u=>updateSection('kpis',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); KPIsEditorV2.displayName='KPIsEditorV2';
