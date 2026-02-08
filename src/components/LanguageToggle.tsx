'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';

export function LanguageToggle() {
    const { lang, toggleLang } = useTranslation();

    return (
        <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
            aria-label={`Switch to ${lang === 'es' ? 'English' : 'Spanish'}`}
        >
            <span className={lang === 'es' ? 'text-foreground' : 'opacity-50'}>ES</span>
            <span className="text-muted-foreground/50">/</span>
            <span className={lang === 'en' ? 'text-foreground' : 'opacity-50'}>EN</span>
        </button>
    );
}
