import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  highlight?: boolean;
}

export function FeatureCard({ icon, title, description, className, highlight = false }: FeatureCardProps) {
  return (
    <Card className={cn(
      "border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-zinc-900 hover:-translate-y-1",
      highlight && "border-primary/50 bg-zinc-900 shadow-xl shadow-primary/10",
      className
    )}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white",
          highlight ? "bg-primary shadow-lg shadow-primary/30" : "bg-zinc-800"
        )}>
          {icon}
        </div>
        <h3 className={cn("text-xl font-bold mb-2", highlight ? "text-primary" : "text-white")}>
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
