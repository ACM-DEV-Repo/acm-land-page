import { TrackingSettings } from "./cms-types";

export function resolveTrackingV2(
  local: TrackingSettings | undefined,
  global: TrackingSettings | null
): TrackingSettings {
  if (!local || local.enabled === false) {
    return { enabled: false, meta: '', ga: '', gtm: '', tiktok: '', linkedin: '' };
  }

  if (local.useGlobal === false || !global) {
    return { enabled: true, meta: local.meta?.trim() || '', ga: local.ga?.trim() || '', gtm: local.gtm?.trim() || '', tiktok: local.tiktok?.trim() || '', linkedin: local.linkedin?.trim() || '' };
  }

  return {
    enabled: true,
    meta: local.meta?.trim() || global.meta?.trim() || '',
    ga: local.ga?.trim() || global.ga?.trim() || '',
    gtm: local.gtm?.trim() || global.gtm?.trim() || '',
    tiktok: local.tiktok?.trim() || global.tiktok?.trim() || '',
    linkedin: local.linkedin?.trim() || global.linkedin?.trim() || '',
  };
}