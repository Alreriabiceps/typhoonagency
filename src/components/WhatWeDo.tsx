const SERVICES = [
  {
    title: 'Traffic',
    body: 'Promo and acquisition that points fans to your paid page — not empty vanity metrics.',
  },
  {
    title: 'Content strategy',
    body: 'What to post, when to post, and how to package offers so the page compounds.',
  },
  {
    title: 'Chatting',
    body: 'Inbox handled end-to-end so conversations convert while you stay offline.',
  },
  {
    title: 'Retention',
    body: 'Keep paying fans engaged and renewing — the quiet work that protects revenue.',
  },
];

export function WhatWeDo() {
  return (
    <section className="relative border-t border-white/[0.07] bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div className="mb-12 max-w-xl sm:mb-16">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            What we handle
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.75rem,3.5vw,2.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            You make the content.{' '}
            <span className="text-white/40">We run the rest.</span>
          </h2>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-white/50 sm:text-base">
            Full OnlyFans management for creators who want their page to pay like a business —
            without living in DMs and analytics all day.
          </p>
        </div>

        <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="group border-t border-white/10 py-7 sm:border-t-0 sm:border-l sm:border-white/10 sm:px-6 sm:py-0 lg:px-8 first:sm:border-l-0 first:sm:pl-0"
            >
              <span className="mb-4 block font-display text-[11px] font-bold tracking-[0.2em] text-accent/80">
                0{index + 1}
              </span>
              <h3 className="mb-2.5 font-display text-[1.05rem] font-bold uppercase tracking-[-0.02em] text-white sm:text-[1.15rem]">
                {service.title}
              </h3>
              <p className="max-w-[28ch] text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
                {service.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
