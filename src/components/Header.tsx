'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Menu, X } from 'lucide-react';

interface HeaderProps {
    onOpenModal: (track?: 'operations' | 'revenue') => void;
}

export function Header({ onOpenModal }: HeaderProps) {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t.nav.solutions, href: '#solutions' },
        { label: t.nav.process, href: '#process' },
        { label: t.nav.results, href: '#results' },
        { label: t.nav.faq, href: '#faq' },
    ];

    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '[[CALENDLY_URL]]';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass border-b border-white/10 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/synecta-logo.png"
                            alt="Synecta"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                            style={{
                                mixBlendMode: 'lighten',
                                filter: 'brightness(1.1)'
                            }}
                            priority
                        />
                        <span className="text-xl font-semibold text-foreground hidden sm:block">
                            Synecta
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageToggle />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenModal()}
                            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            {t.nav.cta_blueprint}
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="bg-primary hover:bg-primary/90 text-white glow-primary gap-2"
                        >
                            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                                <Calendar className="w-4 h-4" />
                                {t.nav.cta_call}
                            </a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden glass border-t border-white/10 mt-3"
                >
                    <div className="px-4 py-6 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <hr className="border-white/10 my-2" />
                        <LanguageToggle />
                        <Button
                            onClick={() => {
                                setMobileOpen(false);
                                onOpenModal();
                            }}
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                        >
                            {t.nav.cta_blueprint}
                        </Button>
                        <Button
                            variant="outline"
                            asChild
                            className="w-full border-white/20"
                        >
                            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                                {t.nav.cta_call}
                            </a>
                        </Button>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
