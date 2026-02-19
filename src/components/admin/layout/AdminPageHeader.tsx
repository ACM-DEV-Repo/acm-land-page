import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: "accent" | "primary" | "muted";
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  backButton?: React.ReactNode;
}

const iconColorMap = { accent: "text-accent bg-accent/10", primary: "text-primary bg-primary/10", muted: "text-muted-foreground bg-muted" };

export function AdminPageHeader({ title, description, icon: Icon, iconColor = "accent", badge, actions, className, backButton }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {backButton}
        {Icon && <div className={cn("p-3 rounded-xl", iconColorMap[iconColor])}><Icon className="h-6 w-6" /></div>}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
