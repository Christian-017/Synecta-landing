'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { FileSearch, Hammer, Settings2 } from 'lucide-react';

const stepIcons = [FileSearch, Hammer, Settings2];

export function Process() {
    const { t } = useTranslation();

    return (
        <section id="process" className="py-24 lg:py-32">
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
                        {t.process.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.process.subtitle}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {t.process.steps.map((step, i) => {
                            const Icon = stepIcons[i];
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className="relative"
                                >
                                    {/* Step card */}
                                    <div className="relative bg-surface rounded-2xl border border-white/5 p-8 text-center lg:text-left">
                                        {/* Number badge - on top for desktop */}
                                        <div className="lg:absolute lg:-top-6 lg:left-1/2 lg:-translate-x-1/2 flex justify-center lg:justify-start mb-6 lg:mb-0">
                                            <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                                <span className="text-primary font-bold">{step.number}</span>
                                            </div>
                                        </div>

                                        <div className="lg:pt-8">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto lg:mx-0 mb-4">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

                                            {/* Description */}
                                            <p className="text-muted-foreground text-sm">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Delivery time */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
                        ⚡ {t.process.delivery}
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
