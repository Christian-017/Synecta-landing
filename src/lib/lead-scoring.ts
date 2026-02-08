import { QuestionnaireAnswers } from './supabase';

export function calculateLeadScore(answers: QuestionnaireAnswers): number {
    let score = 0;

    // Company size: 21-200 employees is ideal
    if (answers.volume === '51–200' || answers.volume === '200+') {
        score += 2;
    }

    // Urgency: within 4 weeks is hot
    if (answers.urgency === 'Esta semana' || answers.urgency === 'This week' ||
        answers.urgency === '2–4 semanas' || answers.urgency === '2–4 weeks') {
        score += 2;
    }

    // Budget: >= 5k is serious
    if (answers.budget === '5.000–10.000€' || answers.budget === '€5,000–10,000' ||
        answers.budget === '10.000–25.000€' || answers.budget === '€10,000–25,000' ||
        answers.budget === '25.000€+' || answers.budget === '€25,000+') {
        score += 3;
    }

    // Maintenance interest shows long-term potential
    if (answers.maintenance === 'Sí, quiero que lo gestionéis' ||
        answers.maintenance === 'Yes, I want you to manage it') {
        score += 2;
    }

    // High volume = real need
    if (answers.volume === '51–200' || answers.volume === '200+') {
        score += 2;
    }

    // Multiple pain points = complex opportunity
    if (answers.tasks && answers.tasks.length >= 3) {
        score += 1;
    }

    // GDPR requirements show enterprise readiness
    if (answers.constraints && answers.constraints.length >= 2) {
        score += 1;
    }

    return score;
}

export function getLeadQualification(score: number): 'hot' | 'warm' | 'cold' {
    if (score >= 8) return 'hot';
    if (score >= 4) return 'warm';
    return 'cold';
}
