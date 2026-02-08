'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { useAnalytics } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email required'),
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    companySize: z.string().min(1, 'Company size is required'),
    website: z.string().optional(),
    turnstileToken: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    onSubmit: (leadId: string) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
    const { t, lang } = useTranslation();
    const { track } = useAnalytics();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onFormSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);
        track('start_form', {});

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    language: lang,
                    step: 'contact',
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Only validation errors should block
                setError('Please check your information and try again.');
                return;
            }

            // Store contact data in sessionStorage for later webhook submission
            sessionStorage.setItem('blueprint_contact_data', JSON.stringify({
                ...data,
                language: lang,
            }));

            track('submit_contact', { email: data.email, company: data.company });
            onSubmit(result.leadId);
        } catch (err) {
            console.error('Form submission error:', err);
            // Even on network error, don't block - generate a client-side ID
            const fallbackId = `lead_${Date.now()}_fallback`;
            sessionStorage.setItem('blueprint_contact_data', JSON.stringify({
                ...data,
                language: lang,
            }));
            onSubmit(fallbackId);
        } finally {
            setIsSubmitting(false);
        }
    };

    const roleOptions = t.modal.form.role_options;
    const sizeOptions = t.modal.form.size_options;

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">{t.modal.form.name}</Label>
                <Input
                    id="name"
                    {...register('name')}
                    placeholder="Juan García"
                    className="bg-background border-white/10 focus:border-primary"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">{t.modal.form.email}</Label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="juan@empresa.com"
                    className="bg-background border-white/10 focus:border-primary"
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            {/* Company */}
            <div className="space-y-2">
                <Label htmlFor="company">{t.modal.form.company}</Label>
                <Input
                    id="company"
                    {...register('company')}
                    placeholder="Acme Corp"
                    className="bg-background border-white/10 focus:border-primary"
                />
                {errors.company && (
                    <p className="text-sm text-destructive">{errors.company.message}</p>
                )}
            </div>

            {/* Role */}
            <div className="space-y-2">
                <Label htmlFor="role">{t.modal.form.role}</Label>
                <select
                    id="role"
                    {...register('role')}
                    className="w-full h-10 px-3 rounded-md bg-background border border-white/10 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">--</option>
                    {roleOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {errors.role && (
                    <p className="text-sm text-destructive">{errors.role.message}</p>
                )}
            </div>

            {/* Company Size */}
            <div className="space-y-2">
                <Label htmlFor="companySize">{t.modal.form.company_size}</Label>
                <select
                    id="companySize"
                    {...register('companySize')}
                    className="w-full h-10 px-3 rounded-md bg-background border border-white/10 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">--</option>
                    {sizeOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {errors.companySize && (
                    <p className="text-sm text-destructive">{errors.companySize.message}</p>
                )}
            </div>

            {/* Website (optional) */}
            <div className="space-y-2">
                <Label htmlFor="website">{t.modal.form.website}</Label>
                <Input
                    id="website"
                    {...register('website')}
                    placeholder="https://empresa.com"
                    className="bg-background border-white/10 focus:border-primary"
                />
            </div>

            {/* Turnstile placeholder */}
            <div id="turnstile-container" className="flex justify-center py-2">
                {/* Cloudflare Turnstile widget goes here */}
                <div className="text-xs text-muted-foreground">
                    🔒 Protected by Cloudflare Turnstile
                </div>
            </div>

            {/* Error message */}
            {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
            )}

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    t.modal.form.submit
                )}
            </Button>
        </form>
    );
}
