// ============================================================
// Design Utils — Funcoes puras de conversao de cor e aplicacao de tokens
// Extraidas do CMSProvider para reutilizacao e testabilidade
// ============================================================

/** Converte hex (#RRGGBB ou #RGB) para HSL string "H S% L%" */
export function hexToHSL(hex: string): string | null {
  if (!hex || !hex.startsWith('#')) return null;
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** Ajusta lightness de uma string HSL "H S% L%" por um delta */
export function adjustHSL(hsl: string, deltaL: number): string {
  const parts = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!parts) return hsl;
  const newL = Math.min(100, Math.max(0, parseInt(parts[3], 10) + deltaL));
  return `${parts[1]} ${parts[2]}% ${newL}%`;
}

/** Seta uma CSS variable com valor HSL convertido de hex */
export function setHSLVar(root: HTMLElement, varName: string, hex: string): string | null {
  const hsl = hexToHSL(hex);
  if (hsl) root.style.setProperty(varName, hsl);
  return hsl;
}

/** Fontes seguras permitidas pelo CMS */
export const SAFE_FONTS = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Open Sans', 'Nunito', 'Raleway'] as const;

/** Resolve font name da whitelist */
export function resolveSafeFont(fontFamily: string): string {
  return SAFE_FONTS.find(f => fontFamily.includes(f)) || 'Inter';
}
