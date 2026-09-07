const ITEMS = [
  {
    title: 'Fan chat',
    body: 'We handle the inbox so conversations keep converting while you stay offline.',
  },
  {
    title: 'Account ops',
    body: 'Posting cadence, page setup, and the day-to-day work that usually eats your week.',
  },
  {
    title: 'Growth',
    body: 'Promo and traffic that point to paid pages — not empty follower counts.',
  },
];

export function WhatWeDo() {
  return (
    <section className="relative z-10 bg-ink">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-6 sm:px-10 sm:pb-20 sm:pt-8 lg:px-14 lg:pb-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            What we actually do
          </p>
          <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            You make the content.{' '}
            <span className="text-white/40">We run the rest.</span>
          </h2>
          <p className="mb-10 max-w-[42ch] text-[15px] leading-relaxed text-white/50 sm:mb-12 sm:text-base">
            Typhoon is a small management shop for models who want their page to pay like a
            business — without living in DMs and analytics all day.
          </p>

          <ul className="space-y-7 sm:space-y-8">
            {ITEMS.map((item) => (
              <li key={item.title} className="max-w-xl">
                <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.18em] text-white">
                  {item.title}
                </span>
                <p className="text-[15px] leading-relaxed text-white/50 sm:text-base">{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-xl text-[13px] leading-relaxed text-white/35 sm:mt-14 sm:text-sm">
            Small roster. Applications are private and reviewed by hand — if it&apos;s not a fit,
            we&apos;ll say so.
          </p>
        </div>
      </div>
    </section>
  );
}
