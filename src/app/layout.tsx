import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/useTranslation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synecta | AI Automation Agency",
  description: "Construimos sistemas de IA que eliminan trabajo manual y aceleran el ROI. Agentes de IA, automatizaciones y operadores autónomos integrados con tu stack.",
  keywords: ["AI automation", "AI agents", "n8n", "Make", "business automation", "workflow automation", "Synecta"],
  authors: [{ name: "Synecta" }],
  openGraph: {
    title: "Synecta | AI Automation Agency",
    description: "Sistemas de IA que eliminan trabajo manual y aceleran el ROI.",
    url: "https://synecta.io",
    siteName: "Synecta",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Synecta - AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synecta | AI Automation Agency",
    description: "Sistemas de IA que eliminan trabajo manual y aceleran el ROI.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
