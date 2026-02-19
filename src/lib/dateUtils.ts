export const BRAZIL_TIMEZONE = 'America/Sao_Paulo';
export function nowBrazil(): Date { return new Date(new Date().toLocaleString('en-US', { timeZone: BRAZIL_TIMEZONE })); }
export function createBrazilTimestamp(): string { return nowBrazil().toISOString(); }
export function formatBrazilDate(date: Date | string | null = new Date()): string { if (!date) return '-'; try { const d = typeof date === 'string' ? new Date(date) : date; if (isNaN(d.getTime())) return typeof date === 'string' ? date : '-'; return d.toLocaleDateString('pt-BR', { timeZone: BRAZIL_TIMEZONE }); } catch { return typeof date === 'string' ? date : '-'; } }
export function formatBrazilTime(date: Date = new Date()): string { return date.toLocaleTimeString('pt-BR', { timeZone: BRAZIL_TIMEZONE, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
export function formatBrazilDateTime(date: Date = new Date()): string { return `${formatBrazilDate(date)} ${formatBrazilTime(date)}`; }
export function toBrazilTimezone(date: Date): Date { return new Date(date.toLocaleString('en-US', { timeZone: BRAZIL_TIMEZONE })); }
export function getBrazilDateISO(date: Date = new Date()): string { const b = toBrazilTimezone(date); return `${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,'0')}-${String(b.getDate()).padStart(2,'0')}`; }
export function formatBrazilDateShort(date: Date): string { return date.toLocaleDateString('pt-BR', { timeZone: BRAZIL_TIMEZONE, day: '2-digit', month: '2-digit', year: '2-digit' }); }
export function formatBrazilDateTimeShort(date: Date): string { return `${formatBrazilDateShort(date)} ${date.toLocaleTimeString('pt-BR', { timeZone: BRAZIL_TIMEZONE, hour: '2-digit', minute: '2-digit', hour12: false })}`; }