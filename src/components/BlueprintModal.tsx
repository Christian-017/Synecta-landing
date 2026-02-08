'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ContactForm } from './ContactForm';
import { Questionnaire } from './Questionnaire';
import { Button } from '@/components/ui/button';
import { Calendar, RotateCcw, CheckCircle2 } from 'lucide-react';

interface BlueprintModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedTrack?: 'operations' | 'revenue';
}

type Step = 'contact' | 'questionnaire' | 'success';

export function BlueprintModal({ isOpen, onClose, preselectedTrack }: BlueprintModalProps) {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>('contact');
    const [leadId, setLeadId] = useState<string | null>(null);

    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '[[CALENDLY_URL]]';

    const handleContactSubmit = (newLeadId: string) => {
        setLeadId(newLeadId);
        setStep('questionnaire');
    };

    const handleQuestionnaireComplete = () => {
        setStep('success');
    };

    const handleReset = () => {
        setStep('contact');
        setLeadId(null);
    };

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setStep('contact');
            setLeadId(null);
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[rgba(11,18,32,0.92)] border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center">
                        {t.modal.title}
                    </DialogTitle>
                </DialogHeader>

                {/* Progress indicator */}
                {step !== 'success' && (
                    <div className="flex items-center justify-center gap-2 py-4">
                        <div
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${step === 'contact' ? 'bg-primary' : 'bg-primary/30'
                                }`}
                        />
                        <div className="w-8 h-0.5 bg-white/10" />
                        <div
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${step === 'questionnaire' ? 'bg-primary' : 'bg-primary/30'
                                }`}
                        />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {step === 'contact' && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-medium mb-4 text-center">
                                {t.modal.step1_title}
                            </h3>
                            <ContactForm onSubmit={handleContactSubmit} />
                        </motion.div>
                    )}

                    {step === 'questionnaire' && leadId && (
                        <motion.div
                            key="questionnaire"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-medium mb-4 text-center">
                                {t.modal.step2_title}
                            </h3>
                            <Questionnaire
                                leadId={leadId}
                                preselectedTrack={preselectedTrack}
                                onComplete={handleQuestionnaireComplete}
                            />
                        </motion.div>
                    )}

                    {step === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="py-8 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                            </div>

                            <h3 className="text-2xl font-bold mb-2">
                                {t.modal.success_title}
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                {t.modal.success_message}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    size="lg"
                                    asChild
                                    className="bg-primary hover:bg-primary/90 text-white glow-primary gap-2"
                                >
                                    <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                                        <Calendar className="w-5 h-5" />
                                        {t.modal.success_cta}
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="border-white/20 gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    {t.modal.success_alt}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
