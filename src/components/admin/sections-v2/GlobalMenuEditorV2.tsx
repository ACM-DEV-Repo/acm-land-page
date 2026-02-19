import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const GlobalMenuEditorV2 = memo(({ draft, lpKey, updateNestedField }: V2SectionEditorProps) => {
  const s = draft.globalMenu; const links = s?.links || [];
  const u = (f: string, v: unknown) => updateNestedField(`globalMenu.${f}`, v);
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Menu Global</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled||false} onCheckedChange={c=>u('enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <ImageUploadV2 label="Logo" value={s?.logoUrl} onChange={v=>u('logoUrl',v)} lpKey={lpKey} />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Links ({links.length})</Label><Button variant="outline" size="sm" onClick={()=>u('links',[...links,{text:'',url:''}])}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {links.map((link,i)=>(<div key={i} className="flex items-center gap-3">
        <DebouncedInputV2 value={link.text||''} onDebouncedChange={v=>{const n=[...links];n[i]={...n[i],text:v};u('links',n);}} placeholder="Texto" className="flex-1" />
        <DebouncedInputV2 value={link.url||''} onDebouncedChange={v=>{const n=[...links];n[i]={...n[i],url:v};u('links',n);}} placeholder="URL" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>u('links',links.filter((_,j)=>j!==i))} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
  </div>);
}); GlobalMenuEditorV2.displayName='GlobalMenuEditorV2';
