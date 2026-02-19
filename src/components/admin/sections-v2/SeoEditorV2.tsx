import { memo } from "react"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import { DebouncedTextareaV2 } from "@/components/admin/shared-v2/DebouncedTextareaV2"; import { ImageUploadV2 } from "@/components/admin/shared-v2/ImageUploadV2"; import type { V2SectionEditorProps } from "./types";
export const SEOEditorV2 = memo(({ draft, lpKey, updateField }: V2SectionEditorProps) => {
  const s = draft.seo;
  return (<div className="rounded-3xl p-10 space-y-6">
    <h2 className="text-2xl font-bold text-foreground">SEO</h2>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.metaTitle||''} onDebouncedChange={v=>updateField('seo','metaTitle',v)} placeholder="Meta Title" />
      <DebouncedTextareaV2 value={s?.metaDescription||''} onDebouncedChange={v=>updateField('seo','metaDescription',v)} placeholder="Meta Description" />
      <DebouncedInputV2 value={s?.ogTitle||''} onDebouncedChange={v=>updateField('seo','ogTitle',v)} placeholder="OG Title" />
      <DebouncedTextareaV2 value={s?.ogDescription||''} onDebouncedChange={v=>updateField('seo','ogDescription',v)} placeholder="OG Description" />
      <ImageUploadV2 label="OG Image" value={s?.ogImage} onChange={u=>updateField('seo','ogImage',u)} lpKey={lpKey} />
    </div>
  </div>);
}); SEOEditorV2.displayName='SEOEditorV2';
