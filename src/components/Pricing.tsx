'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Check, Info } from 'lucide-react';

export function Pricing() {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        {t.pricing.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.pricing.subtitle}
                    </p>
                </motion.div>

                {/* Pricing Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-surface rounded-3xl border border-white/5 divide-y divide-white/5"
                >
                    {t.pricing.items.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 lg:p-8 gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-foreground font-medium">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2 pl-11 sm:pl-0">
                                <span className="text-xl font-bold text-primary">{item.value}</span>
                                {item.note && (
                                    <span className="text-sm text-muted-foreground">{item.note}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                    <Info className="w-4 h-4" />
                    <span>{t.pricing.note}</span>
                </motion.div>
            </div>
        </section>
    );
}
