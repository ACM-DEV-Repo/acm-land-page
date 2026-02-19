import { memo } from "react"; import { Label } from "@/components/ui/label"; import { Switch } from "@/components/ui/switch"; import { DebouncedInputV2 } from "@/components/admin/shared-v2/DebouncedInputV2"; import type { V2SectionEditorProps } from "./types";
export const TrackingEditorV2 = memo(({ draft, updateField }: V2SectionEditorProps) => {
  const s = draft.tracking;
  return (<div className="rounded-3xl p-10 space-y-6">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-foreground">Tracking / Pixels</h2><div className="flex items-center space-x-2"><Switch checked={s?.enabled!==false} onCheckedChange={c=>updateField('tracking','enabled',c)} /><Label>Ativar</Label></div></div>
    <div className="bg-muted/20 rounded-2xl p-6 space-y-4">
      <DebouncedInputV2 value={s?.meta||''} onDebouncedChange={v=>updateField('tracking','meta',v)} placeholder="Meta Pixel ID" />
      <DebouncedInputV2 value={s?.ga||''} onDebouncedChange={v=>updateField('tracking','ga',v)} placeholder="Google Analytics ID" />
      <DebouncedInputV2 value={s?.gtm||''} onDebouncedChange={v=>updateField('tracking','gtm',v)} placeholder="GTM ID" />
      <DebouncedInputV2 value={s?.tiktok||''} onDebouncedChange={v=>updateField('tracking','tiktok',v)} placeholder="TikTok Pixel ID" />
      <DebouncedInputV2 value={s?.linkedin||''} onDebouncedChange={v=>updateField('tracking','linkedin',v)} placeholder="LinkedIn Insight Tag" />
    </div>
  </div>);
}); TrackingEditorV2.displayName='TrackingEditorV2';
