'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/useTranslation';

export function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-4">
                        <Image
                            src="/synecta-logo.png"
                            alt="Synecta"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                            style={{
                                mixBlendMode: 'lighten',
                                filter: 'brightness(1.1)'
                            }}
                        />
                        <span className="text-sm text-muted-foreground">
                            {t.footer.copyright}
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t.footer.privacy}
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {t.footer.cookies}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
