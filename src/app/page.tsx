'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ToolStack } from '@/components/ToolStack';
import { Solutions } from '@/components/Solutions';
import { ChooseFocus } from '@/components/ChooseFocus';
import { Process } from '@/components/Process';
import { Results } from '@/components/Results';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Testimonials } from '@/components/Testimonials';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { BlueprintModal } from '@/components/BlueprintModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedTrack, setPreselectedTrack] = useState<'operations' | 'revenue' | undefined>();

  const openModal = (track?: 'operations' | 'revenue') => {
    setPreselectedTrack(track);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={() => openModal()} />
      <ToolStack />
      <Solutions />
      <ChooseFocus onOpenModal={openModal} />
      <Process />
      <Results />
      <Pricing />
      <FAQ />
      <Testimonials />
      <FinalCTA onOpenModal={() => openModal()} />
      <Footer />

      <BlueprintModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedTrack={preselectedTrack}
      />
    </main>
  );
}
