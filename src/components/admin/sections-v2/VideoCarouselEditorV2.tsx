import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const VideoCarouselEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.videoCarousel; const items = s?.items || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Carrossel de Vídeos</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('videoCarousel','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('videoCarousel','title',v)} placeholder="Título" /></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Vídeos ({items.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('videoCarousel',{...s,items:[...items,{title:'',url:''}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {items.map((item,i)=>(<div key={i} className="flex items-center gap-3">
        <DebouncedInputV2 value={item.title||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],title:v};updateSection('videoCarousel',{...s,items:n});}} placeholder="Título" className="flex-1" />
        <DebouncedInputV2 value={item.url||''} onDebouncedChange={v=>{const n=[...items];n[i]={...n[i],url:v};updateSection('videoCarousel',{...s,items:n});}} placeholder="URL" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>updateSection('videoCarousel',{...s,items:items.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Carrossel de Vídeos" ctaData={s?.footerCta} onUpdate={u=>updateSection('videoCarousel',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); VideoCarouselEditorV2.displayName='VideoCarouselEditorV2';
