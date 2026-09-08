import { ArrowRight } from 'lucide-react';

interface CloseCTAProps {
  onApply: () => void;
}

const IG_HREF = 'https://www.instagram.com/icona.talents/';
const IG_PATH =
  'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.055 1.265.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.055-1.645.07-4.859.07-3.203 0-3.585-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.646-.061-4.849 0-3.204.016-3.585.061-4.849.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.668c-3.405 0-6.162 2.76-6.162 6.162S8.595 18.333 12 18.333 18.166 15.577 18.166 12.172 15.405 5.828 12 5.828zM12 16c-2.156 0-3.908-1.751-3.908-3.908S9.844 8.184 12 8.184s3.908 1.751 3.908 3.908S14.156 16 12 16zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';

export function CloseCTA({ onApply }: CloseCTAProps) {
  return (
    <section className="relative border-t border-white/[0.07] bg-ink">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-14 lg:py-24">
        <div className="max-w-xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Next step
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            Serious potential
            <br />
            <span className="text-white/40">deserves a real plan.</span>
          </h2>
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/50 sm:text-base">
            Apply privately, or DM{' '}
            <a
              href={IG_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent transition-colors hover:text-white"
            >
              @icona.talents
            </a>{' '}
            and the team will show you the strategy they&apos;d build specifically for you.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 fill-current"
            >
              <path d={IG_PATH} />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
