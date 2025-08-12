import React, { useEffect, useRef } from 'react'; 
import { gsap } from 'gsap';
import IconeGabeleira from "@/assets/products/IconeGabeleira.png";

interface SplashScreenProps {
  onComplete: () => void;
  isLoading: boolean; // controla se ainda está carregando
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  // Guarda a timeline para podermos controlar depois
  const tl = useRef<GSAPTimeline | null>(null);

  // Inicia a animação de entrada da splash (logo + estrelinhas)
  useEffect(() => {
    tl.current = gsap.timeline();

    tl.current.set(containerRef.current, { opacity: 1 });

    tl.current.fromTo(
      logoRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)'
      }
    );

    // Animação das estrelinhas - loop curto pra dar efeito
    gsap.utils.toArray(sparklesRef.current?.children || []).forEach((star) => {
      gsap.to(star, {
        opacity: 1,
        scale: 1,
        x: () => (Math.random() - 0.7) * 60,
        y: () => (Math.random() - 0.9) * 70,
        rotation: () => Math.random() * 360,
        duration: 1.4 + Math.random(),
        yoyo: true,
        repeat: -3,
        ease: 'sine.inOut'
      });
    });

    return () => {
      tl.current?.kill();
      gsap.globalTimeline.clear();
    };
  }, []);

  // Quando isLoading virar false, dispara o fade out e chama onComplete
  useEffect(() => {
    if (!isLoading && tl.current) {
      // Para animação das estrelinhas (remove repeat infinito)
      gsap.killTweensOf(sparklesRef.current?.children || []);

      // Fade out da splash
      tl.current.to(containerRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: onComplete
      });
    }
  }, [isLoading, onComplete]);

  // Se ainda estiver carregando, mostra splash. Se não, ela vai sumir com a animação acima.
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 opacity-0"
    >
      <div className="relative flex flex-col items-center justify-center">

        {/* Estrelinhas decorativas */}
        <div ref={sparklesRef} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-amber-400 text-xl">✨</div>
          <div className="absolute top-20 right-16 text-rose-400 text-lg">💫</div>
          <div className="absolute bottom-20 left-20 text-pink-400 text-xl">⭐</div>
          <div className="absolute bottom-16 right-12 text-amber-300 text-lg">✨</div>
          <div className="absolute top-32 left-32 text-rose-300 text-sm">💫</div>
          <div className="absolute bottom-32 right-32 text-pink-300 text-sm">⭐</div>
        </div>

        {/* Logo */}
        <div ref={logoRef} className="z-0">
          <img
            src={IconeGabeleira}
            alt="Logo Gabeleira"
            className="max-w-[150px] w-32 md:w-48 drop-shadow-lg"
          />
        </div>

        {/* Círculo decorativo de fundo */}
        <div className="absolute inset-0 -z-10">
          <div className="w-64 h-64 bg-gradient-to-r from-pink-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
