'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Fingerprint } from 'lucide-react';

interface HeroProps {
    onOpenModal: () => void;
}

// Token types for headline parsing
type HeadlineToken =
    | { type: 'word'; value: string }
    | { type: 'fingerprint' };

// Colors
const MUTED_COLOR = 'rgba(255, 255, 255, 0.35)';
const ACTIVE_COLOR = '#F5F7FA';
const FINGERPRINT_BLUE = '#1C5D99'; // Same as --synecta-primary / CTA button

// Scroll thresholds for each step (in pixels)
// Steps: 0=Decisión, 1=fingerprint, 2=humana, 3=+, 4=ejecución, 5=con, 6=IA
const SCROLL_THRESHOLDS = [0, 30, 60, 90, 120, 150, 180];

export function Hero({ onOpenModal }: HeroProps) {
    const { t, lang } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '[[CALENDLY_URL]]';

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Parse headline into tokens
    const parseHeadline = (headline: string): HeadlineToken[] => {
        const tokens: HeadlineToken[] = [];
        const parts = headline.split('[fingerprint]');

        parts.forEach((part, partIndex) => {
            const words = part.trim().split(' ').filter(w => w.length > 0);
            words.forEach(word => {
                tokens.push({ type: 'word', value: word });
            });
            // Add fingerprint between parts (not after last part)
            if (partIndex < parts.length - 1) {
                tokens.push({ type: 'fingerprint' });
            }
        });

        return tokens;
    };

    const headlineTokens = parseHeadline(t.hero.headline);

    // Scroll handler for step calculation
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        // Determine which step we're at based on scroll position
        let step = 0;
        for (let i = SCROLL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (scrollY >= SCROLL_THRESHOLDS[i]) {
                step = i;
                break;
            }
        }

        setActiveStep(step);
    }, []);

    // Add scroll listener
    useEffect(() => {
        // Set initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // If reduced motion, show all words as active
    useEffect(() => {
        if (prefersReducedMotion) {
            setActiveStep(6); // All elements active (including IA)
        }
    }, [prefersReducedMotion]);

    // Helper to get color for each element based on active step
    // Element indices: 0=Decisión, 1=fingerprint, 2=humana, 3=+, 4=ejecución, 5=con, 6=IA
    const getElementStyle = (elementIndex: number, isFingerprint: boolean = false) => {
        const isActive = elementIndex <= activeStep;

        const baseStyle = {
            transition: prefersReducedMotion ? 'none' : 'color 150ms ease-out',
        };

        if (elementIndex === 0) {
            // "Decisión" is always white
            return { ...baseStyle, color: ACTIVE_COLOR };
        }

        if (isFingerprint) {
            // Fingerprint: muted grey → brand blue
            return { ...baseStyle, color: isActive ? FINGERPRINT_BLUE : MUTED_COLOR };
        }

        // Regular words: muted grey → white
        return { ...baseStyle, color: isActive ? ACTIVE_COLOR : MUTED_COLOR };
    };

    // Map tokens to element indices
    // Expected structure: Decisión [fingerprint] humana + ejecución con IA
    // Indices:            0        1            2      3 4         5
    let elementIndex = 0;

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Ghost text */}
                <div className="ghost-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
                    SYNECTA
                </div>

                {/* Gradient orb */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full gradient-radial opacity-20 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center pt-20 sm:pt-24">
                {/* Headline with scroll-driven activation */}
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-8"
                >
                    {headlineTokens.map((token, i) => {
                        // Track element index for styling
                        const currentElementIndex = elementIndex;

                        // Check if this is the "+" token and next is "ejecución" - wrap together
                        const nextToken = headlineTokens[i + 1];
                        const isPlus = token.type === 'word' && token.value === '+';
                        const prevToken = headlineTokens[i - 1];
                        const isPrevPlus = prevToken?.type === 'word' && prevToken.value === '+';

                        // Skip rendering if previous was + (we rendered it in the nowrap group)
                        if (isPrevPlus && token.type === 'word') {
                            return null;
                        }

                        // Render + with next word in nowrap span
                        if (isPlus && nextToken?.type === 'word') {
                            const plusIndex = elementIndex;
                            elementIndex++;
                            const nextWordIndex = elementIndex;
                            elementIndex++;

                            return (
                                <span key={`group-${i}`} className="inline-block whitespace-nowrap">
                                    <span
                                        className="inline-block mr-[0.2em]"
                                        style={getElementStyle(plusIndex)}
                                    >
                                        +
                                    </span>
                                    <span
                                        className="inline-block mr-[0.25em]"
                                        style={getElementStyle(nextWordIndex)}
                                    >
                                        {nextToken.value}
                                    </span>
                                </span>
                            );
                        }

                        if (token.type === 'fingerprint') {
                            const fpIndex = elementIndex;
                            elementIndex++;

                            return (
                                <span
                                    key={`fingerprint-${i}`}
                                    className="inline-flex items-center justify-center mr-[0.25em] align-baseline"
                                    style={getElementStyle(fpIndex, true)}
                                >
                                    <Fingerprint
                                        className="w-[0.85em] h-[0.85em] inline-block"
                                        strokeWidth={1.5}
                                        aria-label="huella"
                                        style={{ color: 'inherit' }}
                                    />
                                </span>
                            );
                        }

                        const wordIndex = elementIndex;
                        elementIndex++;

                        return (
                            <span
                                key={`${lang}-${i}`}
                                className="inline-block mr-[0.25em]"
                                style={getElementStyle(wordIndex)}
                            >
                                {token.value}
                            </span>
                        );
                    })}
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
                >
                    {t.hero.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
                >
                    <Button
                        size="lg"
                        onClick={onOpenModal}
                        className="bg-primary hover:bg-primary/90 text-white glow-primary text-lg px-8 py-6 gap-2"
                    >
                        {t.hero.cta_primary}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="border-white/20 hover:bg-white/5 text-lg px-8 py-6 gap-2"
                    >
                        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                            <Calendar className="w-5 h-5" />
                            {t.hero.cta_secondary}
                        </a>
                    </Button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-sm text-muted-foreground"
                >
                    {t.hero.trust_line}
                </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
