import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2";
import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2";
import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2";
import { SectionCTAEditorV2 } from "@/components/admin/shared-v2/SectionCTAEditorV2";
import type { V2SectionEditorProps } from "./types";

export const HeroEditorV2 = memo(({ draft, updateField, updateNestedField, updateSection }: V2SectionEditorProps) => {
  const hero = draft.hero;
  return (
    <div className="rounded-3xl p-10 space-y-6">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Hero</h2><div className="flex items-center space-x-2"><Switch checked={hero?.enabled !== false} onCheckedChange={(c) => updateField('hero', 'enabled', c)} /><Label className="text-foreground text-sm font-semibold">Ativar</Label></div></div>
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><Label className="text-foreground font-semibold text-lg">Textos</Label><div><Label className="text-foreground font-semibold mb-2 block">Título</Label><DebouncedInputV2 value={hero?.title||''} onDebouncedChange={(v)=>updateField('hero','title',v)} placeholder="Título principal" /></div><div><Label className="text-foreground font-semibold mb-2 block">Subtítulo</Label><DebouncedTextareaV2 value={hero?.subtitle||''} onDebouncedChange={(v)=>updateField('hero','subtitle',v)} placeholder="Subtítulo" /></div></div>
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><Label className="text-foreground font-semibold text-lg">Imagens</Label><div className="flex flex-wrap gap-6 justify-center"><ImageUploadV2 label="Desktop" value={hero?.imageDesktop} onChange={(u)=>updateField('hero','imageDesktop',u)} /><ImageUploadV2 label="Mobile" value={hero?.imageMobile} onChange={(u)=>updateField('hero','imageMobile',u)} /></div></div>
      <div className="bg-muted/20 rounded-2xl p-6 space-y-4"><Label className="text-foreground font-semibold text-lg">CTAs</Label><div className="grid md:grid-cols-2 gap-4"><div><Label className="text-foreground font-semibold mb-2 block">CTA Primário - Texto</Label><DebouncedInputV2 value={hero?.ctaPrimary?.text||''} onDebouncedChange={(v)=>updateNestedField('hero.ctaPrimary.text',v)} /></div><div><Label className="text-foreground font-semibold mb-2 block">CTA Primário - Link</Label><DebouncedInputV2 value={hero?.ctaPrimary?.link||''} onDebouncedChange={(v)=>updateNestedField('hero.ctaPrimary.link',v)} /></div></div><div className="grid md:grid-cols-2 gap-4"><div><Label className="text-foreground font-semibold mb-2 block">CTA Secundário - Texto</Label><DebouncedInputV2 value={hero?.ctaSecondary?.text||''} onDebouncedChange={(v)=>updateNestedField('hero.ctaSecondary.text',v)} /></div><div><Label className="text-foreground font-semibold mb-2 block">CTA Secundário - Link</Label><DebouncedInputV2 value={hero?.ctaSecondary?.link||''} onDebouncedChange={(v)=>updateNestedField('hero.ctaSecondary.link',v)} /></div></div></div>
      <SectionCTAEditorV2 sectionTitle="Hero" ctaData={hero?.footerCta} onUpdate={(u)=>{updateSection('hero',{...hero,footerCta:{...(hero?.footerCta||{enabled:false,text:'',link:'',mobileHidden:false}),...u}});}} />
    </div>
  );
});
HeroEditorV2.displayName = 'HeroEditorV2';
