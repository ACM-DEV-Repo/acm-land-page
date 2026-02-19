import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const SponsorsEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.sponsors; const tiers = s?.tiers || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Patrocinadores</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('sponsors','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('sponsors','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('sponsors','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Categorias ({tiers.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('sponsors',{...s,tiers:[...tiers,{name:'',enabled:true,items:[]}]})}><Plus className="h-4 w-4 mr-1"/>Add Categoria</Button></div>
      {tiers.map((tier,ti)=>(<div key={ti} className="border rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-3"><Switch checked={tier.enabled} onCheckedChange={c=>{const n=[...tiers];n[ti]={...n[ti],enabled:c};updateSection('sponsors',{...s,tiers:n});}} />
        <DebouncedInputV2 value={tier.name||''} onDebouncedChange={v=>{const n=[...tiers];n[ti]={...n[ti],name:v};updateSection('sponsors',{...s,tiers:n});}} placeholder="Nome da categoria" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('sponsors',{...s,tiers:tiers.filter((_,j)=>j!==ti)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button></div>
        <div className="pl-4 space-y-2">
          <Button variant="outline" size="sm" onClick={()=>{const n=[...tiers];n[ti]={...n[ti],items:[...n[ti].items,{name:'',logo:''}]};updateSection('sponsors',{...s,tiers:n});}}><Plus className="h-4 w-4 mr-1"/>Add Sponsor</Button>
          {tier.items.map((sp,si)=>(<div key={si} className="flex items-center gap-3">
            <ImageUploadV2 label="Logo" value={sp.logo} onChange={u=>{const n=[...tiers];const it=[...n[ti].items];it[si]={...it[si],logo:u};n[ti]={...n[ti],items:it};updateSection('sponsors',{...s,tiers:n});}} lpKey={lpKey} />
            <DebouncedInputV2 value={sp.name||''} onDebouncedChange={v=>{const n=[...tiers];const it=[...n[ti].items];it[si]={...it[si],name:v};n[ti]={...n[ti],items:it};updateSection('sponsors',{...s,tiers:n});}} placeholder="Nome" className="flex-1" />
            <Button variant="ghost" size="sm" onClick={()=>{const n=[...tiers];n[ti]={...n[ti],items:n[ti].items.filter((_,j)=>j!==si)};updateSection('sponsors',{...s,tiers:n});}} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
          </div>))}
        </div>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Patrocinadores" ctaData={s?.footerCta} onUpdate={u=>updateSection('sponsors',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); SponsorsEditorV2.displayName='SponsorsEditorV2';
