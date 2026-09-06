import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { ApplicationFormData } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    isEighteenPlus: false,
    socialHandle: '',
    email: '',
    interestReason: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Prevent background scrolling while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full or preferred name.';
    }

    if (!formData.isEighteenPlus) {
      newErrors.isEighteenPlus = 'You must confirm that you are at least 18 years of age.';
    }

    if (!formData.socialHandle.trim()) {
      newErrors.socialHandle = 'Please provide your Instagram or TikTok handle.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.interestReason.trim()) {
      newErrors.interestReason = 'Please briefly describe why you are interested in joining.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate safe API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      isEighteenPlus: false,
      socialHandle: '',
      email: '',
      interestReason: '',
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={!isSubmitting ? onClose : undefined}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Modal Container with Bold Typography aesthetic */}
      <div className="relative w-full max-w-lg bg-[#0e0f14] border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-black z-10 text-left my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close application modal"
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Submission Success State */
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#008FF2]/15 border border-[#008FF2]/30 mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-[#008FF2]" />
            </div>

            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#008FF2] mb-2">
              Application Received
            </span>

            <h3 id="modal-headline" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Thank you, {formData.name.split(' ')[0]}.
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
              Your confidential application has been securely routed to our senior management team. We evaluate each creator profile with strict discretion and will reach out via email or direct message within 24–48 hours.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-400 text-left space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-zinc-500">Candidate:</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Contact Handle:</span>
                <span className="text-white font-medium">{formData.socialHandle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Status:</span>
                <span className="text-[#008FF2] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008FF2] inline-block animate-pulse"></span>
                  Under Review
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 px-6 rounded-full bg-[#008FF2] hover:bg-[#007cd2] text-white font-bold text-sm tracking-tight shadow-[0_0_20px_rgba(0,143,242,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Application Form */
          <div>
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#008FF2]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Creator Application
                </span>
              </div>
              <h3 id="modal-headline" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Apply to Join Typhoon
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                Complete the confidential questionnaire below. All submissions are protected under standard agency non-disclosure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full / Preferred Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Full or Preferred Name <span className="text-[#008FF2]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mia Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                    errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#008FF2]'
                  } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Instagram / TikTok Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Instagram / TikTok Username <span className="text-[#008FF2]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-zinc-500 text-sm">@</span>
                  <input
                    type="text"
                    placeholder="yourhandle"
                    value={formData.socialHandle.replace(/^@/, '')}
                    onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                    className={`w-full pl-8 pr-4 py-3 rounded-xl bg-white/[0.04] border ${
                      errors.socialHandle
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-white/10 focus:border-[#008FF2]'
                    } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors`}
                  />
                </div>
                {errors.socialHandle && (
                  <p className="text-red-400 text-xs mt-1">{errors.socialHandle}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#008FF2]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                    errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#008FF2]'
                  } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Why are you interested in joining? */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Why are you interested in joining Typhoon? <span className="text-[#008FF2]">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your current audience, goals, and what you'd like support with..."
                  value={formData.interestReason}
                  onChange={(e) => setFormData({ ...formData, interestReason: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                    errors.interestReason
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-white/10 focus:border-[#008FF2]'
                  } text-white placeholder-zinc-500 text-sm focus:outline-none transition-colors resize-none`}
                ></textarea>
                {errors.interestReason && (
                  <p className="text-red-400 text-xs mt-1">{errors.interestReason}</p>
                )}
              </div>

              {/* Age confirmation (18+) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.isEighteenPlus}
                    onChange={(e) => setFormData({ ...formData, isEighteenPlus: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-[#008FF2] focus:ring-[#008FF2] focus:ring-offset-zinc-900 cursor-pointer accent-[#008FF2]"
                  />
                  <span className="text-xs text-gray-300 group-hover:text-white leading-tight">
                    I confirm that I am at least 18 years of age and authorized to enter into talent representation discussions.
                  </span>
                </label>
                {errors.isEighteenPlus && (
                  <p className="text-red-400 text-xs mt-1">{errors.isEighteenPlus}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#008FF2] hover:bg-[#007cd2] text-white font-bold text-sm tracking-tight shadow-[0_0_25px_rgba(0,143,242,0.4)] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Encrypted Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Discreet privacy notice */}
              <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008FF2]" />
                <span>Encrypted transmission. Your identity is 100% safeguarded.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
