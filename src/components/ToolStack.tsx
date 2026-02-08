'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/useTranslation';

// Tool logos - all tools now use real assets
const tools = [
    { name: 'n8n', icon: '⚡', logo: '/n8n-logo.png' },
    { name: 'Make', icon: '🔄', logo: '/make-logo.png' },
    { name: 'Supabase', icon: '⚡', logo: '/supabase-logo.png' },
    { name: 'Instantly', icon: '📧', logo: '/instantly-logo.png' },
    { name: 'HighLevel', icon: '📊', logo: '/highlevel-logo.png' },
    { name: 'Claude', icon: '🤖', logo: '/claude-logo.png' },
    { name: 'ChatGPT', icon: '🤖', logo: '/chatgpt-logo.png' },
    { name: 'Antigravity', icon: '🚀', logo: '/antigravity-logo.png' },
];

export function ToolStack() {
    const { t } = useTranslation();

    return (
        <section className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {t.toolstack.title}
                    </h2>
                    <p className="text-xs text-muted-foreground/70">
                        {t.toolstack.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
                >
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors group"
                        >
                            {tool.logo ? (
                                <div className="w-6 h-6 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Image
                                        src={tool.logo}
                                        alt={`${tool.name} logo`}
                                        width={24}
                                        height={24}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                            ) : (
                                <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                                    {tool.icon}
                                </span>
                            )}
                            <span className="text-sm font-medium">{tool.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
