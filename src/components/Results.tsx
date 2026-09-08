export function Results() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-ink-raised">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20 lg:px-14 lg:py-24">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            Proof
          </p>
          <h2 className="mb-5 font-display text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            From side income
            <br />
            <span className="text-accent">to a real month.</span>
          </h2>
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-white/50 sm:text-base">
            One of our newest creators was generating around $100 per month before joining. In her
            first full month with the team she hit $30k in revenue. All of our results can be
            verified directly.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10 lg:flex-col lg:items-start lg:gap-8">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Before
            </p>
            <p className="font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-white/35 sm:text-[2.75rem]">
              $100
              <span className="ml-1.5 text-[13px] font-semibold tracking-normal text-white/25">
                /mo
              </span>
            </p>
          </div>

          <span
            aria-hidden="true"
            className="hidden text-accent sm:mb-2 sm:block lg:hidden font-display text-xl"
          >
            →
          </span>

          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/80">
              First full month
            </p>
            <p className="font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-accent sm:text-[2.75rem]">
              $30k
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
              300× · verified on request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
