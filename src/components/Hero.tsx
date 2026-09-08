import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onApply: () => void;
}

const PHOTO = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
const photoAt = (w: number) => `${PHOTO}?auto=format&fit=crop&crop=faces&w=${w}&q=75`;

const ALL_TARGETS = [
  '.js-brand',
  '.js-line',
  '.js-eyebrow',
  '.js-lead',
  '.js-proof',
  '.js-offer',
  '.js-cta',
  '.js-media',
  '.js-strip-item',
];

const SERVICES = ['Traffic', 'Content strategy', 'Chatting', 'Retention'];

const IG_HREF = 'https://www.instagram.com/icona.talents/';
const IG_PATH =
  'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.055 1.265.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.055-1.645.07-4.859.07-3.203 0-3.585-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.646-.061-4.849 0-3.204.016-3.585.061-4.849.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.668c-3.405 0-6.162 2.76-6.162 6.162S8.595 18.333 12 18.333 18.166 15.577 18.166 12.172 15.405 5.828 12 5.828zM12 16c-2.156 0-3.908-1.751-3.908-3.908S9.844 8.184 12 8.184s3.908 1.751 3.908 3.908S14.156 16 12 16zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path d={IG_PATH} className="fill-current" />
    </svg>
  );
}

export function Hero({ onApply }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        gsap.set(ALL_TARGETS, { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, clipPath: 'none' });
        return;
      }

      gsap.set('.js-brand', { autoAlpha: 0, y: -12 });
      gsap.set('.js-line', { yPercent: 108 });
      gsap.set(['.js-eyebrow', '.js-lead', '.js-proof', '.js-offer', '.js-cta'], {
        autoAlpha: 0,
        y: 20,
      });
      gsap.set('.js-media', { autoAlpha: 0, scale: 1.06, clipPath: 'inset(0% 0% 0% 10%)' });
      gsap.set('.js-strip-item', { autoAlpha: 0, y: 10 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('.js-media', {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power2.out',
        })
        .to('.js-brand', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.1)
        .to('.js-eyebrow', { autoAlpha: 1, y: 0, duration: 0.7 }, 0.25)
        .to('.js-line', { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out' }, 0.35)
        .to('.js-lead', { autoAlpha: 1, y: 0, duration: 0.8 }, 0.85)
        .to('.js-proof', { autoAlpha: 1, y: 0, duration: 0.8 }, 0.98)
        .to('.js-offer', { autoAlpha: 1, y: 0, duration: 0.8 }, 1.1)
        .to('.js-cta', { autoAlpha: 1, y: 0, duration: 0.8 }, 1.22)
        .to('.js-strip-item', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 1.1);
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const target = parallaxRef.current;
    if (!target) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const moveX = gsap.quickTo(target, 'x', { duration: 1, ease: 'power3.out' });
    const moveY = gsap.quickTo(target, 'y', { duration: 1, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      moveX((event.clientX / window.innerWidth - 0.5) * -26);
      moveY((event.clientY / window.innerHeight - 0.5) * -18);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative flex flex-1 items-end overflow-hidden lg:items-center">
      <div className="js-media absolute inset-0 lg:left-auto lg:w-[56%] xl:w-[54%]">
        <div ref={parallaxRef} className="grain absolute inset-[-4%]">
          <img
            src={photoAt(1200)}
            srcSet={`${photoAt(640)} 640w, ${photoAt(900)} 900w, ${photoAt(1200)} 1200w, ${photoAt(1600)} 1600w`}
            sizes="(min-width: 1024px) 56vw, 100vw"
            alt="Typhoon Agency creator portrait"
            width={1200}
            height={1600}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className="media-fade h-full w-full object-cover object-[50%_18%] contrast-[1.06] saturate-[0.92] brightness-[0.9] lg:object-[46%_26%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink via-ink/55 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-ink to-transparent lg:block" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.16] blur-[160px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-9 pt-24 sm:px-10 sm:pb-14 sm:pt-32 lg:px-14 lg:py-14">
        <div className="max-w-[min(100%,34rem)]">
          {/* 1 — Who */}
          <p className="js-eyebrow mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 sm:mb-5 sm:text-[11px]">
            IconaTalents
            <span className="mx-2.5 text-white/20">·</span>
            Top 0.01% worldwide
          </p>

          {/* 2 — Headline */}
          <h1 className="mb-6 font-display text-[clamp(1.85rem,0.9rem+3.8vw,3.15rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:mb-7">
            <span className="line-mask block">
              <span className="js-line block">Turn your</span>
            </span>
            <span className="line-mask block">
              <span className="js-line block">content into</span>
            </span>
            <span className="line-mask block">
              <span className="js-line block">
                a <span className="text-accent">business.</span>
              </span>
            </span>
          </h1>

          {/* 3 — Lead */}
          <p className="js-lead mb-8 max-w-[38ch] text-[15px] leading-relaxed text-white/55 sm:mb-9 sm:text-base">
            Hey, I came across your profile and genuinely think you have serious potential.
            I&apos;m a recruiter for an OF agency managing creators in the top 0.01% worldwide.
          </p>

          {/* 4 — Proof */}
          <div className="js-proof mb-8 border-l-2 border-accent pl-4 sm:mb-9 sm:pl-5">
            <p className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display font-extrabold tracking-[-0.04em]">
              <span className="text-[1.5rem] text-white/40 sm:text-[1.65rem]">$100</span>
              <span className="text-[12px] font-semibold tracking-[0.18em] text-accent">→</span>
              <span className="text-[1.5rem] text-accent sm:text-[1.65rem]">$30k</span>
            </p>
            <p className="max-w-[40ch] text-[13px] leading-relaxed text-white/45 sm:text-[14px]">
              One of our newest creators was generating around $100 per month before joining us,
              and reached $30k in revenue during her first full month with our team.
            </p>
          </div>

          {/* 5 — Offer */}
          <div className="js-offer mb-9 sm:mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              We handle everything
            </p>
            <ul className="mb-5 flex flex-wrap gap-x-1 gap-y-2">
              {SERVICES.map((service, index) => (
                <li key={service} className="flex items-center text-[13px] text-white/70 sm:text-[14px]">
                  {index > 0 && (
                    <span aria-hidden="true" className="mx-2.5 text-white/20">
                      ·
                    </span>
                  )}
                  {service}
                </li>
              ))}
            </ul>
            <p className="max-w-[40ch] text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
              There are no upfront payments or monthly retainers. We only make money when you do.
              All of our results can be verified directly.
            </p>
          </div>

          {/* 6 — CTA */}
          <div className="js-cta">
            <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onApply}
                className="group inline-flex items-center gap-3 bg-accent px-8 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-colors duration-200 hover:bg-white active:scale-[0.98] sm:px-9 sm:text-sm"
              >
                Apply Now
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <a
                href={IG_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-white/15 px-5 py-4 text-[12px] font-semibold tracking-wide text-white/70 transition-colors duration-200 hover:border-white/35 hover:text-white sm:text-[13px]"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" />
                @icona.talents
              </a>
            </div>

            <p className="max-w-[42ch] text-[12px] leading-relaxed text-white/40 sm:text-[13px]">
              DM our main page{' '}
              <a
                href={IG_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-white"
              >
                <InstagramIcon className="h-3 w-3" />
                @icona.talents
              </a>{' '}
              and the team will show you the strategy they&apos;d build specifically for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
