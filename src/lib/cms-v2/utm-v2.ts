import { LPContent } from './cms-types';

/**
 * UTM V2 — Aplica parâmetros UTM em links de LP V2
 * Funciona com qualquer string de lp_key (não hardcoded para lp01/lp02/lp03)
 */
export const applyUTMv2 = (
  url: string,
  lpKey: string,
  content?: LPContent
): string => {
  if (!url) return '';

  // Não aplicar UTM em âncoras
  if (url.startsWith('#')) return url;

  // Não aplicar UTM em URLs externas (fora do domínio)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (!url.includes('limpme.com')) return url;
  }

  // Na V2, UTM é sempre aplicado (não depende de config global)
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_lp=${lpKey}`;
};

/**
 * applyCoupon — Centralizado. Adiciona coupon como query param.
 * Guard: NÃO aplica em âncoras (#plans) — evita quebrar navegação.
 * Idempotente: se já tem coupon=, não duplica.
 */
export const applyCoupon = (url: string, coupon?: string): string => {
  if (!coupon || !url) return url;
  if (url.startsWith('#')) return url;
  if (url.includes('coupon=')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}coupon=${coupon}`;
};
