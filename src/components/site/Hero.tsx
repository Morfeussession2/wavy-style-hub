import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 600" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M -100 ${50 + i * 50} Q ${300 + i * 40} ${10 + i * 40}, 700 ${80 + i * 40} T 1600 ${100 + i * 50}`}
              fill="none"
              stroke="url(#g1)"
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
              className="animate-[slide-in-right_1s_ease-out]"
              opacity={(8 - i / 2) / 10}
            />
          ))}
        </svg>
      </div>

      <div className="relative container mx-auto py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Cachos com atitude, ondas com leveza
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10">
          Agende seu horário online, personalize pelo WhatsApp e descubra produtos e conteúdos feitos para quem ama cabelos cacheados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="glass">
            <a href="/agendar" className="hover-scale">Agendar agora</a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://wa.me/5599999999999?text=Ol%C3%A1!%20Quero%20um%20agendamento%20personalizado."
              className="hover-scale"
            >
              Agendar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
