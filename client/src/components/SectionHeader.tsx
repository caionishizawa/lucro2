import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ badge, title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-12", align === "center" && "text-center", className)}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
