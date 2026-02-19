import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const ForWhomEditorV2 = memo(({ draft, lpKey, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.forWhom; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Para Quem</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('forWhom','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('forWhom','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('forWhom','subtitle',v)} placeholder="Subtítulo" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={s?.imageDesktop} onChange={u=>updateField('forWhom','imageDesktop',u)} lpKey={lpKey} /><ImageUploadV2 label="Mobile" value={s?.imageMobile} onChange={u=>updateField('forWhom','imageMobile',u)} lpKey={lpKey} /></div>
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Itens ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('forWhom',{...s,items:[...items,'']})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((item,i)=>(<div key={i} className="flex items-center gap-3">
        <DebouncedInputV2 value={item||''} onDebouncedChange={v=>{const n=[...items];n[i]=v;updateSection('forWhom',{...s,items:n});}} className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('forWhom',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Para Quem" ctaData={s?.footerCta} onUpdate={u=>updateSection('forWhom',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); ForWhomEditorV2.displayName='ForWhomEditorV2';
