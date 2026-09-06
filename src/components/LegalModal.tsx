import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { ModalType } from '../types';

interface LegalModalProps {
  type: ModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && type) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type || type === 'apply') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="relative w-full max-w-lg bg-[#0e0f14] border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl z-10 text-left my-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#008FF2]">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {type === 'privacy' ? 'Confidentiality & Privacy' : 'Representation Terms'}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
          {type === 'privacy' ? 'Creator Privacy & Non-Disclosure' : 'Talent Partnership Principles'}
        </h3>

        <div className="text-sm text-gray-300 space-y-4 leading-relaxed font-normal">
          {type === 'privacy' ? (
            <>
              <p>
                At Typhoon Agency, client confidentiality is our highest operational priority. From the moment you submit an application, all personal data, social handles, and identity details are protected under standard non-disclosure protocols.
              </p>
              <h4 className="text-white font-bold text-base mt-4 uppercase tracking-wide">Geo-Blocking & Anonymity</h4>
              <p>
                We support advanced geographic restriction tools and strict privacy controls for creators who prefer regional anonymity or targeted audience segmentation.
              </p>
              <h4 className="text-white font-bold text-base mt-4 uppercase tracking-wide">Data Security</h4>
              <p>
                All account credentials, banking routing, and correspondence are held within encrypted, multi-factor protected talent vaults. We never sell or share creator data with third parties.
              </p>
            </>
          ) : (
            <>
              <p>
                Typhoon Agency operates on a true creator-first representation model. We partner exclusively with creators who have a dedicated commitment to building a sustainable, high-earning digital business.
              </p>
              <h4 className="text-white font-bold text-base mt-4 uppercase tracking-wide">100% Content Ownership</h4>
              <p>
                You maintain complete ownership of all content, likeness, and intellectual property. We act as your strategic, creative, and operational partner.
              </p>
              <h4 className="text-white font-bold text-base mt-4 uppercase tracking-wide">Performance Alignment</h4>
              <p>
                Our fee structure is strictly performance-based. We do not charge upfront retainer fees; our team wins only when your monthly recurring revenue accelerates.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
