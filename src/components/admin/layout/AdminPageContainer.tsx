import { cn } from "@/lib/utils";

type PageType = "table" | "dashboard" | "form" | "detail" | "editor";

interface AdminPageContainerProps {
  children: React.ReactNode;
  type?: PageType;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  className?: string;
}

const typeToMaxWidth: Record<PageType, string> = { table: "7xl", dashboard: "7xl", form: "4xl", detail: "6xl", editor: "full" };
const maxWidthClasses: Record<string, string> = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl", "2xl": "max-w-2xl", "4xl": "max-w-4xl", "5xl": "max-w-5xl", "6xl": "max-w-6xl", "7xl": "max-w-7xl", full: "max-w-full" };

export function AdminPageContainer({ children, type, maxWidth, className }: AdminPageContainerProps) {
  const resolvedMaxWidth = maxWidth || (type ? typeToMaxWidth[type] : "7xl");
  return (
    <div className={cn("p-4 md:p-8 w-full", maxWidthClasses[resolvedMaxWidth], "mx-auto", className)}>
      {children}
    </div>
  );
}
