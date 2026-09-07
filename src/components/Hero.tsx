import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onApply: () => void;
}

const PHOTO = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2';
const photoAt = (w: number) => `${PHOTO}?auto=format&fit=crop&crop=faces&w=${w}&q=75`;

const ALL_TARGETS = ['.js-brand', '.js-line', '.js-sub', '.js-cta', '.js-trust', '.js-media', '.js-strip-item'];

export function Hero({ onApply }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Not scoped to the hero: the intro also drives the header and the strip.
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        gsap.set(ALL_TARGETS, { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, clipPath: 'none' });
        return;
      }

      // Pre-animation state is applied before first paint, so nothing flashes.
      gsap.set('.js-brand', { autoAlpha: 0, y: -12 });
      gsap.set('.js-line', { yPercent: 108 });
      gsap.set(['.js-sub', '.js-cta', '.js-trust'], { autoAlpha: 0, y: 22 });
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
        .to('.js-line', { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out' }, 0.35)
        .to('.js-sub', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.85)
        .to('.js-cta', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.98)
        .to('.js-trust', { autoAlpha: 1, y: 0, duration: 0.8 }, 1.1)
        .to('.js-strip-item', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 1.05);
    });

    return () => ctx.revert();
  }, []);

  // Restrained pointer parallax — fine pointers only, never on touch.
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
      {/* Editorial portrait — full-bleed backdrop on mobile, right-hand column on desktop */}
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

        {/* Scrims that seat the photograph into the black ground */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink via-ink/55 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-ink to-transparent lg:block" />
      </div>

      {/* Atmospheric accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-accent opacity-[0.16] blur-[160px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-40 sm:px-10 sm:pb-14 sm:pt-52 lg:px-14 lg:py-16">
        <div className="max-w-[560px] lg:max-w-[700px]">
          <h1 className="mb-7 text-[clamp(2.2rem,9.2vw,4.3rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] text-white xl:text-[5.1rem]">
            <span className="line-mask block">
              <span className="js-line block whitespace-nowrap">Turn your</span>
            </span>
            <span className="line-mask block">
              <span className="js-line block whitespace-nowrap">content into</span>
            </span>
            <span className="line-mask block">
              <span className="js-line block whitespace-nowrap">
                a <span className="text-accent">business.</span>
              </span>
            </span>
          </h1>

          <p className="js-sub mb-9 max-w-[430px] text-[15px] leading-relaxed text-white/55 sm:text-base">
            Typhoon Agency helps creators grow, monetize, and build their personal brand.
          </p>

          <div className="js-cta">
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
          </div>

          <p className="js-trust mt-6 text-[9px] font-medium uppercase tracking-[0.16em] text-white/35 sm:text-[11px] sm:tracking-[0.22em]">
            18+ only <span className="mx-1.5 text-white/20">•</span> Private application
            <span className="mx-1.5 text-white/20">•</span> Creator-first
          </p>
        </div>
      </div>
    </section>
  );
}
