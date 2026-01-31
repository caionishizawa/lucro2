import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Estado {
  id: string;
  nome: string;
  x: number;
  y: number;
}

interface BrazilMapProps {
  sedeX?: number;
  sedeY?: number;
  sedeLabel?: string;
  particleColor?: string;
}

// Coordenadas centrais dos estados (baseado no SVG viewBox 0 0 800 850)
const ESTADOS: Estado[] = [
  // Norte
  { id: "AM", nome: "Amazonas", x: 185, y: 240 },
  { id: "PA", nome: "Pará", x: 370, y: 220 },
  { id: "AC", nome: "Acre", x: 95, y: 315 },
  { id: "RO", nome: "Rondônia", x: 190, y: 350 },
  { id: "RR", nome: "Roraima", x: 220, y: 110 },
  { id: "AP", nome: "Amapá", x: 390, y: 115 },
  { id: "TO", nome: "Tocantins", x: 425, y: 345 },
  // Nordeste
  { id: "MA", nome: "Maranhão", x: 475, y: 250 },
  { id: "PI", nome: "Piauí", x: 510, y: 315 },
  { id: "CE", nome: "Ceará", x: 570, y: 255 },
  { id: "RN", nome: "Rio Grande do Norte", x: 620, y: 265 },
  { id: "PB", nome: "Paraíba", x: 625, y: 295 },
  { id: "PE", nome: "Pernambuco", x: 600, y: 330 },
  { id: "AL", nome: "Alagoas", x: 635, y: 360 },
  { id: "SE", nome: "Sergipe", x: 610, y: 385 },
  { id: "BA", nome: "Bahia", x: 545, y: 430 },
  // Centro-Oeste
  { id: "MT", nome: "Mato Grosso", x: 295, y: 395 },
  { id: "GO", nome: "Goiás", x: 430, y: 480 },
  { id: "MS", nome: "Mato Grosso do Sul", x: 330, y: 545 },
  { id: "DF", nome: "Distrito Federal", x: 470, y: 465 },
  // Sudeste
  { id: "MG", nome: "Minas Gerais", x: 510, y: 530 },
  { id: "ES", nome: "Espírito Santo", x: 595, y: 525 },
  { id: "RJ", nome: "Rio de Janeiro", x: 560, y: 595 },
  { id: "SP", nome: "São Paulo (Sede)", x: 445, y: 600 },
  // Sul
  { id: "PR", nome: "Paraná", x: 395, y: 660 },
  { id: "SC", nome: "Santa Catarina", x: 410, y: 720 },
  { id: "RS", nome: "Rio Grande do Sul", x: 370, y: 790 },
];

// SVG paths dos estados brasileiros (simplificado mas realista)
const BRAZIL_STATES_PATHS: Record<string, string> = {
  // Norte
  AM: "M70,165 L95,145 L135,130 L180,125 L220,130 L265,140 L295,160 L305,190 L295,230 L280,270 L260,310 L235,345 L200,365 L160,370 L120,355 L90,330 L70,290 L60,245 L60,200 Z",
  PA: "M295,160 L340,150 L385,145 L430,150 L470,165 L500,190 L510,225 L500,260 L480,290 L450,310 L420,320 L385,325 L350,315 L320,295 L300,265 L290,230 L295,195 Z",
  AC: "M55,290 L90,280 L120,285 L145,305 L150,340 L135,365 L100,370 L65,355 L50,325 Z",
  RO: "M145,305 L180,300 L215,310 L240,340 L235,380 L210,400 L170,395 L145,365 L140,335 Z",
  RR: "M180,55 L215,50 L250,60 L270,90 L265,130 L235,150 L195,145 L170,115 L170,80 Z",
  AP: "M355,55 L395,50 L430,65 L440,105 L420,145 L380,155 L345,140 L340,100 L345,70 Z",
  TO: "M385,295 L420,285 L455,295 L475,330 L470,375 L450,410 L415,420 L380,405 L365,365 L370,325 Z",
  // Nordeste
  MA: "M430,200 L470,190 L510,195 L540,220 L545,260 L530,295 L495,310 L455,305 L425,280 L420,240 Z",
  PI: "M480,285 L520,275 L555,285 L570,325 L555,370 L520,385 L485,375 L470,335 L470,305 Z",
  CE: "M530,220 L570,210 L610,225 L625,265 L605,300 L565,310 L535,290 L530,255 Z",
  RN: "M590,220 L630,215 L660,235 L660,270 L635,290 L600,285 L585,260 Z",
  PB: "M590,280 L635,275 L665,295 L660,325 L625,335 L590,325 L585,300 Z",
  PE: "M550,310 L590,305 L640,315 L660,350 L640,380 L590,385 L555,365 L545,335 Z",
  AL: "M605,360 L645,355 L670,380 L660,415 L625,425 L600,405 L600,380 Z",
  SE: "M580,380 L610,375 L630,400 L620,430 L590,440 L570,420 L570,395 Z",
  BA: "M470,365 L520,355 L570,370 L605,405 L615,460 L600,520 L555,555 L500,560 L455,535 L430,485 L435,430 L455,395 Z",
  // Centro-Oeste
  MT: "M200,350 L260,340 L320,350 L375,375 L390,430 L375,490 L330,525 L270,530 L215,505 L180,455 L175,400 Z",
  GO: "M375,430 L425,420 L475,435 L505,480 L495,530 L455,555 L405,555 L365,530 L355,485 L360,450 Z",
  MS: "M260,500 L315,490 L365,510 L385,560 L370,615 L320,640 L265,630 L235,585 L240,535 Z",
  DF: "M455,445 L485,445 L495,470 L480,495 L450,495 L440,470 Z",
  // Sudeste
  MG: "M430,470 L495,460 L550,480 L590,525 L595,580 L560,620 L500,635 L445,625 L405,590 L400,535 L410,495 Z",
  ES: "M565,480 L600,475 L630,500 L635,550 L615,585 L575,590 L555,555 L555,515 Z",
  RJ: "M510,565 L560,555 L600,575 L610,615 L580,650 L530,655 L500,630 L500,595 Z",
  SP: "M365,555 L420,545 L475,560 L510,600 L505,655 L460,690 L400,695 L350,665 L340,615 L345,575 Z",
  // Sul
  PR: "M330,645 L385,635 L440,650 L470,695 L455,745 L400,765 L345,755 L315,710 L315,670 Z",
  SC: "M355,745 L405,735 L450,755 L460,795 L435,830 L385,840 L345,820 L340,780 Z",
  RS: "M305,765 L360,755 L410,780 L435,835 L420,890 L365,920 L300,910 L265,865 L270,810 Z",
};

export function BrazilMap({
  sedeX = 445,
  sedeY = 600,
  sedeLabel = "São Paulo/SP",
  particleColor = "#C41E3A"
}: BrazilMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] = useState<Set<string>>(new Set());
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const explosionParticlesRef = useRef<any[]>([]);
  const scaleRef = useRef<number>(1);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Transform SVG coordinates to canvas coordinates
  const transformCoord = useCallback((coord: { x: number; y: number }) => ({
    x: coord.x * scaleRef.current + offsetRef.current.x,
    y: coord.y * scaleRef.current + offsetRef.current.y,
  }), []);

  // Bezier curve point calculation
  const bezierPoint = useCallback((p0: number, p1: number, p2: number, t: number) => {
    return Math.pow(1 - t, 2) * p0 + 2 * (1 - t) * t * p1 + Math.pow(t, 2) * p2;
  }, []);

  // Easing function for smooth animation
  const easeInOutCubic = useCallback((t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, []);

  // Convert hex to rgba
  const hexToRgba = useCallback((hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }, []);

  // Create mini explosion effect
  const createMiniExplosion = useCallback((x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i;
      const speed = 1 + Math.random() * 2;

      explosionParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 2,
        opacity: 1,
        life: 30,
        maxLife: 30,
      });
    }
  }, []);

  // Create path from sede to a state
  const createPathToState = useCallback((estado: Estado, delay: number) => {
    setTimeout(() => {
      const sedeTransformed = transformCoord({ x: sedeX, y: sedeY });
      const destinoTransformed = transformCoord({ x: estado.x, y: estado.y });

      // Create multiple particles for each path
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          particlesRef.current.push({
            startX: sedeTransformed.x,
            startY: sedeTransformed.y,
            x: sedeTransformed.x,
            y: sedeTransformed.y,
            targetX: destinoTransformed.x + (Math.random() - 0.5) * 20,
            targetY: destinoTransformed.y + (Math.random() - 0.5) * 20,
            progress: 0,
            speed: 0.02 + Math.random() * 0.01,
            size: 3 + Math.random() * 3,
            opacity: 1,
            trail: [] as { x: number; y: number; opacity: number }[],
            estadoId: estado.id,
            completed: false,
          });
        }, i * 100);
      }
    }, delay);
  }, [transformCoord, sedeX, sedeY]);

  // Start animation to all states
  const animateToAllStates = useCallback(() => {
    let delay = 0;
    ESTADOS.forEach((estado) => {
      createPathToState(estado, delay);
      delay += 150;
    });
  }, [createPathToState]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !hasAnimated) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const svgWidth = 800;
      const svgHeight = 950;
      scaleRef.current = Math.min(canvas.width / svgWidth, canvas.height / svgHeight);
      offsetRef.current = {
        x: (canvas.width - svgWidth * scaleRef.current) / 2,
        y: (canvas.height - svgHeight * scaleRef.current) / 2,
      };
    };

    resize();
    window.addEventListener("resize", resize);

    const completedStates = new Set<string>();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.progress += p.speed;

        const t = easeInOutCubic(Math.min(p.progress, 1));

        // Bezier curve control point for curved path
        const cx = (p.startX + p.targetX) / 2 + (Math.random() - 0.5) * 50;
        const cy = Math.min(p.startY, p.targetY) - 50 - Math.random() * 50;

        const newX = bezierPoint(p.startX, cx, p.targetX, t);
        const newY = bezierPoint(p.startY, cy, p.targetY, t);

        // Update trail
        p.trail.unshift({ x: newX, y: newY, opacity: 1 });
        if (p.trail.length > 10) p.trail.pop();

        // Fade trail
        p.trail.forEach((point: any, idx: number) => {
          point.opacity = 1 - idx / 10;
        });

        // Check if reached destination
        if (p.progress >= 1 && !p.completed) {
          p.completed = true;
          if (!completedStates.has(p.estadoId)) {
            completedStates.add(p.estadoId);
            setActiveStates(prev => new Set(prev).add(p.estadoId));
            createMiniExplosion(p.targetX, p.targetY);

            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('estadoActivated', {
              detail: { estadoId: p.estadoId }
            }));
          }
        }

        // Fade out completed particles
        if (p.completed) {
          p.opacity -= 0.05;
          if (p.opacity <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      // Update explosion particles
      for (let i = explosionParticlesRef.current.length - 1; i >= 0; i--) {
        const ep = explosionParticlesRef.current[i];
        ep.x += ep.vx;
        ep.y += ep.vy;
        ep.life--;
        ep.opacity = ep.life / ep.maxLife;

        if (ep.life <= 0) {
          explosionParticlesRef.current.splice(i, 1);
        }
      }

      // Draw particle trails
      for (const p of particlesRef.current) {
        for (let i = 0; i < p.trail.length - 1; i++) {
          const t1 = p.trail[i];
          const t2 = p.trail[i + 1];

          ctx.beginPath();
          ctx.moveTo(t1.x, t1.y);
          ctx.lineTo(t2.x, t2.y);
          ctx.strokeStyle = hexToRgba(particleColor, t1.opacity * p.opacity * 0.5);
          ctx.lineWidth = p.size * (1 - i / 10);
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Draw particle head with glow
        if (p.trail.length > 0) {
          const head = p.trail[0];

          // Glow effect
          const gradient = ctx.createRadialGradient(
            head.x, head.y, 0,
            head.x, head.y, p.size * 4
          );
          gradient.addColorStop(0, hexToRgba(particleColor, p.opacity));
          gradient.addColorStop(0.5, hexToRgba(particleColor, p.opacity * 0.3));
          gradient.addColorStop(1, hexToRgba(particleColor, 0));

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(head.x, head.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Solid particle core
          ctx.fillStyle = hexToRgba(particleColor, p.opacity);
          ctx.beginPath();
          ctx.arc(head.x, head.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw explosion particles
      for (const ep of explosionParticlesRef.current) {
        ctx.fillStyle = hexToRgba(particleColor, ep.opacity);
        ctx.beginPath();
        ctx.arc(ep.x, ep.y, ep.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    setTimeout(() => {
      animateToAllStates();
    }, 500);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated, animateToAllStates, bezierPoint, easeInOutCubic, hexToRgba, createMiniExplosion, particleColor]);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(mapContainer);

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Handle hover synchronization
  const handleStateHover = (stateId: string | null) => {
    setHoveredState(stateId);
  };

  return (
    <div ref={mapContainerRef} className="mapa-container relative w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
        {/* Map Container */}
        <div ref={containerRef} className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          {/* Canvas for particles */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 pointer-events-none"
          />

          {/* SVG Map */}
          <svg
            viewBox="0 0 800 950"
            className="absolute inset-0 w-full h-full z-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="brazilGradientNew" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(196, 30, 58, 0.08)" />
                <stop offset="100%" stopColor="rgba(196, 30, 58, 0.02)" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="stateGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={particleColor} floodOpacity="0.5" />
              </filter>
            </defs>

            {/* State paths */}
            <g id="estados">
              {Object.entries(BRAZIL_STATES_PATHS).map(([stateId, path]) => {
                const isActive = activeStates.has(stateId);
                const isHovered = hoveredState === stateId;

                return (
                  <motion.path
                    key={stateId}
                    id={stateId}
                    d={path}
                    className="cursor-pointer transition-all duration-300"
                    fill={isActive || isHovered ? particleColor : "#3f3f46"}
                    stroke="#18181b"
                    strokeWidth="2"
                    filter={isActive ? "url(#stateGlow)" : undefined}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      fill: isActive || isHovered ? particleColor : "#3f3f46"
                    }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => handleStateHover(stateId)}
                    onMouseLeave={() => handleStateHover(null)}
                  />
                );
              })}
            </g>

            {/* Sede (headquarters) pulsing point */}
            <motion.circle
              cx={sedeX}
              cy={sedeY}
              r="10"
              fill={particleColor}
              stroke="white"
              strokeWidth="3"
              filter="url(#glowFilter)"
              className="drop-shadow-[0_0_10px_rgba(196,30,58,0.8)]"
              animate={{
                r: [10, 14, 10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Sede label */}
            <text
              x={sedeX}
              y={sedeY - 20}
              textAnchor="middle"
              fill={particleColor}
              fontSize="12"
              fontWeight="bold"
              className="font-sans uppercase tracking-wider"
            >
              {sedeLabel}
            </text>

            {/* State pins and labels */}
            {ESTADOS.map((estado, i) => {
              const isActive = activeStates.has(estado.id);
              const isHovered = hoveredState === estado.id;

              return (
                <g key={estado.id}>
                  <motion.circle
                    cx={estado.x}
                    cy={estado.y}
                    r={isActive ? 6 : 4}
                    fill={isActive ? particleColor : "#71717a"}
                    stroke="white"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ delay: i * 0.05 + 0.5 }}
                    onMouseEnter={() => handleStateHover(estado.id)}
                    onMouseLeave={() => handleStateHover(null)}
                  />

                  {(isActive || isHovered) && (
                    <motion.text
                      x={estado.x}
                      y={estado.y - 12}
                      textAnchor="middle"
                      fill={particleColor}
                      fontSize="10"
                      fontWeight="bold"
                      className="font-sans uppercase tracking-wider pointer-events-none"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {estado.id}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* States List */}
        <div className="estados-lista grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 max-h-[500px] lg:max-h-[700px] overflow-y-auto pr-2">
          {ESTADOS.map((estado, i) => {
            const isActive = activeStates.has(estado.id);
            const isHovered = hoveredState === estado.id;

            return (
              <motion.div
                key={estado.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 + 0.5 }}
                className={`estado-item flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-250 ${
                  isActive || isHovered
                    ? "border-[#C41E3A] bg-[rgba(196,30,58,0.05)]"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
                onMouseEnter={() => handleStateHover(estado.id)}
                onMouseLeave={() => handleStateHover(null)}
              >
                <div
                  className={`estado-sigla w-9 h-9 flex items-center justify-center rounded-md font-bold text-sm ${
                    isActive
                      ? "bg-[#C41E3A] text-white"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {estado.id}
                </div>
                <span className="estado-nome text-sm text-zinc-300 truncate">
                  {estado.nome}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active states counter */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 text-center"
      >
        <span className="text-[#C41E3A] text-xs font-bold uppercase tracking-wider">
          • Rede Ativa em Tempo Real • {activeStates.size}/{ESTADOS.length} Estados Conectados
        </span>
      </motion.div>
    </div>
  );
}
