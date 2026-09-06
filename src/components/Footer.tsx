import React from 'react';
import { ModalType } from '../types';

interface FooterProps {
  onOpenLegal: (type: ModalType) => void;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenApply }) => {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Brand Identity with Bold Typography */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-white font-['Space_Grotesk']">
              TYPhOON<span className="text-[#008FF2]">.</span>
            </span>
            <span className="text-white/20 text-xs">•</span>
            <p className="text-xs text-gray-400">
              Creator Management & Growth
            </p>
          </div>

          {/* Minimal Links */}
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={onOpenApply}
              className="text-[#008FF2] hover:text-[#38a7f8] font-bold transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
