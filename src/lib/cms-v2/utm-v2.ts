import { LPContent } from './cms-types';

export const applyUTMv2 = (url: string, lpKey: string, content?: LPContent): string => {
  if (!url) return '';
  if (url.startsWith('#')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (!url.includes('limpme.com')) return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_lp=${lpKey}`;
};

export const applyCoupon = (url: string, coupon?: string): string => {
  if (!coupon || !url) return url;
  if (url.startsWith('#')) return url;
  if (url.includes('coupon=')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}coupon=${coupon}`;
};