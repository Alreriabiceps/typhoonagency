import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Lock } from 'lucide-react';

interface ApplicationCTAProps {
  onOpenApply: () => void;
}

export const ApplicationCTA: React.FC<ApplicationCTAProps> = ({ onOpenApply }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Main CTA Container with Bold Theme Styling */}
        <div className="relative rounded-[40px] p-8 sm:p-14 lg:p-16 bg-gradient-to-tr from-[#14151a] to-[#22242a] border border-white/10 text-center shadow-2xl shadow-black overflow-hidden">
          
          {/* Subtle Ambient Radial Glow from Theme */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#008FF2]/20 rounded-full blur-3xl"></div>
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-40 mix-blend-overlay"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            
            <div className="mb-4">
              <span className="text-[#008FF2] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008FF2] animate-pulse"></span>
                Direct Talent Onboarding
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white mb-6 leading-[0.95]">
              Ready to Build Something{' '}
              <span className="text-[#008FF2] italic font-serif font-normal">Bigger?</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed mb-10 max-w-xl mx-auto">
              Tell us a little about yourself and your goals. Our team will review your application and get in touch.
            </p>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                id="application-cta-btn"
                onClick={onOpenApply}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#008FF2] hover:bg-[#007cd2] text-white text-sm font-bold tracking-tight shadow-[0_0_35px_rgba(0,143,242,0.4)] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Start Your Application</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Security & Confidentiality Safeguards */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#008FF2]" />
                <span className="font-medium">Strictly Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#008FF2]" />
                <span className="font-medium">24–48h Review Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008FF2]" />
                <span className="font-medium">Non-Exclusive Evaluation</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
