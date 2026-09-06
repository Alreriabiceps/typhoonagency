import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, Sparkles, Sliders, HeartHandshake, ArrowRight } from 'lucide-react';

interface WhyTyphoonProps {
  onOpenApply: () => void;
}

export const WhyTyphoon: React.FC<WhyTyphoonProps> = ({ onOpenApply }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      id: '01',
      title: 'Growth Strategy',
      description: 'Proven organic funnels and audience acquisition to scale your reach.',
      icon: TrendingUp,
    },
    {
      id: '02',
      title: 'Content Support',
      description: 'Creative direction, posting calendars, and high-converting format planning.',
      icon: Sparkles,
    },
    {
      id: '03',
      title: 'Account Management',
      description: '24/7 fan messaging, subscriber retention, and daily operational handling.',
      icon: Sliders,
    },
    {
      id: '04',
      title: 'Creator Support',
      description: 'Dedicated 1-on-1 talent manager in your corner at every stage.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section ref={sectionRef} className="py-8 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Compact 4-Card Benefits Strip (No Clutter) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {benefits.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="why-card group relative p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-[#008FF2]/50 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#008FF2] font-mono text-xs font-bold tracking-wider">
                      {item.id}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-[#008FF2]/40 group-hover:bg-[#008FF2]/10 flex items-center justify-center transition-colors">
                      <IconComponent className="w-4 h-4 text-[#008FF2]" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Straightforward Integrated Application Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-[#14151a] via-[#1a1b22] to-[#14151a] border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#008FF2] mb-1">
              Direct Roster Intake
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Ready to Build Something <span className="text-[#008FF2] italic font-serif font-normal">Bigger?</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Tell us a little about yourself and your goals. Our team will review your application and get in touch.
            </p>
          </div>

          <button
            id="bar-apply-btn"
            onClick={onOpenApply}
            className="group shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#008FF2] hover:bg-[#007cd2] text-white text-xs sm:text-sm font-bold tracking-tight shadow-[0_0_20px_rgba(0,143,242,0.35)] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Start Your Application</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
