'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Cog, TrendingUp, ArrowRight } from 'lucide-react';

interface ChooseFocusProps {
    onOpenModal: (track: 'operations' | 'revenue') => void;
}

export function ChooseFocus({ onOpenModal }: ChooseFocusProps) {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32 bg-surface">
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
                        {t.focus.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.focus.subtitle}
                    </p>
                </motion.div>

                {/* Two Large Cards */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Operations Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group bg-background rounded-3xl border border-white/10 p-8 lg:p-10 overflow-hidden hover:border-primary/40 transition-all duration-300"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Cog className="w-7 h-7 text-primary" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                                {t.focus.operations.title}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {t.focus.operations.description}
                            </p>

                            {/* Bullets */}
                            <ul className="space-y-3 mb-8">
                                {t.focus.operations.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-foreground">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                onClick={() => onOpenModal('operations')}
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-white gap-2"
                            >
                                {t.focus.operations.cta}
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Revenue Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative group bg-background rounded-3xl border border-white/10 p-8 lg:p-10 overflow-hidden hover:border-secondary/40 transition-all duration-300"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                                <TrendingUp className="w-7 h-7 text-secondary" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                                {t.focus.revenue.title}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {t.focus.revenue.description}
                            </p>

                            {/* Bullets */}
                            <ul className="space-y-3 mb-8">
                                {t.focus.revenue.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
                                        <span className="text-foreground">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                onClick={() => onOpenModal('revenue')}
                                size="lg"
                                className="bg-secondary hover:bg-secondary/90 text-white gap-2"
                            >
                                {t.focus.revenue.cta}
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
