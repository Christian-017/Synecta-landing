'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
    onOpenModal: () => void;
}

export function FinalCTA({ onOpenModal }: FinalCTAProps) {
    const { t } = useTranslation();

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full gradient-radial opacity-30 blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        {t.cta_final.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                        {t.cta_final.subtitle}
                    </p>

                    <Button
                        size="lg"
                        onClick={onOpenModal}
                        className="bg-primary hover:bg-primary/90 text-white glow-primary text-lg px-10 py-6 gap-2"
                    >
                        {t.cta_final.button}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
