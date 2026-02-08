'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Maximize2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExampleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    bullets?: string[];
    imageSrc?: string;
    imageAlt: string;
    videoSrc?: string;
    onCTAClick?: () => void;
    ctaLabel?: string;
}

export function ExampleModal({
    isOpen,
    onClose,
    title,
    subtitle,
    bullets,
    imageSrc,
    imageAlt,
    videoSrc,
    onCTAClick,
    ctaLabel = 'Solicitar Blueprint',
}: ExampleModalProps) {
    const isVideo = !!videoSrc;
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const expandButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Check for reduced motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Store the trigger element when modal opens
    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement as HTMLElement;
        }
    }, [isOpen]);

    // Reset expanded state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setIsExpanded(false);
        }
    }, [isOpen]);

    // Focus trap and ESC key handler
    useEffect(() => {
        if (!isOpen) return;

        // Focus the close button when modal opens
        setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 50);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isExpanded) {
                    setIsExpanded(false);
                    expandButtonRef.current?.focus();
                } else {
                    onClose();
                }
                return;
            }

            // Focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            // Return focus to trigger
            triggerRef.current?.focus();
        };
    }, [isOpen, isExpanded, onClose]);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                if (isExpanded) {
                    setIsExpanded(false);
                } else {
                    onClose();
                }
            }
        },
        [isExpanded, onClose]
    );

    const handleExpandClick = useCallback(() => {
        setIsExpanded(true);
    }, []);

    const handleCloseExpanded = useCallback(() => {
        setIsExpanded(false);
        expandButtonRef.current?.focus();
    }, []);

    const handleOpenInNewTab = useCallback(() => {
        window.open(imageSrc, '_blank');
    }, [imageSrc]);

    const motionConfig = prefersReducedMotion
        ? { initial: {}, animate: {}, exit: {} }
        : {
            backdrop: {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.15 },
            },
            modal: {
                initial: { opacity: 0, scale: 0.98 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.98 },
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
            },
        };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    onClick={handleBackdropClick}
                    {...(prefersReducedMotion ? {} : motionConfig.backdrop)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Expanded/Lightbox View */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                                exit={prefersReducedMotion ? {} : { opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={handleCloseExpanded}
                            >
                                <div className="absolute inset-0 bg-black/95" />

                                {/* Close button for lightbox */}
                                <button
                                    onClick={handleCloseExpanded}
                                    className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                    aria-label="Cerrar vista expandida"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Open in new tab button */}
                                <button
                                    onClick={handleOpenInNewTab}
                                    className="absolute top-4 right-16 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-2"
                                    aria-label="Abrir en nueva pestaña"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    <span className="text-sm hidden sm:inline">Abrir original</span>
                                </button>

                                {/* Expanded image - scrollable and pannable */}
                                <div
                                    className="relative max-w-[95vw] max-h-[90vh] overflow-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={imageSrc}
                                        alt={imageAlt}
                                        className="max-w-none w-auto h-auto"
                                        style={{ maxHeight: '90vh', objectFit: 'contain' }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        className="relative w-full max-w-[980px] max-h-[85vh] bg-surface rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        {...(prefersReducedMotion ? {} : motionConfig.modal)}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5">
                            <div>
                                <h2 id="modal-title" className="text-xl sm:text-2xl font-semibold text-foreground">
                                    {title}
                                </h2>
                                {subtitle && (
                                    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Close button */}
                                <button
                                    ref={closeButtonRef}
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                                    aria-label="Cerrar modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Media container */}
                            <div className="relative w-full rounded-xl border border-white/10 overflow-hidden bg-black/40">
                                {isVideo ? (
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto object-cover"
                                        aria-label={imageAlt}
                                    />
                                ) : imageSrc ? (
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt}
                                        width={1920}
                                        height={1080}
                                        className="w-full h-auto"
                                        loading="lazy"
                                        quality={100}
                                        unoptimized
                                        sizes="(max-width: 768px) 100vw, 950px"
                                    />
                                ) : null}
                            </div>

                            {/* Bullets */}
                            {bullets && bullets.length > 0 && (
                                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                                    {bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-white/5">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="border-white/20 hover:bg-white/5"
                            >
                                Cerrar
                            </Button>
                            {onCTAClick && (
                                <Button
                                    onClick={onCTAClick}
                                    className="bg-primary hover:bg-primary/90 text-white gap-2"
                                >
                                    {ctaLabel}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
