import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertLead } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Falha ao registrar");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // In a real app, we might redirect to a thank you page or checkout
      // For this sales page, we'll just track it
      console.log("Lead captured successfully");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
