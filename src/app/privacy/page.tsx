'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import { LanguageToggle } from '@/components/LanguageToggle';
import Image from 'next/image';
import Link from 'next/link';

const privacyContent = {
    es: {
        title: 'Política de Privacidad',
        lastUpdated: 'Última actualización: Febrero 2026',
        sections: [
            {
                title: '1. Responsable del tratamiento',
                content: `Synecta ("nosotros", "nuestro" o "la empresa") es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.

Datos de contacto: stefan@synecta.ai`
            },
            {
                title: '2. Datos que recopilamos',
                content: `Recopilamos los siguientes datos personales cuando utilizas nuestros formularios:

• Nombre completo
• Dirección de correo electrónico profesional
• Nombre de la empresa
• Cargo/rol profesional
• Tamaño de la empresa
• Sitio web (opcional)
• Respuestas al cuestionario sobre tus necesidades de automatización

También recopilamos automáticamente información técnica como la dirección IP, tipo de navegador y páginas visitadas, mediante cookies técnicas y de análisis.`
            },
            {
                title: '3. Finalidad del tratamiento',
                content: `Utilizamos tus datos para:

• Responder a tus consultas y solicitudes de información
• Elaborar propuestas personalizadas (Blueprint)
• Enviarte comunicaciones comerciales relacionadas con nuestros servicios (solo con tu consentimiento)
• Mejorar nuestros servicios y experiencia de usuario
• Cumplir con obligaciones legales`
            },
            {
                title: '4. Base legal',
                content: `El tratamiento de tus datos se basa en:

• Tu consentimiento expreso (Art. 6.1.a RGPD)
• La ejecución de un contrato o medidas precontractuales (Art. 6.1.b RGPD)
• Nuestro interés legítimo en mejorar nuestros servicios (Art. 6.1.f RGPD)
• Cumplimiento de obligaciones legales (Art. 6.1.c RGPD)`
            },
            {
                title: '5. Período de conservación',
                content: `Conservamos tus datos personales durante:

• Solicitudes de contacto: 2 años desde la última interacción
• Datos de clientes: durante la relación comercial y 6 años adicionales por obligaciones fiscales
• Datos de análisis: 13 meses (según configuración de Google Analytics)`
            },
            {
                title: '6. Destinatarios de los datos',
                content: `Podemos compartir tus datos con:

• Proveedores de servicios tecnológicos (Supabase, Cloudflare) - con cláusulas contractuales de protección
• Herramientas de análisis (Google Analytics)
• Autoridades competentes cuando la ley lo requiera

No vendemos ni cedemos tus datos a terceros con fines comerciales.`
            },
            {
                title: '7. Transferencias internacionales',
                content: `Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En estos casos, garantizamos un nivel adecuado de protección mediante:

• Cláusulas contractuales tipo aprobadas por la Comisión Europea
• Certificación bajo el Marco de Privacidad de Datos UE-EE.UU.`
            },
            {
                title: '8. Tus derechos',
                content: `Tienes derecho a:

• Acceder a tus datos personales
• Rectificar datos inexactos
• Solicitar la supresión de tus datos
• Oponerte al tratamiento
• Solicitar la portabilidad de tus datos
• Retirar tu consentimiento en cualquier momento

Para ejercer estos derechos, contacta con nosotros en stefan@synecta.ai.

También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`
            },
            {
                title: '9. Seguridad',
                content: `Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, pérdida o destrucción, incluyendo:

• Cifrado de datos en tránsito y en reposo
• Controles de acceso basados en roles
• Auditorías de seguridad periódicas`
            },
            {
                title: '10. Cambios en esta política',
                content: `Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "última actualización".`
            }
        ]
    },
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: February 2026',
        sections: [
            {
                title: '1. Data Controller',
                content: `Synecta ("we", "our" or "the company") is the data controller for personal data collected through this website.

Contact: stefan@synecta.ai`
            },
            {
                title: '2. Data We Collect',
                content: `We collect the following personal data when you use our forms:

• Full name
• Professional email address
• Company name
• Job title/role
• Company size
• Website (optional)
• Questionnaire responses about your automation needs

We also automatically collect technical information such as IP address, browser type, and pages visited, through technical and analytics cookies.`
            },
            {
                title: '3. Purpose of Processing',
                content: `We use your data to:

• Respond to your inquiries and information requests
• Prepare personalized proposals (Blueprint)
• Send you commercial communications related to our services (only with your consent)
• Improve our services and user experience
• Comply with legal obligations`
            },
            {
                title: '4. Legal Basis',
                content: `The processing of your data is based on:

• Your explicit consent (Art. 6.1.a GDPR)
• Performance of a contract or pre-contractual measures (Art. 6.1.b GDPR)
• Our legitimate interest in improving our services (Art. 6.1.f GDPR)
• Compliance with legal obligations (Art. 6.1.c GDPR)`
            },
            {
                title: '5. Retention Period',
                content: `We retain your personal data for:

• Contact requests: 2 years from last interaction
• Customer data: during the business relationship plus 6 additional years for tax obligations
• Analytics data: 13 months (per Google Analytics configuration)`
            },
            {
                title: '6. Data Recipients',
                content: `We may share your data with:

• Technology service providers (Supabase, Cloudflare) - with contractual protection clauses
• Analytics tools (Google Analytics)
• Competent authorities when required by law

We do not sell or share your data with third parties for commercial purposes.`
            },
            {
                title: '7. International Transfers',
                content: `Some of our providers may be located outside the European Economic Area. In these cases, we ensure an adequate level of protection through:

• Standard contractual clauses approved by the European Commission
• EU-US Data Privacy Framework certification`
            },
            {
                title: '8. Your Rights',
                content: `You have the right to:

• Access your personal data
• Rectify inaccurate data
• Request deletion of your data
• Object to processing
• Request data portability
• Withdraw your consent at any time

To exercise these rights, contact us at stefan@synecta.ai.

You may also file a complaint with your local data protection authority.`
            },
            {
                title: '9. Security',
                content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction, including:

• Data encryption in transit and at rest
• Role-based access controls
• Regular security audits`
            },
            {
                title: '10. Changes to This Policy',
                content: `We may update this privacy policy occasionally. We will notify you of any significant changes by posting the new policy on this page and updating the "last updated" date.`
            }
        ]
    }
};

export default function PrivacyPage() {
    const { lang } = useTranslation();
    const content = privacyContent[lang];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="py-6 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Synecta" width={32} height={32} className="w-8 h-8" />
                        <span className="font-semibold">Synecta</span>
                    </Link>
                    <LanguageToggle />
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{content.title}</h1>
                <p className="text-muted-foreground mb-12">{content.lastUpdated}</p>

                <div className="space-y-10">
                    {content.sections.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                    <Link
                        href="/"
                        className="text-primary hover:text-primary/80 transition-colors"
                    >
                        ← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                    </Link>
                </div>
            </main>
        </div>
    );
}
