import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLead } from "@/hooks/use-leads";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ctaText?: string;
}

export function LeadFormDialog({ open, onOpenChange, ctaText = "GARANTIR MINHA VAGA" }: LeadFormDialogProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateLead();
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    mutate(
      { email: phone, name },
      {
        onSuccess: () => {
          toast({
            title: "Sucesso!",
            description: "Redirecionando para o checkout...",
          });
          setTimeout(() => {
            window.location.href = "https://pay.cakto.com.br/34oy7v2_750448";
            onOpenChange(false);
          }, 500);
        },
        onError: () => {
          // Redirect anyway even if lead save fails
          window.location.href = "https://pay.cakto.com.br/34oy7v2_750448";
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-primary">
            Quase lá!
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Preencha seus dados para acessar o checkout seguro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input
              id="name"
              required
              placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Seu WhatsApp</Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="bg-zinc-800 border-zinc-700 focus:border-primary focus:ring-primary/20"
              maxLength={15}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg shadow-lg shadow-primary/20"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-center text-zinc-500 mt-2">
            Ambiente 100% seguro. Seus dados estão protegidos.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
