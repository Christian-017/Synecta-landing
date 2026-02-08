import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for API routes only)
export function createServerClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If service role key is not configured, fall back to anon key
    // This requires proper RLS policies to be set up
    if (!serviceRoleKey) {
        console.warn('SUPABASE_SERVICE_ROLE_KEY not configured, using anon key. Ensure RLS policies are configured correctly.');
        return createClient(supabaseUrl, supabaseAnonKey);
    }

    return createClient(supabaseUrl, serviceRoleKey);
}

// Types
export interface Lead {
    id: string;
    created_at: string;
    name: string;
    email: string;
    company: string | null;
    role: string | null;
    company_size: string | null;
    website: string | null;
    answers: QuestionnaireAnswers | null;
    lead_score: number;
    language: string;
    status: 'new' | 'qualified' | 'unqualified';
}

export interface QuestionnaireAnswers {
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
