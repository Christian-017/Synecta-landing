'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import es from './es.json';
import en from './en.json';

type Language = 'es' | 'en';
type Translations = typeof es;

interface I18nContextType {
    lang: Language;
    t: Translations;
    setLang: (lang: Language) => void;
    toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const translations: Record<Language, Translations> = { es, en };

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>('es');

    useEffect(() => {
        const stored = localStorage.getItem('synecta-lang') as Language;
        if (stored && (stored === 'es' || stored === 'en')) {
            setLangState(stored);
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('synecta-lang', newLang);
    };

    const toggleLang = () => {
        const newLang = lang === 'es' ? 'en' : 'es';
        setLang(newLang);
    };

    return (
        <I18nContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within I18nProvider');
    }
    return context;
}
