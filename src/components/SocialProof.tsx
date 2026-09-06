import React from 'react';
import { Lock, Rocket, Users } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="relative py-12 border-y border-white/10 bg-[#0A0A0B]/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Core Pillars Typography in Bold Theme */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#008FF2]/10 border border-[#008FF2]/25 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#008FF2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                Creator-First Management
              </p>
              <p className="text-xs text-gray-400 mt-1">
                You retain full creative autonomy and ownership
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#008FF2]/10 border border-[#008FF2]/25 flex items-center justify-center shrink-0">
              <Rocket className="w-5 h-5 text-[#008FF2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                Strategy + Content + Growth
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Funnel optimization and targeted audience acquisition
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#008FF2]/10 border border-[#008FF2]/25 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-[#008FF2]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                Private & Professional
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Strict confidentiality, geo-blocking and NDA standard
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
