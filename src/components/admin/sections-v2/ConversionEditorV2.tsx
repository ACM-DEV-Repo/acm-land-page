import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Timer, ShieldAlert, Trophy, Plus, Trash2, Ticket, Palette } from "lucide-react";
import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2";
import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2";
import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2";
import { V2SectionEditorProps } from "./types";
import type { ConversionSettings } from "@/lib/cms-v2/cms-types";

// Defaults para evitar undefined
const DEFAULT_COUNTDOWN: ConversionSettings['countdown'] = {
  enabled: false,
  mode: 'deadline',
  deadline: '',
  evergreenHours: 24,
  label: 'Oferta termina em:',
  showInPlans: true,
  showInCtaFinal: true,
  expiredText: '',
};

const DEFAULT_EXIT: ConversionSettings['exitIntent'] = {
  enabled: false,
  title: 'Espera! Antes de ir...',
  text: 'Garanta um desconto especial na sua primeira limpeza',
  ctaText: 'Quero meu desconto',
  ctaLink: '/checkout',
  dismissText: 'Nao, obrigado',
  frequency: 'session',
  delaySeconds: 5,
};

const DEFAULT_SOCIAL: ConversionSettings['socialProof'] = {
  enabled: false,
  items: [],
  intervalSeconds: 20,
  maxPerVisit: 5,
  position: 'bottom-left',
};

export const ConversionEditorV2 = memo(({ draft, updateField, updateSection }: V2SectionEditorProps) => {
  const conv = draft.conversion || { couponCode: '', countdown: DEFAULT_COUNTDOWN, exitIntent: DEFAULT_EXIT, socialProof: DEFAULT_SOCIAL };
  const countdown = conv.countdown || DEFAULT_COUNTDOWN;
  const exitIntent = conv.exitIntent || DEFAULT_EXIT;
  const socialProof = conv.socialProof || DEFAULT_SOCIAL;

  const updateConv = (field: string, value: unknown) => {
    updateSection('conversion' as any, { ...conv, [field]: value });
  };

  const updateCountdown = (field: string, value: unknown) => {
    updateSection('conversion' as any, {
      ...conv,
      countdown: { ...countdown, [field]: value },
    });
  };

  const updateExit = (field: string, value: unknown) => {
    updateSection('conversion' as any, {
      ...conv,
      exitIntent: { ...exitIntent, [field]: value },
    });
  };

  const updateSocial = (field: string, value: unknown) => {
    updateSection('conversion' as any, {
      ...conv,
      socialProof: { ...socialProof, [field]: value },
    });
  };

  const addSocialItem = () => {
    updateSocial('items', [
      ...socialProof.items,
      { name: '', city: '', plan: '', timeAgo: '', message: '' },
    ]);
  };

  const removeSocialItem = (index: number) => {
    updateSocial('items', socialProof.items.filter((_, i) => i !== index));
  };

  const updateSocialItem = (index: number, field: string, value: string) => {
    const newItems = [...socialProof.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSocial('items', newItems);
  };

  return (
    <div className="glass-primitive rounded-3xl p-10 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">Conversao</h2>

      {/* ============================================================ */}
      {/* Cupom da Campanha */}
      {/* ============================================================ */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <Label className="text-foreground font-semibold text-lg flex items-center gap-2">
          <Ticket className="h-5 w-5 text-accent" />
          Cupom da Campanha
        </Label>
        <p className="text-sm text-muted-foreground">
          Este cupom sera adicionado automaticamente aos links dos planos, exit intent e sticky CTA.
          O cupom precisa existir no Stripe.
        </p>
        <DebouncedInputV2
          value={conv.couponCode || ''}
          onDebouncedChange={(v) => updateConv('couponCode', v)}
          placeholder="Ex: PROMO25"
          className="input-admin font-mono uppercase"
        />
      </div>

      {/* ============================================================ */}
      {/* Urgencia — Countdown Timer */}
      {/* ============================================================ */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold text-lg flex items-center gap-2">
            <Timer className="h-5 w-5 text-orange-400" />
            Urgencia (Countdown)
          </Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={countdown.enabled}
              onCheckedChange={(v) => updateCountdown('enabled', v)}
            />
            <Label className="text-foreground text-sm font-semibold">
              {countdown.enabled ? 'Ligado' : 'Desligado'}
            </Label>
          </div>
        </div>

        {countdown.enabled && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Modo</Label>
              <Select
                value={countdown.mode}
                onValueChange={(v) => updateCountdown('mode', v)}
              >
                <SelectTrigger className="input-admin">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline fixa (data/hora)</SelectItem>
                  <SelectItem value="evergreen">Evergreen (por visitante)</SelectItem>
                  <SelectItem value="roundHour">Proxima hora cheia (trafego pago)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {countdown.mode === 'deadline' && (
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Data/Hora Limite</Label>
                <input
                  type="datetime-local"
                  value={countdown.deadline || ''}
                  onChange={(e) => updateCountdown('deadline', e.target.value)}
                  className="input-admin font-mono w-full px-4 py-2 rounded-lg bg-muted/20 text-foreground"
                />
                <p className="text-xs text-muted-foreground">Selecione a data e hora limite da oferta</p>
              </div>
            )}

            {countdown.mode === 'evergreen' && (
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Duracao (horas)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[countdown.evergreenHours || 24]}
                    onValueChange={([v]) => updateCountdown('evergreenHours', v)}
                    min={1}
                    max={72}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-12 text-right">
                    {countdown.evergreenHours || 24}h
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Cada visitante ve o timer a partir da primeira visita</p>
              </div>
            )}

            {countdown.mode === 'roundHour' && (
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Horas a frente</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[countdown.roundHourAhead || 2]}
                    onValueChange={([v]) => updateCountdown('roundHourAhead', v)}
                    min={1}
                    max={6}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-12 text-right">
                    {countdown.roundHourAhead || 2}h
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Timer conta ate a proxima hora cheia. Ex: visitante entra 15:37 com 2h → expira as 17:00. Ideal para trafego pago.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Texto antes do timer</Label>
              <DebouncedInputV2
                value={countdown.label || ''}
                onDebouncedChange={(v) => updateCountdown('label', v)}
                placeholder="Oferta termina em:"
                className="input-admin"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={countdown.showInPlans}
                  onCheckedChange={(v) => updateCountdown('showInPlans', v)}
                />
                <Label className="text-foreground text-sm">Mostrar nos Planos</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={countdown.showInCtaFinal}
                  onCheckedChange={(v) => updateCountdown('showInCtaFinal', v)}
                />
                <Label className="text-foreground text-sm">Mostrar no CTA Final</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Texto quando expirar (opcional)</Label>
              <DebouncedInputV2
                value={countdown.expiredText || ''}
                onDebouncedChange={(v) => updateCountdown('expiredText', v)}
                placeholder="Oferta encerrada"
                className="input-admin"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm flex items-center gap-2">
                <Palette className="h-3.5 w-3.5" />
                Cor de urgencia (opcional)
              </Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={countdown.urgencyColor || '#DC2626'}
                  onChange={(e) => updateCountdown('urgencyColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <DebouncedInputV2
                  value={countdown.urgencyColor || ''}
                  onDebouncedChange={(v) => updateCountdown('urgencyColor', v)}
                  placeholder="Vazio = cor accent do tema"
                  className="input-admin font-mono flex-1"
                />
                {countdown.urgencyColor && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateCountdown('urgencyColor', '')}
                    className="text-xs"
                  >
                    Limpar
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Deixe vazio para usar a cor accent do tema. Use vermelho (#DC2626) para urgencia.</p>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* Retencao — Exit Intent */}
      {/* ============================================================ */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            Retencao (Exit Intent)
          </Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={exitIntent.enabled}
              onCheckedChange={(v) => updateExit('enabled', v)}
            />
            <Label className="text-foreground text-sm font-semibold">
              {exitIntent.enabled ? 'Ligado' : 'Desligado'}
            </Label>
          </div>
        </div>

        {exitIntent.enabled && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-foreground text-sm">Titulo do Popup</Label>
              <DebouncedInputV2
                value={exitIntent.title}
                onDebouncedChange={(v) => updateExit('title', v)}
                placeholder="Espera! Antes de ir..."
                className="input-admin"
              />
              <p className="text-xs text-muted-foreground">
                Use **texto** para negrito e {'{{texto}}'} para destaque colorido.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Texto</Label>
              <DebouncedTextareaV2
                value={exitIntent.text}
                onDebouncedChange={(v) => updateExit('text', v)}
                placeholder="Garanta 15% de desconto na sua primeira limpeza"
                className="input-admin"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Use **texto** para negrito, {'{{texto}}'} para destaque e quebra de linha com Enter.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={exitIntent.titleUppercase !== false}
                onCheckedChange={(v) => updateExit('titleUppercase', v)}
              />
              <Label className="text-foreground text-sm">Titulo em MAIUSCULAS</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Texto do Botao CTA</Label>
                <DebouncedInputV2
                  value={exitIntent.ctaText}
                  onDebouncedChange={(v) => updateExit('ctaText', v)}
                  placeholder="Quero meu desconto"
                  className="input-admin"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Link do CTA</Label>
                <DebouncedInputV2
                  value={exitIntent.ctaLink}
                  onDebouncedChange={(v) => updateExit('ctaLink', v)}
                  placeholder="/checkout"
                  className="input-admin font-mono"
                />
                <p className="text-xs text-muted-foreground">O cupom da campanha sera adicionado automaticamente</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground text-sm">Texto de dispensa</Label>
              <DebouncedInputV2
                value={exitIntent.dismissText || ''}
                onDebouncedChange={(v) => updateExit('dismissText', v)}
                placeholder="Nao, obrigado"
                className="input-admin"
              />
              <p className="text-xs text-muted-foreground">Texto do link para fechar o popup sem converter</p>
            </div>

            {/* Imagem do Popup (opcional) */}
            <div className="bg-muted/10 rounded-xl p-4 space-y-3">
              <Label className="text-foreground text-sm font-semibold">
                Imagem do Popup (opcional)
              </Label>
              <div className="flex flex-wrap gap-6 justify-center">
                <ImageUploadV2
                  label="Imagem do Popup"
                  recommendedSize="800 × 600"
                  value={exitIntent.imageUrl || ''}
                  onChange={(url) => updateExit('imageUrl', url)}
                />
              </div>
              {exitIntent.imageUrl?.trim() && (
                <div className="space-y-2">
                  <Label className="text-foreground text-xs">Posicao da Imagem</Label>
                  <Select
                    value={exitIntent.imagePosition || 'top'}
                    onValueChange={(v) => updateExit('imagePosition', v)}
                  >
                    <SelectTrigger className="input-admin">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Topo (acima do texto)</SelectItem>
                      <SelectItem value="left">Lateral esquerda (desktop)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Frequencia</Label>
                <Select
                  value={exitIntent.frequency}
                  onValueChange={(v) => updateExit('frequency', v)}
                >
                  <SelectTrigger className="input-admin">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="session">1x por sessao</SelectItem>
                    <SelectItem value="day">1x por dia</SelectItem>
                    <SelectItem value="week">1x por semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Delay minimo (segundos)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[exitIntent.delaySeconds || 5]}
                    onValueChange={([v]) => updateExit('delaySeconds', v)}
                    min={0}
                    max={30}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-8 text-right">
                    {exitIntent.delaySeconds || 5}s
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">So mostra se o visitante ficou pelo menos X segundos</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* Prova Social — Toasts */}
      {/* ============================================================ */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Prova Social (Toasts)
          </Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={socialProof.enabled}
              onCheckedChange={(v) => updateSocial('enabled', v)}
            />
            <Label className="text-foreground text-sm font-semibold">
              {socialProof.enabled ? 'Ligado' : 'Desligado'}
            </Label>
          </div>
        </div>

        {socialProof.enabled && (
          <div className="space-y-4 pt-2">
            {/* Mensagens */}
            <div className="space-y-3">
              <Label className="text-foreground text-sm font-semibold">
                Mensagens ({socialProof.items.length})
              </Label>

              {socialProof.items.map((item, index) => (
                <div key={index} className="space-y-2 bg-muted/10 rounded-lg p-3">
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-end">
                    <div className="space-y-1">
                      {index === 0 && <Label className="text-foreground text-xs">Nome</Label>}
                      <DebouncedInputV2
                        value={item.name}
                        onDebouncedChange={(v) => updateSocialItem(index, 'name', v)}
                        placeholder="Maria"
                        className="input-admin text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && <Label className="text-foreground text-xs">Cidade</Label>}
                      <DebouncedInputV2
                        value={item.city}
                        onDebouncedChange={(v) => updateSocialItem(index, 'city', v)}
                        placeholder="Sao Paulo"
                        className="input-admin text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && <Label className="text-foreground text-xs">Plano</Label>}
                      <DebouncedInputV2
                        value={item.plan}
                        onDebouncedChange={(v) => updateSocialItem(index, 'plan', v)}
                        placeholder="Gold"
                        className="input-admin text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      {index === 0 && <Label className="text-foreground text-xs">Tempo</Label>}
                      <DebouncedInputV2
                        value={item.timeAgo}
                        onDebouncedChange={(v) => updateSocialItem(index, 'timeAgo', v)}
                        placeholder="3 min"
                        className="input-admin text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocialItem(index)}
                      className="h-9 w-9 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-foreground text-xs">Mensagem customizada (opcional)</Label>
                    <DebouncedInputV2
                      value={item.message || ''}
                      onDebouncedChange={(v) => updateSocialItem(index, 'message', v)}
                      placeholder="Substitui o template padrao. Ex: Maria acabou de contratar!"
                      className="input-admin text-sm"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSocialItem}
                className="gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Adicionar mensagem
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Intervalo (segundos)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[socialProof.intervalSeconds || 20]}
                    onValueChange={([v]) => updateSocial('intervalSeconds', v)}
                    min={10}
                    max={60}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-8 text-right">
                    {socialProof.intervalSeconds || 20}s
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Duracao do toast (segundos)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[socialProof.toastDuration || 4]}
                    onValueChange={([v]) => updateSocial('toastDuration', v)}
                    min={2}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-8 text-right">
                    {socialProof.toastDuration || 4}s
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Max por visita</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[socialProof.maxPerVisit || 5]}
                    onValueChange={([v]) => updateSocial('maxPerVisit', v)}
                    min={1}
                    max={15}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-foreground font-mono w-8 text-right">
                    {socialProof.maxPerVisit || 5}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground text-sm">Posicao</Label>
                <Select
                  value={socialProof.position || 'bottom-left'}
                  onValueChange={(v) => updateSocial('position', v)}
                >
                  <SelectTrigger className="input-admin">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-left">Inferior Esquerdo</SelectItem>
                    <SelectItem value="bottom-right">Inferior Direito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ConversionEditorV2.displayName = 'ConversionEditorV2';
