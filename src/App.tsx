import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyTyphoon } from './components/WhyTyphoon';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { LegalModal } from './components/LegalModal';
import { ModalType } from './types';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<ModalType>(null);

  // Initialize Lenis for smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col selection:bg-[#008FF2] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header onOpenApply={() => setIsApplyOpen(true)} />

      {/* Main Single-Page Content */}
      <main className="flex-grow flex flex-col justify-center">
        {/* Editorial Hero Section with GSAP Entrance & Portrait */}
        <Hero onOpenApply={() => setIsApplyOpen(true)} />

        {/* Compact 4 Benefits & Direct Application Trigger */}
        <WhyTyphoon onOpenApply={() => setIsApplyOpen(true)} />
      </main>

      {/* Minimal Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Creator Application Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      {/* Minimal Privacy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
