import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import { submitApplication } from '../lib/submitApplication';
import type { ApplicationErrors, ApplicationFormData } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: ApplicationFormData = {
  name: '',
  email: '',
  socialHandle: '',
  isEighteenPlus: false,
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const fieldClass = (hasError: boolean) =>
  [
    'w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white',
    'placeholder:text-white/25 transition-colors duration-200 focus:outline-none',
    hasError ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-accent',
  ].join(' ');

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [form, setForm] = useState<ApplicationFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const requestClose = useCallback(() => {
    if (isSubmitting || closingRef.current) return;

    const finish = () => {
      closingRef.current = false;
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitError(null);
      setIsSuccess(false);
      onClose();
    };

    if (prefersReducedMotion() || !panelRef.current || !backdropRef.current) {
      finish();
      return;
    }

    closingRef.current = true;
    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 10,
      scale: 0.985,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      autoAlpha: 0,
      duration: 0.24,
      ease: 'power2.in',
      onComplete: finish,
    });
  }, [isSubmitting, onClose]);

  // Entrance animation, then focus the first field
  useLayoutEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([backdropRef.current, panelRef.current], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(backdropRef.current, { autoAlpha: 0 });
      gsap.set(panelRef.current, { autoAlpha: 0, y: 18, scale: 0.985 });

      gsap
        .timeline()
        .to(backdropRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
        .to(
          panelRef.current,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' },
          0.05,
        )
        .fromTo(
          '.js-field',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          0.18,
        );
    }, panelRef);

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('input')?.focus();
    }, 220);

    return () => {
      window.clearTimeout(focusTimer);
      ctx.revert();
    };
  }, [isOpen]);

  // Hand focus back to whatever opened the dialog
  useEffect(() => {
    if (isOpen) return;
    previouslyFocused.current?.focus?.();
  }, [isOpen]);

  // Lock background scrolling while open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape closes; Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable: HTMLElement[] = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, requestClose]);

  if (!isOpen) return null;

  const update = <K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: ApplicationErrors = {};

    if (!form.name.trim()) next.name = 'Please enter your name.';

    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }

    if (!form.socialHandle.trim()) next.socialHandle = 'Please add one social handle.';
    if (!form.isEighteenPlus) next.isEighteenPlus = 'You must confirm you are 18 or over.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitApplication(form);
      setIsSuccess(true);
    } catch {
      setSubmitError('Something went wrong sending your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div
        ref={backdropRef}
        onClick={requestClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        className="relative z-10 my-auto w-full max-w-[480px] rounded-2xl border border-white/10 bg-ink-raised p-7 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:p-9"
      >
        <button
          type="button"
          onClick={requestClose}
          disabled={isSubmitting}
          aria-label="Close application"
          className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>

        {isSuccess ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <Check aria-hidden="true" className="h-6 w-6 text-accent" />
            </div>

            <h2
              id="application-title"
              className="mb-3 text-2xl font-extrabold uppercase tracking-[-0.02em]"
            >
              Application received
            </h2>

            <p className="mx-auto mb-8 max-w-[320px] text-sm leading-relaxed text-white/50">
              Thanks{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''}. We review every
              application personally and reply by email if there is a fit.
            </p>

            <button
              type="button"
              onClick={requestClose}
              className="w-full rounded-full bg-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-white/85"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="js-field mb-7 pr-8">
              <h2
                id="application-title"
                className="text-2xl font-extrabold uppercase leading-[1.05] tracking-[-0.025em] sm:text-[28px]"
              >
                Start your <span className="text-accent">application</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="js-field">
                <label
                  htmlFor="application-name"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45"
                >
                  Name
                </label>
                <input
                  id="application-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'application-name-error' : undefined}
                  className={fieldClass(Boolean(errors.name))}
                />
                {errors.name && (
                  <p id="application-name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="js-field">
                <label
                  htmlFor="application-email"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45"
                >
                  Email
                </label>
                <input
                  id="application-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'application-email-error' : undefined}
                  className={fieldClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="application-email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="js-field">
                <label
                  htmlFor="application-social"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45"
                >
                  Instagram / TikTok
                </label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30"
                  >
                    @
                  </span>
                  <input
                    id="application-social"
                    type="text"
                    placeholder="yourhandle"
                    value={form.socialHandle}
                    onChange={(event) => update('socialHandle', event.target.value.replace(/^@/, ''))}
                    aria-invalid={Boolean(errors.socialHandle)}
                    aria-describedby={errors.socialHandle ? 'application-social-error' : undefined}
                    className={`${fieldClass(Boolean(errors.socialHandle))} pl-8`}
                  />
                </div>
                {errors.socialHandle && (
                  <p id="application-social-error" className="mt-1.5 text-xs text-red-400">
                    {errors.socialHandle}
                  </p>
                )}
              </div>

              <div className="js-field pt-1">
                <label htmlFor="application-age" className="flex cursor-pointer items-center gap-3">
                  <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                    <input
                      id="application-age"
                      type="checkbox"
                      checked={form.isEighteenPlus}
                      onChange={(event) => update('isEighteenPlus', event.target.checked)}
                      aria-invalid={Boolean(errors.isEighteenPlus)}
                      aria-describedby={errors.isEighteenPlus ? 'application-age-error' : undefined}
                      className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-white/25 bg-white/[0.04] transition-colors duration-150 checked:border-accent checked:bg-accent"
                    />
                    <Check
                      aria-hidden="true"
                      strokeWidth={3.5}
                      className="pointer-events-none absolute h-3 w-3 text-black opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
                    />
                  </span>
                  <span className="text-[13px] text-white/60">I confirm I am 18+</span>
                </label>
                {errors.isEighteenPlus && (
                  <p id="application-age-error" className="mt-1.5 text-xs text-red-400">
                    {errors.isEighteenPlus}
                  </p>
                )}
              </div>

              {submitError && (
                <p role="alert" className="text-xs text-red-400">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="js-field group flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="js-field text-center text-[10px] uppercase tracking-[0.18em] text-white/25">
                Private application <span className="mx-1 text-white/15">•</span> 18+ only
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
