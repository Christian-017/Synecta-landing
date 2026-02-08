'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';
import { LanguageToggle } from '@/components/LanguageToggle';
import Image from 'next/image';
import Link from 'next/link';

const cookiesContent = {
    es: {
        title: 'Política de Cookies',
        lastUpdated: 'Última actualización: Febrero 2026',
        sections: [
            {
                title: '1. ¿Qué son las cookies?',
                content: `Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un período de tiempo.`
            },
            {
                title: '2. Cookies que utilizamos',
                content: `Utilizamos los siguientes tipos de cookies:

**Cookies técnicas (necesarias)**
• Cookies de sesión: mantienen tu sesión activa
• Cookies de preferencias: guardan tu idioma preferido
• Cookies de seguridad: protegen contra fraude y ataques

**Cookies de análisis**
• Google Analytics: nos ayudan a entender cómo los usuarios interactúan con nuestro sitio
• Duración: hasta 13 meses

**Cookies de terceros**
• Cloudflare Turnstile: verificación anti-spam en formularios
• Calendly: para la integración del calendario de reservas`
            },
            {
                title: '3. Gestión de cookies',
                content: `Puedes gestionar tus preferencias de cookies de varias formas:

**Desde tu navegador:**
• Chrome: Configuración > Privacidad y seguridad > Cookies
• Firefox: Opciones > Privacidad y seguridad
• Safari: Preferencias > Privacidad
• Edge: Configuración > Cookies y permisos del sitio

**Desde nuestro sitio:**
Puedes actualizar tus preferencias en cualquier momento contactándonos en [[PRIVACY_EMAIL]].

Nota: Desactivar ciertas cookies puede afectar la funcionalidad del sitio.`
            },
            {
                title: '4. Cookies de terceros',
                content: `Algunos servicios de terceros pueden establecer sus propias cookies:

• **Google Analytics** (analytics.google.com): Análisis de uso del sitio
• **Cloudflare** (cloudflare.com): Seguridad y rendimiento
• **Calendly** (calendly.com): Sistema de reservas

Consulta las políticas de privacidad de estos servicios para más información sobre cómo gestionan tus datos.`
            },
            {
                title: '5. Tus derechos',
                content: `De acuerdo con el RGPD, tienes derecho a:

• Ser informado sobre las cookies que utilizamos
• Aceptar o rechazar cookies no esenciales
• Retirar tu consentimiento en cualquier momento
• Solicitar acceso a tus datos

Para ejercer estos derechos, contacta con nosotros en [[PRIVACY_EMAIL]].`
            },
            {
                title: '6. Actualizaciones',
                content: `Podemos actualizar esta política de cookies para reflejar cambios en nuestras prácticas o en la legislación aplicable. La fecha de "última actualización" al principio de esta página indica cuándo se realizó la última modificación.`
            },
            {
                title: '7. Contacto',
                content: `Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en:

Email: [[PRIVACY_EMAIL]]`
            }
        ]
    },
    en: {
        title: 'Cookie Policy',
        lastUpdated: 'Last updated: February 2026',
        sections: [
            {
                title: '1. What are cookies?',
                content: `Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They allow the site to remember your actions and preferences over a period of time.`
            },
            {
                title: '2. Cookies we use',
                content: `We use the following types of cookies:

**Technical cookies (necessary)**
• Session cookies: keep your session active
• Preference cookies: store your preferred language
• Security cookies: protect against fraud and attacks

**Analytics cookies**
• Google Analytics: help us understand how users interact with our site
• Duration: up to 13 months

**Third-party cookies**
• Cloudflare Turnstile: anti-spam verification in forms
• Calendly: for booking calendar integration`
            },
            {
                title: '3. Managing cookies',
                content: `You can manage your cookie preferences in several ways:

**From your browser:**
• Chrome: Settings > Privacy and security > Cookies
• Firefox: Options > Privacy and security
• Safari: Preferences > Privacy
• Edge: Settings > Cookies and site permissions

**From our site:**
You can update your preferences at any time by contacting us at [[PRIVACY_EMAIL]].

Note: Disabling certain cookies may affect site functionality.`
            },
            {
                title: '4. Third-party cookies',
                content: `Some third-party services may set their own cookies:

• **Google Analytics** (analytics.google.com): Site usage analytics
• **Cloudflare** (cloudflare.com): Security and performance
• **Calendly** (calendly.com): Booking system

Please refer to these services' privacy policies for more information on how they manage your data.`
            },
            {
                title: '5. Your rights',
                content: `In accordance with GDPR, you have the right to:

• Be informed about the cookies we use
• Accept or reject non-essential cookies
• Withdraw your consent at any time
• Request access to your data

To exercise these rights, contact us at [[PRIVACY_EMAIL]].`
            },
            {
                title: '6. Updates',
                content: `We may update this cookie policy to reflect changes in our practices or applicable legislation. The "last updated" date at the top of this page indicates when the last modification was made.`
            },
            {
                title: '7. Contact',
                content: `If you have questions about our cookie policy, you can contact us at:

Email: [[PRIVACY_EMAIL]]`
            }
        ]
    }
};

export default function CookiesPage() {
    const { lang } = useTranslation();
    const content = cookiesContent[lang];

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
                            <div className="text-muted-foreground whitespace-pre-line leading-relaxed prose prose-invert max-w-none">
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
