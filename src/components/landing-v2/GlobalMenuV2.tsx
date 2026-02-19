import { memo } from 'react';
import type { GlobalMenuSettings, FooterSection } from '@/lib/cms-v2/cms-types';

interface GlobalMenuV2Props { data?: GlobalMenuSettings; footer?: FooterSection }

export const GlobalMenuV2 = memo(({ data, footer }: GlobalMenuV2Props) => {
  if (!data?.enabled) return null;
  const logoSrc = data.logoUrl?.trim() || footer?.logo?.trim() || footer?.logoDesktop?.trim() || '';
  const links = data.links || [];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--ds-color-bg))]/6 backdrop-blur-[18px] border-b border-[hsl(var(--ds-border-color))]/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {logoSrc && <a href="#" className="flex items-center shrink-0"><img src={logoSrc} alt="Logo" className="h-10 w-auto object-contain transition-transform hover:scale-105" /></a>}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link, i) => <a key={i} href={link.url} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">{link.text}</a>)}
          </nav>
        )}
      </div>
    </header>
  );
});
GlobalMenuV2.displayName = 'GlobalMenuV2';