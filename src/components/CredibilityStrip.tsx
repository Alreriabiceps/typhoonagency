const PILLARS = ['Growth', 'Management', 'Content', 'Support'];

export function CredibilityStrip() {
  return (
    <div className="relative z-20 shrink-0 border-t border-white/[0.07] bg-ink/60 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:px-10 sm:py-5 lg:px-14">
        <ul className="flex flex-1 items-center justify-between gap-3 sm:justify-start sm:gap-0">
          {PILLARS.map((pillar, index) => (
            <li key={pillar} className="js-strip-item flex items-center sm:flex-none">
              {index > 0 && (
                <span aria-hidden="true" className="mx-4 hidden h-1 w-1 rounded-full bg-white/20 sm:block lg:mx-7" />
              )}
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45 sm:text-[11px] sm:tracking-[0.28em]">
                {pillar}
              </span>
            </li>
          ))}
        </ul>

        <p className="js-strip-item hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/25 lg:block">
          Now accepting applications
        </p>
      </div>
    </div>
  );
}
