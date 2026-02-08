'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

// Company monogram component for logo placeholder
function CompanyMonogram({ name }: { name: string }) {
    // Get first 2 letters or initials
    const getInitials = (companyName: string) => {
        const words = companyName.split(' ');
        if (words.length >= 2) {
            return words[0][0] + words[1][0];
        }
        return companyName.substring(0, 2).toUpperCase();
    };

    return (
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-primary">
                {getInitials(name)}
            </span>
        </div>
    );
}

// 5-star rating component
function StarRating() {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const { t } = useTranslation();

    return (
        <section id="testimonials" className="py-24 lg:py-32">
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
                        {t.testimonials.title}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.testimonials.subtitle}
                    </p>
                </motion.div>

                {/* First 3 Testimonial Cards - Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t.testimonials.items.slice(0, 3).map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group bg-background rounded-xl border border-white/5 p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {/* Top row: Company + Rating */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <CompanyMonogram name={testimonial.company} />
                                    <span className="font-medium text-sm text-foreground">
                                        {testimonial.company}
                                    </span>
                                </div>
                                <StarRating />
                            </div>

                            {/* Company descriptor */}
                            <p className="text-xs text-muted-foreground/70 mb-3">
                                {testimonial.industry}
                            </p>

                            {/* Quote */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                "{testimonial.quote}"
                            </p>

                            {/* Metric chip */}
                            {testimonial.chip && (
                                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="text-xs font-medium text-primary">
                                        {testimonial.chip}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Last 2 Testimonial Cards - Centered */}
                <div className="grid md:grid-cols-2 gap-6 mt-6 lg:flex lg:justify-center lg:gap-6">
                    {t.testimonials.items.slice(3).map((testimonial, i) => (
                        <motion.div
                            key={i + 3}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                            className="group bg-background rounded-xl border border-white/5 p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 lg:w-[calc((100%-1.5rem*2)/3)]"
                        >
                            {/* Top row: Company + Rating */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <CompanyMonogram name={testimonial.company} />
                                    <span className="font-medium text-sm text-foreground">
                                        {testimonial.company}
                                    </span>
                                </div>
                                <StarRating />
                            </div>

                            {/* Company descriptor */}
                            <p className="text-xs text-muted-foreground/70 mb-3">
                                {testimonial.industry}
                            </p>

                            {/* Quote */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                "{testimonial.quote}"
                            </p>

                            {/* Metric chip */}
                            {testimonial.chip && (
                                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="text-xs font-medium text-primary">
                                        {testimonial.chip}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
