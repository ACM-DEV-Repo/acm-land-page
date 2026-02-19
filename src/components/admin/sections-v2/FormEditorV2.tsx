import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2"; import { Button } from "@/components/ui/button"; import { Plus, Trash2 } from "lucide-react"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import type { V2SectionEditorProps } from "./types"; import type { FormFieldType } from "@/lib/cms-v2/cms-types";
const fieldTypes: { value: FormFieldType; label: string }[] = [
  {value:'text',label:'Texto'},{value:'email',label:'Email'},{value:'phone',label:'Telefone'},{value:'cpf',label:'CPF'},
  {value:'select',label:'Select'},{value:'date',label:'Data'},{value:'textarea',label:'Textarea'},{value:'checkbox',label:'Checkbox'},
  {value:'whatsapp',label:'WhatsApp'},{value:'paragraph',label:'Parágrafo'},{value:'cep',label:'CEP'}
];
export const FormEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const s = draft.form; const fields = s?.fields || [];
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Formulário</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('form','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.title||''} onDebouncedChange={v=>updateField('form','title',v)} placeholder="Título" />
      <DebouncedTextareaV2 value={s?.subtitle||''} onDebouncedChange={v=>updateField('form','subtitle',v)} placeholder="Subtítulo" />
      <DebouncedInputV2 value={s?.ctaButton||''} onDebouncedChange={v=>updateField('form','ctaButton',v)} placeholder="Texto do botão" />
      <DebouncedInputV2 value={s?.webhookUrl||''} onDebouncedChange={v=>updateField('form','webhookUrl',v)} placeholder="Webhook URL" />
    </div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Label>Campos ({fields.length})</Label><Button variant="outline" size="sm" onClick={()=>updateSection('form',{...s,fields:[...fields,{id:crypto.randomUUID(),type:'text' as FormFieldType,label:'',required:false}]})}><Plus className="h-4 w-4 mr-1"/>Add</Button></div>
      {fields.map((f,i)=>(<div key={f.id} className="border rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Select value={f.type} onValueChange={v=>{const n=[...fields];n[i]={...n[i],type:v as FormFieldType};updateSection('form',{...s,fields:n});}}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>{fieldTypes.map(ft=>(<SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>))}</SelectContent>
          </Select>
          <DebouncedInputV2 value={f.label||''} onDebouncedChange={v=>{const n=[...fields];n[i]={...n[i],label:v};updateSection('form',{...s,fields:n});}} placeholder="Label" className="flex-1" />
          <Switch checked={f.required} onCheckedChange={c=>{const n=[...fields];n[i]={...n[i],required:c};updateSection('form',{...s,fields:n});}} /><Label className="text-xs">Obrig.</Label>
          <Button variant="ghost" size="sm" onClick={()=>updateSection('form',{...s,fields:fields.filter((_,j)=>j!==i)})} className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
        </div>
      </div>))}
    </div>
    <SectionCTAEditorV2 sectionTitle="Formulário" ctaData={s?.footerCta} onUpdate={u=>updateSection('form',{...s,footerCta:{...(s?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}})} />
  </div>);
}); FormEditorV2.displayName='FormEditorV2';
