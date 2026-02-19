import { cn } from "@/lib/utils";

/**
 * AdminPageContainer - Wrapper padrão para TODAS as páginas admin
 * 
 * REGRA: Nenhuma página admin deve aplicar marginLeft/width calc.
 * O offset do sidebar é controlado EXCLUSIVAMENTE pelo AdminLayout.
 * 
 * Este componente fornece:
 * - Padding responsivo (p-4 md:p-8)
 * - Max-width baseado no tipo de página
 * - Espaçamento interno padronizado
 * 
 * TIPOS DE PÁGINA:
 * - table: Tabelas com muitas colunas (7xl)
 * - dashboard: Cards, gráficos, métricas (7xl)
 * - form: Formulários, perfis, configurações (4xl)
 * - detail: Páginas de detalhe de registro (6xl)
 * - editor: Editores CMS, painéis complexos (full)
 */

/** Tipo de página - determina automaticamente o maxWidth */
type PageType = "table" | "dashboard" | "form" | "detail" | "editor";

interface AdminPageContainerProps {
  children: React.ReactNode;
  /** Tipo de página - define maxWidth automaticamente */
  type?: PageType;
  /** Override manual de maxWidth (usar apenas se necessário) */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  /** Additional classes */
  className?: string;
}

const typeToMaxWidth: Record<PageType, string> = {
  table: "7xl",
  dashboard: "7xl",
  form: "4xl",
  detail: "6xl",
  editor: "full",
};

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export function AdminPageContainer({
  children,
  type,
  maxWidth,
  className,
}: AdminPageContainerProps) {
  // Prioridade: maxWidth explícito > type > default (7xl)
  const resolvedMaxWidth = maxWidth || (type ? typeToMaxWidth[type] : "7xl");
  
  return (
    <div
      className={cn(
        "p-4 md:p-8 w-full",
        maxWidthClasses[resolvedMaxWidth],
        "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
