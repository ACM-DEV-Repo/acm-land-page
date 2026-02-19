import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionFooterCTA } from "@/lib/cms-v2/cms-types";

interface SectionCTAEditorV2Props {
  sectionTitle: string;
  ctaData: SectionFooterCTA | undefined;
  onUpdate: (updates: Partial<SectionFooterCTA>) => void;
}

export const SectionCTAEditorV2 = ({
  sectionTitle,
  ctaData,
  onUpdate
}: SectionCTAEditorV2Props) => {

  if (!ctaData) return null;

  return (
    <div className="rounded-3xl bg-muted/30 backdrop-blur-2xl p-6 space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            Botão Final de Seção
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20 uppercase tracking-wide">
              Novo
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Ative para exibir um botão de ação logo após o conteúdo de {sectionTitle}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={ctaData.enabled}
            onCheckedChange={(checked) => onUpdate({ enabled: checked })}
          />
          <Label className="text-foreground text-sm font-semibold">Ativar</Label>
        </div>
      </div>

      {ctaData.enabled && (
        <div className="space-y-5 pt-2 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-foreground font-semibold">Texto do Botão</Label>
              <Input
                value={ctaData.text}
                onChange={(e) => onUpdate({ text: e.target.value })}
                placeholder="Ex: Quero Contratar"
                className="input-admin rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-semibold">Link de Destino</Label>
              <Input
                value={ctaData.link}
                onChange={(e) => onUpdate({ link: e.target.value })}
                placeholder="Ex: /checkout"
                className="input-admin rounded-lg"
              />
              <p className="text-[10px] text-muted-foreground">
                * Rastreamento UTM automático aplicado no site.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/20 p-4">
            <div className="space-y-0.5">
              <Label className="text-foreground font-semibold">Ocultar no Mobile</Label>
              <p className="text-xs text-muted-foreground">
                O botão não aparecerá em celulares para economizar espaço.
              </p>
            </div>
            <Switch
              checked={ctaData.mobileHidden}
              onCheckedChange={(checked) => onUpdate({ mobileHidden: checked })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
