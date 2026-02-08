'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCTAClick?: () => void;
    ctaLabel?: string;
}

export function MaintenanceModal({
    isOpen,
    onClose,
    onCTAClick,
    ctaLabel = 'Solicitar Blueprint',
}: TextModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

    // Focus trap and ESC key handler
    useEffect(() => {
        if (!isOpen) return;

        setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 50);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

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
            triggerRef.current?.focus();
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose]
    );

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

    const bullets = [
        'Monitorización activa y alertas proactivas',
        'Detección de anomalías antes de impacto',
        'Optimización periódica de costes y rendimiento',
        'Soporte prioritario ante incidencias',
        'Trazabilidad y control de cambios',
    ];

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

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        className="relative w-full max-w-[640px] max-h-[85vh] bg-surface rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        {...(prefersReducedMotion ? {} : motionConfig.modal)}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5">
                            <h2 id="modal-title" className="text-xl sm:text-2xl font-semibold text-foreground">
                                Mantenimiento & Optimización
                            </h2>
                            <button
                                ref={closeButtonRef}
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Opening copy */}
                            <p className="text-lg text-foreground leading-relaxed mb-4">
                                Los sistemas no se rompen. Se supervisan.
                            </p>
                            <p className="text-muted-foreground mb-8">
                                Operamos una capa continua de control que garantiza que los sistemas sigan funcionando, incluso cuando el negocio cambia.
                            </p>

                            {/* Bullets */}
                            <ul className="space-y-3 mb-8">
                                {bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Closing emphasis */}
                            <div className="border-t border-white/5 pt-6">
                                <p className="text-foreground font-medium mb-2">
                                    No reaccionamos a errores.<br />
                                    Evitamos que ocurran.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Eso es lo que mantiene un sistema en producción.
                                </p>
                            </div>
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
