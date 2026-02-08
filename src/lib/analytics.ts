'use client';

type EventName =
    | 'start_form'
    | 'submit_contact'
    | 'start_quiz'
    | 'quiz_step'
    | 'quiz_complete'
    | 'quiz_complete_offline'
    | 'calendly_click'
    | 'language_switch'
    | 'nav_click'
    | 'cta_click';

interface EventData {
    [key: string]: string | number | boolean | undefined;
}

// Flexible analytics hook that can be connected to any provider
export function useAnalytics() {
    const track = (eventName: EventName, data?: EventData) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${eventName}`, data);
        }

        // Push to dataLayer for GTM (if exists)
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: eventName,
                ...data,
            });
        }

        // Placeholder for other analytics providers
        // Example: Segment, Mixpanel, Amplitude, etc.
        // if (typeof window !== 'undefined' && (window as any).analytics) {
        //   (window as any).analytics.track(eventName, data);
        // }
    };

    return { track };
}

// Pre-defined tracking functions
export function trackFormStart() {
    return { event: 'start_form' as const };
}

export function trackContactSubmit(data: { email: string; company?: string }) {
    return { event: 'submit_contact' as const, ...data };
}

export function trackQuizStart() {
    return { event: 'start_quiz' as const };
}

export function trackQuizStep(step: number, questionId: string) {
    return { event: 'quiz_step' as const, step, questionId };
}

export function trackQuizComplete(leadScore: number) {
    return { event: 'quiz_complete' as const, leadScore };
}

export function trackCalendlyClick() {
    return { event: 'calendly_click' as const };
}
