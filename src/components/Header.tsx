import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenApply: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenApply }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0A0A0B]/90 border-b border-white/10 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo with Bold Typography */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-center gap-1 text-white transition-opacity hover:opacity-90"
            aria-label="Typhoon Agency Home"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-tighter font-['Space_Grotesk'] text-white">
              TYPhOON<span className="text-[#008FF2]">.</span>
            </span>
          </a>
        </div>

        {/* Center Pill Attributes from Theme */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
          <span className="hover:text-white transition-colors">Confidential</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="hover:text-white transition-colors">Professional</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="hover:text-white transition-colors">Creator-First</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008FF2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#008FF2]"></span>
            </span>
            <span>Intake Open</span>
          </div>

          <button
            id="header-apply-btn"
            onClick={onOpenApply}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#008FF2] hover:bg-[#007cd2] text-white text-xs sm:text-sm font-bold tracking-tight shadow-[0_0_20px_rgba(0,143,242,0.3)] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
