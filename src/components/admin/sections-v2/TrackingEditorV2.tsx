import { memo, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2";
import { V2SectionEditorProps } from "./types";
import { fetchGlobalTrackingV2 } from "@/lib/cms-v2/cms-api";
import { TrackingSettings } from "@/lib/cms-v2/cms-types";
import {
  validatePixelId,
  getStatusDotColor,
  getStatusColor,
  PIXEL_PLATFORMS,
  type PixelPlatform,
} from "@/lib/cms-v2/pixelValidation-v2";

export const TrackingEditorV2 = memo(({ draft, updateField }: V2SectionEditorProps) => {
  const tracking = draft.tracking;
  const [globalTracking, setGlobalTracking] = useState<TrackingSettings | null>(null);

  // Busca pixels globais pra referência
  useEffect(() => {
    fetchGlobalTrackingV2().then(setGlobalTracking);
  }, []);

  const useGlobal = tracking?.useGlobal !== false; // default true

  return (
    <div className="glass-primitive rounded-3xl p-10 space-y-6">
      {/* Header + Master toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Rastreamento (Pixels)</h2>
        <div className="flex items-center space-x-2">
          <Switch
            checked={tracking?.enabled !== false}
            onCheckedChange={(checked) => updateField('tracking', 'enabled', checked)}
          />
          <Label className="text-foreground text-sm font-semibold">Ativar rastreamento</Label>
        </div>
      </div>

      {/* Toggle herança global */}
      <div className="bg-muted/20 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-semibold">Herdar pixels globais</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              {useGlobal
                ? 'Campos vazios herdam automaticamente do painel global'
                : 'Esta LP usa apenas seus próprios pixels (sem fallback global)'}
            </p>
          </div>
          <Switch
            checked={useGlobal}
            onCheckedChange={(checked) => updateField('tracking', 'useGlobal', checked)}
          />
        </div>
      </div>

      {/* Campos de pixel */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <Label className="text-foreground font-semibold text-lg">Pixels de Rastreamento</Label>
        <p className="text-sm text-muted-foreground">
          Cole os IDs dos pixels de cada plataforma. Eles serão injetados automaticamente no &lt;head&gt; da página.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PIXEL_PLATFORMS.map(({ key, label, placeholder }) => {
            const localValue = tracking?.[key as PixelPlatform] || '';
            const globalValue = globalTracking?.[key as PixelPlatform] || '';
            const validation = validatePixelId(key, localValue);

            // Feedback de herança
            const isInheriting = useGlobal && !localValue.trim() && !!globalValue.trim();
            const isOverriding = !!localValue.trim();

            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Label className="text-foreground text-sm">{label}</Label>
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isInheriting ? 'bg-blue-500' : getStatusDotColor(validation.status)
                    }`}
                  />
                </div>
                <DebouncedInputV2
                  value={localValue}
                  onDebouncedChange={(v) => updateField('tracking', key, v)}
                  placeholder={isInheriting ? `Global: ${globalValue}` : placeholder}
                  className="input-admin font-mono text-sm"
                />
                {/* Mensagem de status / herança */}
                {isInheriting ? (
                  <p className="text-[11px] text-blue-400">
                    ↳ Herdando global: {globalValue}
                  </p>
                ) : isOverriding && useGlobal && globalValue.trim() ? (
                  <p className="text-[11px] text-green-400">
                    Pixel específico ativo (sobrescreve global)
                  </p>
                ) : validation.status !== 'empty' ? (
                  <p className={`text-[11px] ${
                    validation.status === 'valid' ? 'text-green-400' :
                    validation.status === 'warning' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {validation.message}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground/50">Não configurado</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status badges */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-3">
        <Label className="text-foreground font-semibold text-lg">Status</Label>
        <div className="flex flex-wrap gap-2">
          {PIXEL_PLATFORMS.map(({ key, label }) => {
            const localValue = tracking?.[key as PixelPlatform] || '';
            const globalValue = globalTracking?.[key as PixelPlatform] || '';
            const isInheriting = useGlobal && !localValue.trim() && !!globalValue.trim();
            const hasValue = !!localValue.trim();
            const validation = validatePixelId(key, localValue);

            let badgeClass: string;
            let badgeText: string;

            if (hasValue) {
              badgeClass = getStatusColor(validation.status);
              badgeText = validation.status === 'valid' ? 'Ativo' : validation.status === 'warning' ? 'Espaços' : 'Inválido';
            } else if (isInheriting) {
              badgeClass = 'text-blue-400 bg-blue-500/20 border border-blue-500/30';
              badgeText = 'Global';
            } else {
              badgeClass = 'text-muted-foreground bg-muted/30';
              badgeText = 'Vazio';
            }

            return (
              <span
                key={key}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeClass}`}
              >
                {label.split('(')[0].trim()}: {badgeText}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
});

TrackingEditorV2.displayName = 'TrackingEditorV2';
