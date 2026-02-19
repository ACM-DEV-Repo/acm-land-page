import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const FooterEditorV2 = memo(({ draft, lpKey, updateField, updateSection, updateNestedField }: V2SectionEditorProps) => {
  const s = draft.footer; const links = s?.links || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Rodapé</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('footer','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Logo Desktop" value={s?.logoDesktop||s?.logo} onChange={u=>updateField('footer','logoDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Logo Mobile" value={s?.logoMobile} onChange={u=>updateField('footer','logoMobile',u)} lpKey={lpKey} /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Links ({links.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('footer',{...s,links:[...links,{text:'',url:'',enabled:true}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {links.map((link,i)=>(<div key={i} className="flex items-center gap-3">
        <Switch checked={link.enabled!==false} onCheckedChange={c=>{const n=[...links];n[i]={...n[i],enabled:c};updateSection('footer',{...s,links:n});}} />
        <DebouncedInputV2 value={link.text||''} onDebouncedChange={v=>{const n=[...links];n[i]={...n[i],text:v};updateSection('footer',{...s,links:n});}} placeholder="Texto" className="flex-1" />
        <DebouncedInputV2 value={link.url||''} onDebouncedChange={v=>{const n=[...links];n[i]={...n[i],url:v};updateSection('footer',{...s,links:n});}} placeholder="URL" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('footer',{...s,links:links.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <Label>CNPJ</Label>
      <div className="flex items-center gap-3"><Switch checked={s?.cnpj?.enabled!==false} onCheckedChange={c=>updateNestedField('footer.cnpj.enabled',c)} /><DebouncedInputV2 value={s?.cnpj?.text||''} onDebouncedChange={v=>updateNestedField('footer.cnpj.text',v)} placeholder="CNPJ" className="flex-1" /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <Label>Redes Sociais</Label>
      {(['instagram','facebook','linkedin','youtube','tiktok'] as const).map(net=>(<div key={net} className="flex items-center gap-3">
        <Switch checked={s?.socials?.[net]?.enabled||false} onCheckedChange={c=>updateNestedField(`footer.socials.${net}.enabled`,c)} />
        <Label className="w-20 capitalize">{net}</Label>
        <DebouncedInputV2 value={s?.socials?.[net]?.url||''} onDebouncedChange={v=>updateNestedField(`footer.socials.${net}.url`,v)} placeholder="URL" className="flex-1" />
      </div>))}
    </div>
  </div>);
}); FooterEditorV2.displayName='FooterEditorV2';
