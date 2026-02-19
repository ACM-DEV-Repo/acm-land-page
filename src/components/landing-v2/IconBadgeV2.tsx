import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// IconBadgeV2 - Componente de icone reutilizavel para secoes LP V2
// ============================================================
// Usa design tokens V2 (--ds-color-icon) para funcionar nos 8 temas
// Padrao: circulo com bg 15% opacity + border 30% opacity
// ============================================================

type IconBadgeSize = 'sm' | 'md' | 'lg';

interface IconBadgeV2Props {
  icon: LucideIcon;
  size?: IconBadgeSize;
  /** Override de cor (ex: cores metalicas por tier) */
  color?: string;
  className?: string;
}

const sizeMap: Record<IconBadgeSize, { container: string; icon: number }> = {
  sm: { container: 'w-10 h-10', icon: 18 },
  md: { container: 'w-12 h-12', icon: 22 },
  lg: { container: 'w-14 h-14 md:w-16 md:h-16', icon: 28 },
};

export const IconBadgeV2 = ({ icon: Icon, size = 'md', color, className }: IconBadgeV2Props) => {
  const { container, icon: iconSize } = sizeMap[size];

  // Se tem cor customizada, usa ela; senao usa --ds-color-icon via design tokens
  const style = color
    ? {
        backgroundColor: `${color}22`, // 13% opacity
        borderColor: `${color}4D`,     // 30% opacity
        color: color,
      }
    : undefined;

  return (
    <div
      className={cn(
        container,
        'rounded-full flex items-center justify-center border-2 flex-shrink-0',
        // Design token classes V2 (usadas quando nao tem cor custom)
        !color && 'bg-[hsl(var(--ds-color-icon)/0.15)] border-[hsl(var(--ds-color-icon)/0.3)]',
        className
      )}
      style={style}
    >
      <Icon
        size={iconSize}
        className={cn(!color && 'text-[hsl(var(--ds-color-icon))]')}
        style={color ? { color } : undefined}
      />
    </div>
  );
};
