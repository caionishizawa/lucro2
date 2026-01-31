import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">404 - Página não encontrada</h1>
          </div>
          <p className="mt-4 text-zinc-400 text-sm">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <a href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-6 w-full">
            Voltar para o início
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
