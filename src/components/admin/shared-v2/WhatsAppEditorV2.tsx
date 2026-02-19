import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MessageCircle } from "lucide-react";
import { FloatingWhatsappSettings } from "@/lib/cms-v2/cms-types";

interface WhatsAppEditorV2Props {
  data: FloatingWhatsappSettings | undefined;
  onUpdate: (field: string, value: unknown) => void;
}

const WhatsAppEditorV2 = ({ data, onUpdate }: WhatsAppEditorV2Props) => {
  return (
    <div className="glass-primitive rounded-3xl p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/30">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Botão Flutuante WhatsApp</h2>
            <p className="text-muted-foreground text-sm">Configure o botão de atendimento que flutua nesta LP.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-muted/20 px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-foreground">Status:</span>
          <Switch
            checked={data?.enabled ?? true}
            onCheckedChange={(checked) => onUpdate('enabled', checked)}
          />
        </div>
      </div>

      {(data?.enabled ?? true) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Número do WhatsApp</Label>
              <Input
                value={data?.phoneNumber ?? ''}
                onChange={(e) => onUpdate('phoneNumber', e.target.value)}
                placeholder="5511999999999"
                className="input-admin"
              />
              <p className="text-xs text-muted-foreground">Apenas números (DDD + Número)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Rótulo (Pílula)</Label>
              <Input
                value={data?.label ?? ''}
                onChange={(e) => onUpdate('label', e.target.value)}
                placeholder="Ex: Fale Conosco"
                className="input-admin"
              />
              <p className="text-xs text-muted-foreground">Texto que aparece ao lado do ícone no desktop.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Mensagem Inicial</Label>
              <Input
                value={data?.message ?? ''}
                onChange={(e) => onUpdate('message', e.target.value)}
                placeholder="Olá! Vim pelo site."
                className="input-admin"
              />
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Efeito "Pulse"</Label>
                  <p className="text-xs text-muted-foreground">Animação para chamar atenção</p>
                </div>
                <Switch
                  checked={data?.pulseEffect ?? true}
                  onCheckedChange={(checked) => onUpdate('pulseEffect', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-foreground">Mostrar no Mobile</Label>
                  <p className="text-xs text-muted-foreground">Exibir o botão em celulares</p>
                </div>
                <Switch
                  checked={data?.showOnMobile ?? true}
                  onCheckedChange={(checked) => onUpdate('showOnMobile', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppEditorV2;
