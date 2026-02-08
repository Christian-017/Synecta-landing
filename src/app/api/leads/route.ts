import { NextRequest, NextResponse } from 'next/server';

// Simple UUID generator for client-side lead IDs
function generateLeadId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// POST: Create new lead (contact form)
// NOTE: No Supabase required. Data stored client-side until webhook is configured.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, role, companySize, website, language } = body;

        // Validate required fields
        if (!name || !email || !company || !role || !companySize) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate a client-side lead ID
        const leadId = generateLeadId();

        // Store in sessionStorage via response (client will handle)
        // For now, just return success with the lead ID
        const leadData = {
            id: leadId,
            name,
            email,
            company,
            role,
            company_size: companySize,
            website: website || null,
            language: language || 'es',
            status: 'new',
            created_at: new Date().toISOString(),
        };

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log('📝 Lead data (Step 1):', leadData);
        }

        return NextResponse.json({
            leadId,
            success: true
        });
    } catch (error) {
        console.error('API error:', error);

        // Even on error, return success to not block the funnel
        // Validation errors are the only blockers
        return NextResponse.json(
            { error: 'Invalid request format', type: 'validation' },
            { status: 400 }
        );
    }
}

// Questionnaire answer types
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

// Simple lead scoring function
function calculateLeadScore(answers: QuestionnaireAnswers): number {
    let score = 0;

    // Goal diversity
    if (answers.goal?.length >= 2) score += 2;

    // Urgency
    if (answers.urgency === 'Necesito resultados en 1-3 meses') score += 3;
    else if (answers.urgency === 'Necesito resultados en 3-6 meses') score += 2;

    // Budget
    if (answers.budget === 'Más de €50k/año') score += 3;
    else if (answers.budget === '€20-50k/año') score += 2;

    // Data readiness
    if (answers.dataReadiness === 'Tengo datos organizados y accesibles') score += 2;

    // Volume
    if (answers.volume === 'Más de 1000/mes') score += 2;
    else if (answers.volume === '100-1000/mes') score += 1;

    return Math.min(score, 10); // Cap at 10
}

// Submit to n8n webhook with retry logic
async function submitToWebhook(payload: any): Promise<boolean> {
    const webhookUrl = 'https://n8n.srv881242.hstgr.cloud/webhook/landing-page-Synecta';
    const maxAttempts = 3;
    const delays = [0, 500, 1500]; // No delay first attempt, then 500ms, then 1500ms

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Wait for backoff delay (except first attempt)
        if (delays[attempt] > 0) {
            await new Promise(resolve => setTimeout(resolve, delays[attempt]));
        }

        try {
            // 5-second timeout per attempt
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                // Success!
                if (process.env.NODE_ENV === 'development') {
                    console.log('✅ Webhook sent successfully:', payload);
                }
                return true;
            } else {
                // Non-2xx response
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`Webhook attempt ${attempt + 1} failed with status ${response.status}`);
                }
            }
        } catch (error) {
            // Timeout or network error
            if (process.env.NODE_ENV === 'development') {
                const errorName = (error as Error).name;
                if (errorName === 'AbortError') {
                    console.warn(`Webhook attempt ${attempt + 1} timed out after 5s`);
                } else {
                    console.warn(`Webhook attempt ${attempt + 1} failed:`, error);
                }
            }
        }
    }

    // All attempts failed - save to sessionStorage for potential retry
    if (typeof window !== 'undefined') {
        try {
            sessionStorage.setItem('synecta_blueprint_pending', JSON.stringify({
                payload,
                timestamp: new Date().toISOString(),
                attempts: maxAttempts,
            }));
        } catch (e) {
            // SessionStorage might be full or disabled
            console.error('Failed to save pending webhook data:', e);
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.error('❌ Webhook failed after all attempts. Saved to sessionStorage.');
    }

    // Still return true - never block the UI
    return true;
}

// PUT: Update lead with questionnaire answers
// NOTE: No Supabase required. Stores data client-side and prepares for webhook.
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { leadId, answers, language, contactData } = body as {
            leadId: string;
            answers: QuestionnaireAnswers;
            language: string;
            contactData?: any; // Optional contact info from step 1
        };

        if (!leadId || !answers) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate lead score
        const leadScore = calculateLeadScore(answers);

        // Parse UTM parameters from referer or pass them from client
        // For now, we'll accept them from the request or use empty strings
        const utm = body.utm || {
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: '',
        };

        // Format payload according to n8n webhook schema
        const webhookPayload = {
            source: 'synecta_landing_blueprint',
            timestamp: new Date().toISOString(),
            page_url: body.page_url || '',
            locale: language || 'es',
            utm,
            lead: {
                full_name: contactData?.name || '',
                email: contactData?.email || '',
                company: contactData?.company || '',
                role: contactData?.role || '',
                company_size: contactData?.companySize || '',
                website: contactData?.website || '',
            },
            answers: {
                // Map questionnaire answers to key/value pairs
                goal: answers.goal,
                area: answers.area,
                tasks: answers.tasks,
                volume: answers.volume,
                channels: answers.channels,
                tools: answers.tools,
                data_readiness: answers.dataReadiness,
                constraints: answers.constraints,
                urgency: answers.urgency,
                budget: answers.budget,
                maintenance: answers.maintenance,
                bottleneck: answers.bottleneck || '',
                example: answers.example || '',
                success: answers.success || '',
            },
            meta: {
                user_agent: body.user_agent || '',
                lead_score: leadScore,
                status: leadScore >= 6 ? 'qualified' : 'new',
            },
        };

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log('📤 Sending to n8n webhook:', webhookPayload);
        }

        // Attempt webhook submission (with retry logic, non-blocking)
        await submitToWebhook(webhookPayload);

        return NextResponse.json({
            success: true,
            leadScore,
            message: 'Questionnaire completed successfully'
        });
    } catch (error) {
        console.error('API error:', error);

        // Don't block on errors - always return success for smooth UX
        return NextResponse.json(
            { success: true, leadScore: 5 },
            { status: 200 }
        );
    }
}
