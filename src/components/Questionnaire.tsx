'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAnalytics } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
// Questionnaire answer types (local definition)
interface QuestionnaireAnswers {
    goal: string[];
    area: string;
    tasks: string[];
    volume: string;
    channels: string[];
    tools: string[];
    dataReadiness: string;
    constraints: string[];
    urgency: string;
    budget: string;
    maintenance: string;
    bottleneck?: string;
    example?: string;
    success?: string;
}

interface QuestionnaireProps {
    leadId: string;
    preselectedTrack?: 'operations' | 'revenue';
    onComplete: () => void;
}

type QuestionType = 'single' | 'multi' | 'text';

interface Question {
    id: string;
    type: QuestionType;
    maxSelect?: number;
}

const questions: Question[] = [
    { id: 'q1', type: 'multi', maxSelect: 2 },
    { id: 'q2', type: 'single' },
    { id: 'q3', type: 'multi' },
    { id: 'q4', type: 'single' },
    { id: 'q5', type: 'multi' },
    { id: 'q6', type: 'multi' },
    { id: 'q7', type: 'single' },
    { id: 'q8', type: 'multi' },
    { id: 'q9', type: 'single' },
    { id: 'q10', type: 'single' },
    { id: 'q11', type: 'single' },
    { id: 'text1', type: 'text' },
    { id: 'text2', type: 'text' },
    { id: 'text3', type: 'text' },
];

export function Questionnaire({ leadId, preselectedTrack, onComplete }: QuestionnaireProps) {
    const { t, lang } = useTranslation();
    const { track } = useAnalytics();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalSteps = questions.length;
    const currentQuestion = questions[currentStep];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quizData = t.modal.quiz as any;
    const questionData = quizData[currentQuestion.id] as { title: string; options?: string[]; placeholder?: string };
    const submitLabel = quizData.submit as string;

    const handleSelect = (value: string) => {
        if (currentQuestion.type === 'single') {
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
        } else if (currentQuestion.type === 'multi') {
            const current = (answers[currentQuestion.id] as string[]) || [];
            const maxSelect = currentQuestion.maxSelect;

            if (current.includes(value)) {
                setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: current.filter((v) => v !== value),
                }));
            } else {
                if (maxSelect && current.length >= maxSelect) {
                    // Replace oldest selection
                    setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: [...current.slice(1), value],
                    }));
                } else {
                    setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: [...current, value],
                    }));
                }
            }
        }
    };

    const handleTextChange = (value: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    };

    const canProceed = () => {
        const answer = answers[currentQuestion.id];
        if (currentQuestion.type === 'text') return true; // Text fields are optional
        if (!answer) return false;
        if (Array.isArray(answer) && answer.length === 0) return false;
        return true;
    };

    const goNext = () => {
        track('quiz_step', { step: currentStep, questionId: currentQuestion.id });
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goPrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        track('start_quiz', {});

        try {
            const formattedAnswers: QuestionnaireAnswers = {
                goal: (answers.q1 as string[]) || [],
                area: (answers.q2 as string) || '',
                tasks: (answers.q3 as string[]) || [],
                volume: (answers.q4 as string) || '',
                channels: (answers.q5 as string[]) || [],
                tools: (answers.q6 as string[]) || [],
                dataReadiness: (answers.q7 as string) || '',
                constraints: (answers.q8 as string[]) || [],
                urgency: (answers.q9 as string) || '',
                budget: (answers.q10 as string) || '',
                maintenance: (answers.q11 as string) || '',
                bottleneck: (answers.text1 as string) || undefined,
                example: (answers.text2 as string) || undefined,
                success: (answers.text3 as string) || undefined,
            };

            // Retrieve contact data from sessionStorage
            const contactDataStr = sessionStorage.getItem('blueprint_contact_data');
            const contactData = contactDataStr ? JSON.parse(contactDataStr) : null;

            // Extract UTM parameters from URL
            const urlParams = new URLSearchParams(window.location.search);
            const utm = {
                utm_source: urlParams.get('utm_source') || '',
                utm_medium: urlParams.get('utm_medium') || '',
                utm_campaign: urlParams.get('utm_campaign') || '',
                utm_term: urlParams.get('utm_term') || '',
                utm_content: urlParams.get('utm_content') || '',
            };

            const response = await fetch('/api/leads', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leadId,
                    answers: formattedAnswers,
                    language: lang,
                    contactData, // Include contact data for complete payload
                    utm, // Include UTM parameters
                    page_url: window.location.href,
                    user_agent: navigator.userAgent,
                }),
            });

            const result = await response.json();

            // Always proceed to completion, even if response wasn't ok
            // Data is logged on server side for webhook integration later
            track('quiz_complete', { leadScore: result.leadScore || 5 });

            // Store complete data in sessionStorage as backup
            sessionStorage.setItem('blueprint_complete_data', JSON.stringify({
                leadId,
                contactData,
                answers: formattedAnswers,
                timestamp: new Date().toISOString(),
            }));

            onComplete();
        } catch (err) {
            console.error('Questionnaire submission error:', err);
            // Don't block - still proceed to success screen
            track('quiz_complete_offline', {});
            onComplete();
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div>
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{currentStep + 1} / {totalSteps}</span>
                    <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
            >
                {/* Question title */}
                <h4 className="text-lg font-medium mb-4">{questionData.title}</h4>

                {/* Options or Text input */}
                {currentQuestion.type === 'text' ? (
                    <Textarea
                        value={(answers[currentQuestion.id] as string) || ''}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder={questionData.placeholder}
                        className="bg-background border-white/10 focus:border-primary min-h-[100px]"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {questionData.options?.map((option) => {
                            const isSelected =
                                currentQuestion.type === 'single'
                                    ? answers[currentQuestion.id] === option
                                    : ((answers[currentQuestion.id] as string[]) || []).includes(option);

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`px-4 py-3 text-left text-sm rounded-lg border transition-all ${isSelected
                                        ? 'border-primary bg-primary/10 text-foreground'
                                        : 'border-white/10 bg-background hover:border-white/20 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Max select hint */}
                {currentQuestion.maxSelect && (
                    <p className="text-xs text-muted-foreground mt-2">
                        (max. {currentQuestion.maxSelect})
                    </p>
                )}
            </motion.div>

            {/* Error */}
            {error && (
                <p className="text-sm text-destructive text-center mt-4">{error}</p>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
                <Button
                    variant="outline"
                    onClick={goPrev}
                    disabled={currentStep === 0}
                    className="border-white/20"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                </Button>

                {isLastStep ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={goNext}
                        disabled={!canProceed()}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                )}
            </div>
        </div>
    );
}
