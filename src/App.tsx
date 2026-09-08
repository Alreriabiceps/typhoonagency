import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { WhatWeDo } from './components/WhatWeDo';
import { Results } from './components/Results';
import { CloseCTA } from './components/CloseCTA';
import { ApplicationModal } from './components/ApplicationModal';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const openApply = useCallback(() => setIsApplyOpen(true), []);
  const closeApply = useCallback(() => setIsApplyOpen(false), []);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-ink text-white">
      <Header onApply={openApply} />

      <main className="flex flex-1 flex-col">
        <Hero onApply={openApply} />
        <CredibilityStrip />
        <WhatWeDo />
        <Results />
        <CloseCTA onApply={openApply} />
      </main>

      <ApplicationModal isOpen={isApplyOpen} onClose={closeApply} />
    </div>
  );
}
