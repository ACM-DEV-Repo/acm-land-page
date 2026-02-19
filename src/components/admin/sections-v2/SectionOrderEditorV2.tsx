import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Button } from "@/components/ui/button"; import { ArrowUp, ArrowDown } from "lucide-react"; import type { V2SectionEditorProps } from "./types";
const sectionLabels: Record<string, string> = {
  hero:'Hero', benefits:'Benefícios', howItWorks:'Como Funciona', plans:'Planos', testimonials:'Depoimentos',
  kpis:'KPIs', about:'Sobre', contact:'Contato', beforeAfter:'Antes & Depois', process:'Processo',
  services:'Serviços', video:'Vídeo', videoCarousel:'Carrossel de Vídeos', whyChoose:'Por Que Escolher',
  ctaFinal:'CTA Final', faq:'FAQ', form:'Formulário', forWhom:'Para Quem', speakers:'Palestrantes', sponsors:'Patrocinadores'
};
export const SectionOrderEditorV2 = memo(({ draft, updateSection }: V2SectionEditorProps) => {
  const order = draft.sectionOrder || [];
  const move = (i: number, dir: -1 | 1) => { const n = [...order]; [n[i], n[i+dir]] = [n[i+dir], n[i]]; updateSection('sectionOrder', n as any); };
  return (<div className="rounded-3xl p-10 space-y-6">
    <h2 className="text-2xl font-bold text-foreground">Ordem das Seções</h2>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-2">
      {order.map((key,i)=>(<div key={key} className="flex items-center gap-3 p-2 border rounded-lg">
        <span className="text-sm text-muted-foreground w-6">{i+1}.</span>
        <Label className="flex-1">{sectionLabels[key]||key}</Label>
        <Button variant="ghost" size="sm" disabled={i===0} onClick={()=>move(i,-1)}><ArrowUp className="h-4 w-4"/></Button>
        <Button variant="ghost" size="sm" disabled={i===order.length-1} onClick={()=>move(i,1)}><ArrowDown className="h-4 w-4"/></Button>
      </div>))}
    </div>
  </div>);
}); SectionOrderEditorV2.displayName='SectionOrderEditorV2';
