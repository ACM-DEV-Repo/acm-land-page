import { TrackingSettings } from "./cms-types";

// ============================================================
// Resolve herança de tracking: local vs global
// ============================================================

/**
 * Resolve os pixels efetivos de uma LP.
 *
 * Regras:
 * 1. Se tracking local desabilitado → nenhum pixel injetado
 * 2. Se useGlobal === false → usa APENAS pixels locais
 * 3. Se useGlobal === true (default) → campo local preenchido tem prioridade;
 *    campo local vazio herda do global
 */
export function resolveTrackingV2(
  local: TrackingSettings | undefined,
  global: TrackingSettings | null
): TrackingSettings {
  // Sem tracking local → desabilitado
  if (!local || local.enabled === false) {
    return {
      enabled: false,
      meta: '',
      ga: '',
      gtm: '',
      tiktok: '',
      linkedin: '',
    };
  }

  // useGlobal desligado ou global inexistente → só local
  if (local.useGlobal === false || !global) {
    return {
      enabled: true,
      meta: local.meta?.trim() || '',
      ga: local.ga?.trim() || '',
      gtm: local.gtm?.trim() || '',
      tiktok: local.tiktok?.trim() || '',
      linkedin: local.linkedin?.trim() || '',
    };
  }

  // Merge: local tem prioridade, vazio herda global
  return {
    enabled: true,
    meta: local.meta?.trim() || global.meta?.trim() || '',
    ga: local.ga?.trim() || global.ga?.trim() || '',
    gtm: local.gtm?.trim() || global.gtm?.trim() || '',
    tiktok: local.tiktok?.trim() || global.tiktok?.trim() || '',
    linkedin: local.linkedin?.trim() || global.linkedin?.trim() || '',
  };
}
