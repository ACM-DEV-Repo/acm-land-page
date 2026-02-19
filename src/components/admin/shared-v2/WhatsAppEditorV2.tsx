import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MessageCircle } from "lucide-react";
import { FloatingWhatsappSettings } from "@/lib/cms-v2/cms-types";

interface WhatsAppEditorV2Props { data: FloatingWhatsappSettings | undefined; onUpdate: (field: string, value: unknown) => void; }

const WhatsAppEditorV2 = ({ data, onUpdate }: WhatsAppEditorV2Props) => (
  <div className="backdrop-blur-2xl bg-muted/5 rounded-3xl p-10 space-y-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-green-500/20 border border-green-500/30"><MessageCircle className="w-6 h-6 text-green-500" /></div>
        <div><h2 className="text-2xl font-bold text-foreground">Botão Flutuante WhatsApp</h2><p className="text-muted-foreground text-sm">Configure o botão de atendimento.</p></div>
      </div>
      <Switch checked={data?.enabled ?? true} onCheckedChange={(checked) => onUpdate('enabled', checked)} />
    </div>
    {(data?.enabled ?? true) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2"><Label>Número do WhatsApp</Label><Input value={data?.phoneNumber ?? ''} onChange={(e) => onUpdate('phoneNumber', e.target.value)} placeholder="5511999999999" /></div>
          <div className="space-y-2"><Label>Rótulo</Label><Input value={data?.label ?? ''} onChange={(e) => onUpdate('label', e.target.value)} placeholder="Fale Conosco" /></div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Mensagem Inicial</Label><Input value={data?.message ?? ''} onChange={(e) => onUpdate('message', e.target.value)} placeholder="Olá! Vim pelo site." /></div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10"><div><Label>Efeito "Pulse"</Label></div><Switch checked={data?.pulseEffect ?? true} onCheckedChange={(checked) => onUpdate('pulseEffect', checked)} /></div>
        </div>
      </div>
    )}
  </div>
);

export default WhatsAppEditorV2;
