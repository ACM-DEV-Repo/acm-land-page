import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
export const ConversionEditorV2 = memo(({ draft, updateNestedField }: V2SectionEditorProps) => {
  const c = draft.conversion; const cd = c?.countdown; const ei = c?.exitIntent; const sp = c?.socialProof;
  const u = (p: string, v: unknown) => updateNestedField(`conversion.${p}`, v);
  return (<div className="rounded-3xl p-10 space-y-6">
    <h2 className="text-2xl font-bold text-foreground">Conversão</h2>
    {/* Countdown */}
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label className="font-semibold">Countdown</Label><Switch checked={cd?.enabled||false} onCheckedChange={v=>u('countdown.enabled',v)} /></div>
      <DebouncedInputV2 value={cd?.label||''} onDebouncedChange={v=>u('countdown.label',v)} placeholder="Label" />
      <Select value={cd?.mode||'deadline'} onValueChange={v=>u('countdown.mode',v)}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value="deadline">Deadline</SelectItem><SelectItem value="evergreen">Evergreen</SelectItem><SelectItem value="roundHour">Hora Cheia</SelectItem></SelectContent>
      </Select>
    </div>
    {/* Exit Intent */}
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label className="font-semibold">Exit Intent</Label><Switch checked={ei?.enabled||false} onCheckedChange={v=>u('exitIntent.enabled',v)} /></div>
      <DebouncedInputV2 value={ei?.title||''} onDebouncedChange={v=>u('exitIntent.title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={ei?.text||''} onDebouncedChange={v=>u('exitIntent.text',v)} placeholder="Texto" />
      <DebouncedInputV2 value={ei?.ctaText||''} onDebouncedChange={v=>u('exitIntent.ctaText',v)} placeholder="CTA" />
      <DebouncedInputV2 value={ei?.ctaLink||''} onDebouncedChange={v=>u('exitIntent.ctaLink',v)} placeholder="Link" />
    </div>
    {/* Social Proof */}
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label className="font-semibold">Social Proof</Label><Switch checked={sp?.enabled||false} onCheckedChange={v=>u('socialProof.enabled',v)} /></div>
      <div className="flex items-center justify-between"><Label>Itens ({sp?.items?.length||0})</Label><Button variant="outline" size="sm" onClick={()=>u('socialProof.items',[...(sp?.items||[]),{name:'',city:'',plan:'',timeAgo:''}])}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {(sp?.items||[]).map((item,i)=>(<div key={i} className="flex items-center gap-2">
        <DebouncedInputV2 value={item.name||''} onDebouncedChange={v=>{const n=[...(sp?.items||[])];n[i]={...n[i],name:v};u('socialProof.items',n);}} placeholder="Nome" className="flex-1" />
        <DebouncedInputV2 value={item.city||''} onDebouncedChange={v=>{const n=[...(sp?.items||[])];n[i]={...n[i],city:v};u('socialProof.items',n);}} placeholder="Cidade" className="flex-1" />
        <Button variant="ghost" size="sm" onClick={()=>{const n=(sp?.items||[]).filter((_,j)=>j!==i);u('socialProof.items',n);}} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
      </div>))}
    </div>
  </div>);
}); ConversionEditorV2.displayName='ConversionEditorV2';
