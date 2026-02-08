'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Bot, Workflow, Settings, ArrowRight } from 'lucide-react';
import { ExampleModal } from './ExampleModal';
import { MaintenanceModal } from './MaintenanceModal';

const icons = [Bot, Workflow, Settings];

// Modal configuration for first two cards (image/video modals)
const modalConfig = [
    {
        videoSrc: '/examples/ai-operators-workflow.mp4',
        imageAlt: 'AI Operator workflow diagram',
        title: 'AI Operator en producción',
        subtitle: 'Decisión automática + ejecución + trazabilidad',
        bullets: ['Validación y routing', 'Fallback y control humano', 'Logs y alertas'],
    },
    {
        videoSrc: '/examples/automation-workflow.mp4',
        imageAlt: 'Automation workflow diagram',
        title: 'Automatización en producción',
        subtitle: 'Integraciones + consistencia + fiabilidad',
        bullets: ['Integraciones y sincronización', 'Reintentos y tolerancia a fallos', 'Auditoría y trazabilidad'],
    },
];

interface SolutionsProps {
    onOpenBlueprintModal?: () => void;
}

export function Solutions({ onOpenBlueprintModal }: SolutionsProps) {
    const { t } = useTranslation();
    const [activeModal, setActiveModal] = useState<number | null>(null);

    const handleOpenModal = useCallback((index: number) => {
        setActiveModal(index);
    }, []);

    const handleCloseModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    const handleCTAClick = useCallback(() => {
        handleCloseModal();
        // Scroll to blueprint section or open modal
        if (onOpenBlueprintModal) {
            onOpenBlueprintModal();
        } else {
            const blueprintSection = document.getElementById('blueprint');
            if (blueprintSection) {
                blueprintSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [handleCloseModal, onOpenBlueprintModal]);

    return (
        <>
            <section id="solutions" className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            {t.solutions.title}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t.solutions.subtitle}
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {t.solutions.cards.map((card, i) => {
                            const Icon = icons[i];

                            return (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group relative bg-surface rounded-2xl border border-white/5 p-8 hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Glow on hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative">
                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-sm mb-6">
                                            {card.description}
                                        </p>

                                        {/* Bullets */}
                                        <ul className="space-y-3 mb-6">
                                            {card.bullets.map((bullet, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA - All cards now open modals */}
                                        <button
                                            onClick={() => handleOpenModal(i)}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                                        >
                                            {card.cta}
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Video Modals (first two cards) */}
            {modalConfig.map((config, i) => (
                <ExampleModal
                    key={i}
                    isOpen={activeModal === i}
                    onClose={handleCloseModal}
                    title={config.title}
                    subtitle={config.subtitle}
                    bullets={config.bullets}
                    videoSrc={config.videoSrc}
                    imageAlt={config.imageAlt}
                    onCTAClick={handleCTAClick}
                    ctaLabel="Solicitar Blueprint"
                />
            ))}

            {/* Text-only Modal (third card) */}
            <MaintenanceModal
                isOpen={activeModal === 2}
                onClose={handleCloseModal}
                onCTAClick={handleCTAClick}
                ctaLabel="Solicitar Blueprint"
            />
        </>
    );
}
