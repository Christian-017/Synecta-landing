'use client';

// Synecta "S" mark logo as inline SVG (transparent background)
export function SynectaLogo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Synecta"
        >
            <defs>
                <linearGradient id="synecta-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A90C2" />
                    <stop offset="50%" stopColor="#1C5D99" />
                    <stop offset="100%" stopColor="#14486D" />
                </linearGradient>
                <linearGradient id="synecta-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7CB4DB" />
                    <stop offset="50%" stopColor="#4A90C2" />
                    <stop offset="100%" stopColor="#1C5D99" />
                </linearGradient>
            </defs>
            {/* Upper chevron */}
            <path
                d="M25 15 L50 40 L75 15 L75 35 L50 60 L25 35 Z"
                fill="url(#synecta-gradient-2)"
                opacity="0.9"
            />
            {/* Lower chevron */}
            <path
                d="M25 45 L50 70 L75 45 L75 65 L50 90 L25 65 Z"
                fill="url(#synecta-gradient-1)"
            />
        </svg>
    );
}
