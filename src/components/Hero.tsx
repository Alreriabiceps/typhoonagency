import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-pill',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          '.hero-headline-line',
          { opacity: 0, y: 35, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-subcopy',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-image-container',
          { opacity: 0, scale: 0.95, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1 },
          '-=0.8'
        )
        .fromTo(
          '.hero-floating-badge',
          { opacity: 0, scale: 0.85, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle interactive mouse parallax effect on the portrait
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(imageWrapperRef.current, {
      rotateY: x * 4,
      rotateX: -y * 4,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    if (!imageWrapperRef.current) return;
    gsap.to(imageWrapperRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power2.out',
      duration: 0.8,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-8 pb-10 md:pt-10 md:pb-12 overflow-hidden"
    >
      {/* Subtle background atmospheric gradient from theme */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-[#008FF2] blur-[150px] opacity-15 pointer-events-none"></div>
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,#008FF2_0%,transparent_65%)] blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bold Typography & Conversion Action */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Category Eyebrow in Theme Style */}
            <div className="hero-pill mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#008FF2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008FF2] animate-pulse"></span>
              Creator Management Agency
            </div>

            {/* Massive Bold Typography Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tighter text-white leading-[0.92] mb-5">
              <span className="block hero-headline-line">Turn Your</span>
              <span className="block hero-headline-line text-white">Audience Into</span>
              <span className="block hero-headline-line text-white">
                A <span className="text-[#008FF2] italic font-serif font-normal">Business.</span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="hero-subcopy text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-lg mb-7">
              Typhoon Agency helps creators grow, monetize, and manage their content business with a dedicated team behind them.
            </p>

            {/* Primary CTA & Metadata from Theme */}
            <div className="hero-cta-group flex flex-col sm:flex-row sm:items-center gap-5">
              <button
                id="hero-apply-btn"
                onClick={onOpenApply}
                className="bg-[#008FF2] hover:bg-[#007cd2] text-white px-9 py-4 rounded-full font-bold text-sm tracking-tight transition-all duration-200 active:scale-95 shadow-[0_0_25px_rgba(0,143,242,0.35)] cursor-pointer inline-flex items-center justify-center gap-2 shrink-0"
              >
                <span>Apply to Join Typhoon</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="text-xs text-white/50 tracking-wider font-medium">
                Confidential • Professional • Creator-first
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Portrait in Bold Theme Treatment */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={imageWrapperRef}
              className="hero-image-container relative w-full max-w-[370px] aspect-[3/4] rounded-3xl bg-gradient-to-tr from-[#1a1a1c] to-[#2a2a2c] border border-white/10 overflow-hidden shadow-2xl shadow-black/90 transition-transform duration-300 ease-out group"
            >
              {/* Radial glow accent from theme */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#008FF2_0%,_transparent_55%)] opacity-30 pointer-events-none z-10"></div>

              {/* Editorial Fashion/Lifestyle Portrait (Non-explicit, professional high-fashion) */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Typhoon Agency creator editorial portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95] transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Sophisticated gradient overlay for dark integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

              {/* Subtle Film Grain Effect */}
              <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none mix-blend-overlay"></div>

              {/* Featured Creator & Quote banner from Theme */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 text-left">
                <div className="text-lg sm:text-xl font-light italic font-serif text-white leading-snug">
                  "My business grew 340% in six months."
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[#008FF2] font-semibold mt-1 font-mono">
                  Verified Roster Creator
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
