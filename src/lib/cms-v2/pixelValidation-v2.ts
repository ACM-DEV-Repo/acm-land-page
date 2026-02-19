export type PixelPlatform = 'meta' | 'ga' | 'gtm' | 'tiktok' | 'linkedin';
export type PixelStatus = 'valid' | 'warning' | 'error' | 'empty';

interface PixelRule { regex: RegExp; label: string; example: string; }

const PIXEL_RULES: Record<PixelPlatform, PixelRule> = {
  meta: { regex: /^\d{15,16}$/, label: 'Meta Pixel', example: '966889988243951' },
  ga: { regex: /^G-[A-Z0-9]{8,12}$/i, label: 'Google Analytics', example: 'G-XXXXXXXXXX' },
  gtm: { regex: /^GTM-[A-Z0-9]{6,8}$/i, label: 'Google Tag Manager', example: 'GTM-XXXXXXX' },
  tiktok: { regex: /^[A-Z0-9]{10,25}$/i, label: 'TikTok Pixel', example: 'CXXXXXXXXXXXXXXXXX' },
  linkedin: { regex: /^\d{5,10}$/, label: 'LinkedIn Insight', example: '1234567' },
};

export interface PixelValidationResult { status: PixelStatus; message: string; }

export function validatePixelId(platform: PixelPlatform, value: string): PixelValidationResult {
  if (!value || !value.trim()) return { status: 'empty', message: 'Não configurado' };
  if (value !== value.trim()) return { status: 'warning', message: 'Contém espaços — remova manualmente' };
  const rule = PIXEL_RULES[platform];
  if (rule.regex.test(value)) return { status: 'valid', message: '✓ Formato válido' };
  return { status: 'error', message: `Formato inválido. Ex: ${rule.example}` };
}

export function getPixelExample(platform: PixelPlatform): string { return PIXEL_RULES[platform].example; }
export function getPixelLabel(platform: PixelPlatform): string { return PIXEL_RULES[platform].label; }

export function getStatusColor(status: PixelStatus): string {
  switch (status) {
    case 'valid': return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'warning': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'empty': return 'text-muted-foreground bg-muted/30 border-border/20';
  }
}

export function getStatusDotColor(status: PixelStatus): string {
  switch (status) {
    case 'valid': return 'bg-green-500';
    case 'warning': return 'bg-amber-500';
    case 'error': return 'bg-red-500';
    case 'empty': return 'bg-white/30';
  }
}

export const PIXEL_PLATFORMS: { key: PixelPlatform; label: string; placeholder: string }[] = [
  { key: 'meta', label: 'Meta Pixel (Facebook/Instagram)', placeholder: 'Ex: 966889988243951' },
  { key: 'ga', label: 'Google Analytics (GA4)', placeholder: 'Ex: G-XXXXXXXXXX' },
  { key: 'gtm', label: 'Google Tag Manager', placeholder: 'Ex: GTM-XXXXXXX' },
  { key: 'tiktok', label: 'TikTok Pixel', placeholder: 'Ex: CXXXXXXXXXXXXXXXXX' },
  { key: 'linkedin', label: 'LinkedIn Insight', placeholder: 'Ex: 1234567' },
];