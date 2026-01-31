import { Card, CardContent } from "@/components/ui/card";

interface ModuleCardProps {
  number: number;
  title: string;
  description: string;
  image: string;
}

export function ModuleCard({ number, title, description, image }: ModuleCardProps) {
  return (
    <div className="p-1 h-full">
      <Card className="h-full border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-secondary/50 transition-all group relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <CardContent className="p-6 flex flex-col h-full relative z-10 justify-end min-h-[320px]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-secondary font-bold text-sm">
              {number}
            </span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Módulo</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-secondary transition-colors uppercase italic tracking-tight leading-none">
            {title}
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed font-medium">
            {description}
          </p>
          
          <div className="mt-4 h-1 w-0 group-hover:w-full bg-secondary transition-all duration-500 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}
