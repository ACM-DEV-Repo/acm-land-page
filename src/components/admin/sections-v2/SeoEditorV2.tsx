import { memo } from "react";
import { Label } from "@/components/ui/label";
import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2";
import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2";
import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2";
import { V2SectionEditorProps } from "./types";

export const SEOEditorV2 = memo(({ draft, updateField }: V2SectionEditorProps) => {
  const seo = draft.seo;
  const metaTitleLen = seo?.metaTitle?.length || 0;
  const metaDescLen = seo?.metaDescription?.length || 0;

  return (
    <div className="glass-primitive rounded-3xl p-10 space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">SEO</h2>

      {/* Preview Google */}
      <div className="bg-muted/30 rounded-2xl p-6 space-y-1 border border-border/50">
        <p className="text-xs text-muted-foreground mb-2">Prévia do Google:</p>
        <p className="text-[#1a0dab] text-lg font-medium line-clamp-1">
          {seo?.metaTitle || 'Título da página aparecerá aqui'}
        </p>
        <p className="text-sm text-[#006621] line-clamp-1">
          https://seusite.com/pagina
        </p>
        <p className="text-sm text-[#545454] line-clamp-2">
          {seo?.metaDescription || 'A descrição da página aparecerá aqui. Escreva algo atraente para aumentar a taxa de cliques.'}
        </p>
      </div>

      {/* Meta Tags */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <Label className="text-foreground font-semibold text-lg">Meta Tags</Label>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Meta Title</Label>
            <span className={`text-xs ${metaTitleLen > 60 ? 'text-destructive' : metaTitleLen > 54 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
              {metaTitleLen}/60
            </span>
          </div>
          <DebouncedInputV2
            value={seo?.metaTitle || ''}
            onDebouncedChange={(v) => updateField('seo', 'metaTitle', v)}
            placeholder="Ex: LimpMe - Lavagem de Carros a Domicílio"
            className="input-admin"
          />
          {metaTitleLen > 60 && (
            <p className="text-xs text-destructive">Limite excedido! O texto será cortado nos buscadores.</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Meta Description</Label>
            <span className={`text-xs ${metaDescLen > 160 ? 'text-destructive' : metaDescLen > 144 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
              {metaDescLen}/160
            </span>
          </div>
          <DebouncedTextareaV2
            value={seo?.metaDescription || ''}
            onDebouncedChange={(v) => updateField('seo', 'metaDescription', v)}
            placeholder="Ex: Serviço de lavagem ecológica para seu veículo..."
            className="input-admin"
            rows={3}
          />
          {metaDescLen > 160 && (
            <p className="text-xs text-destructive">Limite excedido! O texto será cortado nos buscadores.</p>
          )}
        </div>
      </div>

      {/* Open Graph */}
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
        <Label className="text-foreground font-semibold text-lg">Open Graph (Redes Sociais)</Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground">OG Title</Label>
            <DebouncedInputV2
              value={seo?.ogTitle || ''}
              onDebouncedChange={(v) => updateField('seo', 'ogTitle', v)}
              placeholder="Título para compartilhamento"
              className="input-admin"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">OG Description</Label>
            <DebouncedInputV2
              value={seo?.ogDescription || ''}
              onDebouncedChange={(v) => updateField('seo', 'ogDescription', v)}
              placeholder="Descrição para compartilhamento"
              className="input-admin"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">OG Image (Imagem de compartilhamento)</Label>
          <ImageUploadV2
            value={seo?.ogImage || ''}
            onChange={(url) => updateField('seo', 'ogImage', url)}
            label="OG Image"
          />
          <p className="text-xs text-muted-foreground">Tamanho recomendado: 1200x630 pixels</p>
        </div>
      </div>
    </div>
  );
});

SEOEditorV2.displayName = 'SEOEditorV2';
