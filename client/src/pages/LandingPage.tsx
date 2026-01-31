import { useState } from "react";
import {
  Check, ArrowRight, Shield, Users, Smartphone, DollarSign,
  Menu, X, Star, Clock, Zap, Target, Globe, Instagram, Layout, MapPin, Package, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from "@/components/ui/carousel";
import { LeadFormDialog } from "@/components/LeadFormDialog";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { ModuleCard } from "@/components/ModuleCard";
import { BrazilMap } from "@/components/BrazilMap";
import { motion } from "framer-motion";

// --- Data Constants ---

const modules = [
  {
    title: "Começando do Zero",
    description: "Aprenda as 3 formas comprovadas de começar sem investir nenhum centavo do seu bolso.",
    image: "/images/module1.png"
  },
  {
    title: "Avaliação de Celulares",
    description: "Checklist completo de 30 pontos vitais para nunca ser enganado na hora da compra.",
    image: "/images/module2.png"
  },
  {
    title: "Negociação Profissional",
    description: "Scripts de conversa prontos (copie e cole) para comprar barato e garantir sua margem.",
    image: "/images/module3.png"
  },
  {
    title: "Canais de Venda",
    description: "Onde anunciar para vender rápido: OLX, Mercado Livre, Instagram e mais.",
    image: "/images/module4.png"
  },
  {
    title: "Lucro Máximo",
    description: "Estratégias avançadas para extrair o maior lucro possível em cada aparelho.",
    image: "/images/module5.png"
  }
];

const faqs = [
  {
    question: "Preciso ter dinheiro para começar?",
    answer: "Absolutamente não. Ensinamos 3 estratégias específicas (Intermediação, Consignação e Venda Antecipada) para você começar com R$ 0 e fazer caixa rápido."
  },
  {
    question: "Funciona se eu não conhecer ninguém?",
    answer: "Sim! A comunidade serve justamente para isso. Você terá acesso a um ecossistema de pessoas negociando todos os dias, criando seu networking do zero."
  },
  {
    question: "Quanto tempo demora para ter resultados?",
    answer: "A maioria dos alunos aplica o método e realiza a primeira venda entre 4 a 7 dias seguindo o passo a passo."
  },
  {
    question: "O acesso é vitalício?",
    answer: "Você terá acesso ao método e à comunidade por 1 ano completo, com direito a todas as atualizações."
  }
];

export default function LandingPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-primary/30">
      <LeadFormDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />

      {/* --- Nav --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-white tracking-tight">Lucro<span className="text-primary">Celular</span></span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#metodo" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">O Método</a>
              <a href="#modulos" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Módulos</a>
              <a href="#garantia" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Garantia</a>
              <Button 
                onClick={toggleCheckout}
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              >
                ENTRAR AGORA
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-300 hover:text-white">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-4">
            <a href="#metodo" className="block text-zinc-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>O Método</a>
            <a href="#modulos" className="block text-zinc-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Módulos</a>
            <a href="#garantia" className="block text-zinc-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Garantia</a>
            <Button onClick={toggleCheckout} className="w-full bg-primary font-bold">ENTRAR AGORA</Button>
          </div>
        )}
      </nav>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-background to-background -z-10" />
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs md:text-sm mb-8 animate-pulse"
            >
              <Zap className="w-4 h-4" />
              ECOSSISTEMA COMPLETO + GRUPO VIP + ACOMPANHAMENTO
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-5xl mx-auto"
            >
              Ganhe R$ 300 a <span className="text-secondary text-glow-gold">R$ 500 por Celular</span> Sem Investir Nada
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              O único ecossistema que une método, comunidade, networking e suporte. 
              Você entra sem dinheiro, sem contatos e <span className="text-white font-semibold">não fica sozinho</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 text-sm md:text-base text-zinc-300"
            >
              <div className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Comece com R$ 0</div>
              <div className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Grupo VIP no WhatsApp</div>
              <div className="flex items-center gap-2"><Check className="text-primary w-5 h-5" /> Acompanhamento Real</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                onClick={toggleCheckout}
                size="lg" 
                className="w-full sm:w-auto px-8 py-8 text-lg md:text-xl font-bold rounded-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)]"
              >
                QUERO ENTRAR NO ECOSSISTEMA
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>

            <div className="mt-8 flex items-center justify-center gap-2 text-zinc-500 text-sm">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-xs font-bold text-white">
                    <Users className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <p>+500 membros ativos faturando agora</p>
            </div>
          </div>
        </section>

        {/* --- Modules Carousel Section --- */}
        <section id="modulos" className="py-20 bg-zinc-950/50 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              badge="O MÉTODO"
              title="Confira o Que Te Espera"
              subtitle="5 módulos completos desenhados para te tirar do zero e colocar lucro no seu bolso na primeira semana."
            />
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {modules.map((mod, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-auto">
                    <div className="h-full">
                      <ModuleCard 
                        number={index + 1}
                        title={mod.title}
                        description={mod.description}
                        image={mod.image}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-8 pr-4">
                <CarouselPrevious className="static translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white" />
                <CarouselNext className="static translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* --- Objection Busting 1: No Money --- */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  "Preciso de Dinheiro?" <br />
                  <span className="text-destructive">ERRADO.</span>
                </h2>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                  A maior mentira que te contaram é que você precisa de capital para começar. 
                  Nós ensinamos estratégias onde o dinheiro do cliente financia o seu lucro.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Intermediação", desc: "Conecte quem vende com quem compra e fique com a diferença." },
                    { title: "Consignação", desc: "Pegue aparelhos para vender sem pagar nada adiantado." },
                    { title: "Venda Antecipada", desc: "Venda primeiro, entregue depois. Risco zero." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      <div className="bg-primary/20 p-2 rounded-lg h-fit">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                        <p className="text-sm text-zinc-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl opacity-30" />
                {/* Visual representation of money growth or phone flip - abstract UI */}
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                      <span className="text-zinc-500 font-mono">Saldo Inicial</span>
                      <span className="text-white font-mono font-bold">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                      <span className="text-zinc-500 font-mono">Venda #1 (Intermediação)</span>
                      <span className="text-primary font-mono font-bold">+ R$ 450,00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                      <span className="text-zinc-500 font-mono">Venda #2 (Consignação)</span>
                      <span className="text-primary font-mono font-bold">+ R$ 380,00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white font-bold text-lg">Lucro Total</span>
                      <span className="text-secondary font-bold text-2xl">R$ 830,00</span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <p className="text-primary font-bold">Resultado de 1 semana aplicando o método</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Objection Busting 2: No Connections --- */}
        <section className="py-24 bg-zinc-900/30 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Não Conhece Ninguém?" 
              subtitle="A comunidade te conecta instantaneamente."
              badge="NETWORKING AUTOMÁTICO"
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Globe />}
                title="Oportunidades Diárias"
                description="Membros postam oportunidades de compra e venda todos os dias no grupo VIP."
              />
              <FeatureCard
                icon={<Instagram />}
                title="Templates Profissionais"
                description="Site pronto, artes para Instagram e Stories que convertem. Pare de postar feito amador e venda 3x mais rápido."
                highlight
              />
              <FeatureCard
                icon={<Users />}
                title="Parcerias Lucrativas"
                description="Encontre sócios na sua cidade ou em outros estados para expandir sua operação."
              />
            </div>
          </div>
        </section>

        {/* --- Suppliers Map Section (NEW) --- */}
        <section className="py-24 bg-zinc-900/30 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="ACESSO EXCLUSIVO"
              title="Mapa de Fornecedores Nacionais com Repasse Garantido"
              subtitle="Enquanto você perde tempo procurando, os membros já fecharam negócio com os melhores preços."
            />

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<MapPin />}
                title="Todas as Regiões do Brasil"
                description="Fornecedores validados no Nordeste, Sul, Sudeste, Norte e Centro-Oeste. Repasse direto sem intermediários."
              />
              <FeatureCard
                icon={<TrendingUp />}
                title="Produtos de Alta Rotação"
                description="iPhone, Samsung Galaxy, Xiaomi e mais. Itens que vendem em 24-48h com margem garantida."
                highlight
              />
              <FeatureCard
                icon={<Package />}
                title="Repasse Validado pela Comunidade"
                description="Fornecedores testados por +500 membros. Preços negociados em grupo, você nunca compra sozinho."
              />
            </div>

            <div className="mt-12">
              <div className="mb-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  <span className="text-destructive">PARE</span> de Comprar no Escuro
                </h3>
                <p className="text-zinc-300 leading-relaxed text-lg max-w-3xl mx-auto mb-6">
                  Enquanto você procura fornecedor sozinho e perde oportunidades,
                  os membros já têm acesso a uma rede validada com repasses fixos e produtos de giro rápido.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-white font-medium">Suporte profissional dedicado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-white font-medium">Preços de atacado negociados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-white font-medium">Reposição garantida</span>
                  </div>
                </div>
              </div>

              {/* Interactive Brazil Map with Particles */}
              <BrazilMap sedeX={295} sedeY={350} sedeLabel="Hub Central" />
            </div>
          </div>
        </section>

        {/* --- Timeline Support --- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Você Não Vai Ficar Sozinho" subtitle="Acompanhamento real passo a passo." />
            
            <div className="relative max-w-4xl mx-auto">
              {/* Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-zinc-800 hidden md:block" />
              
              <div className="space-y-12">
                {[
                  { day: "Dia 1", title: "Acesso Imediato", desc: "Você entra no grupo e acessa as aulas fundamentais." },
                  { day: "Dias 2-3", title: "Networking & Ofertas", desc: "Você vê as primeiras oportunidades e aprende a avaliar." },
                  { day: "Dias 4-7", title: "Primeira Venda", desc: "Você aplica o script de negociação e coloca lucro no bolso." },
                ].map((item, i) => (
                  <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-1/2 p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-primary/30 transition-colors">
                      <div className="text-primary font-bold mb-2 uppercase tracking-wider text-sm">{item.day}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-zinc-400">{item.desc}</p>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] hidden md:block" />
                    
                    <div className="w-full md:w-1/2" /> 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Value Stack & Pricing --- */}
        <section className="py-24 bg-gradient-to-b from-zinc-900 to-black border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Highlight Banner */}
              <div className="bg-secondary text-black font-bold text-center py-2 text-sm uppercase tracking-widest">
                Oferta por tempo limitado
              </div>

              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                  Tudo o que você recebe hoje:
                </h2>

                <div className="space-y-4 mb-10">
                  {[
                    { item: "Método Lucro com Celulares Completo", price: "R$ 497" },
                    { item: "Acesso ao Grupo VIP de Networking", price: "R$ 297" },
                    { item: "Scripts de Negociação Prontos", price: "R$ 97" },
                    { item: "Mapa de Fornecedores em Todo Brasil", price: "R$ 397" },
                    { item: "Templates Profissionais (Site + Instagram)", price: "R$ 197" },
                    { item: "Produtos de Alta Rotação Revelados", price: "R$ 147" },
                    { item: "Suporte e Acompanhamento", price: "Inestimável" },
                  ].map((line, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-3">
                        <Check className="text-primary w-5 h-5 flex-shrink-0" />
                        <span className="text-zinc-300 font-medium">{line.item}</span>
                      </div>
                      <span className="text-zinc-500 text-sm line-through decoration-zinc-500/50">{line.price}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-2 mb-8">
                  <p className="text-zinc-500 text-lg">Valor total: <span className="line-through">R$ 1.632,00</span></p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-zinc-400 text-xl">Hoje por apenas:</span>
                    <span className="text-5xl md:text-6xl font-extrabold text-white">R$ 47</span>
                  </div>
                  <p className="text-primary font-medium text-sm animate-pulse">Pagamento único. Sem mensalidades.</p>
                </div>

                <Button 
                  onClick={toggleCheckout}
                  size="lg" 
                  className="w-full h-16 text-xl font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02]"
                >
                  QUERO ENTRAR NO ECOSSISTEMA AGORA
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>

                <div className="mt-6 flex justify-center items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest">
                  <Shield className="w-4 h-4" /> 7 Dias de Garantia Incondicional
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Perguntas Frequentes" />
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-zinc-800 rounded-lg bg-zinc-900/50 px-4">
                  <AccordionTrigger className="text-white hover:text-primary transition-colors hover:no-underline text-left font-medium text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="py-12 border-t border-zinc-900 bg-black text-center text-zinc-600">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
              <Smartphone className="h-6 w-6" />
              <span className="font-bold text-lg">LucroCelular</span>
            </div>
            <p className="text-sm mb-4">
              &copy; 2024 Método Lucro com Celulares. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-xs">
              <a href="#" className="hover:text-zinc-400">Termos de Uso</a>
              <a href="#" className="hover:text-zinc-400">Política de Privacidade</a>
            </div>
            <p className="mt-8 text-[10px] max-w-md mx-auto leading-relaxed opacity-40">
              Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. 
              Os resultados podem variar de pessoa para pessoa. Não garantimos ganhos sem aplicação do método.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
