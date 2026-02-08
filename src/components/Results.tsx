'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

function AnimatedNumber({ value, duration = 2 }: { value: string; duration?: number }) {
    const [displayed, setDisplayed] = useState('0');
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        // Extract numeric part
        const numMatch = value.match(/(\d+)/);
        if (!numMatch) {
            setDisplayed(value);
            return;
        }

        const targetNum = parseInt(numMatch[1], 10);
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * targetNum);

            setDisplayed(value.replace(numMatch[1], current.toString()));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return <span ref={ref}>{displayed}</span>;
}

export function Results() {
    const { t } = useTranslation();

    return (
        <section id="results" className="py-24 lg:py-32 bg-surface">
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
                        {t.results.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.results.subtitle}
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {t.results.metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative bg-background rounded-2xl border border-white/5 p-8 text-center overflow-hidden group"
                        >
                            {/* Subtle glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative">
                                {/* Value */}
                                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                                    <AnimatedNumber value={metric.value} />
                                    {metric.unit && (
                                        <span className="text-lg lg:text-xl font-normal text-muted-foreground ml-2">
                                            {metric.unit}
                                        </span>
                                    )}
                                </div>

                                {/* Label */}
                                <p className="text-muted-foreground">{metric.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-sm text-muted-foreground/70"
                >
                    * {t.results.disclaimer}
                </motion.p>
            </div>
        </section>
    );
}
