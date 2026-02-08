# Synecta - AI Automation Agency Landing Page

A premium, ultra-minimal landing page for Synecta, an AI automation agency. Built with Next.js 14, TypeScript, TailwindCSS, and Supabase.

## Features

- 🎨 **Premium Dark Theme** - Ultra-minimal design with custom brand colors
- 🌐 **Bilingual** - Spanish (default) and English with language toggle
- 📝 **Multi-step Lead Capture** - Contact form + questionnaire with lead scoring
- 🎬 **GSAP Animations** - Word-by-word scroll activation in hero
- 💫 **Framer Motion** - Smooth UI transitions throughout
- 🔒 **Cloudflare Turnstile** - Anti-spam protection
- 📊 **Analytics Ready** - Event tracking hooks for any provider
- 📅 **Calendly Integration** - Direct booking CTAs

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion + GSAP ScrollTrigger
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Webhooks**: n8n integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Cloudflare Turnstile (optional)
- n8n instance (optional)

### Installation

1. Clone and install dependencies:

```bash
cd synecta
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Configure your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# n8n Webhook
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/xxx

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

4. Set up Supabase database:

Run the migration in your Supabase SQL editor:

```sql
-- See supabase/migrations/001_create_leads.sql
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
synecta/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main landing page
│   │   ├── privacy/         # Privacy policy
│   │   ├── cookies/         # Cookie policy
│   │   └── api/leads/       # Lead submission API
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── Header.tsx       # Sticky navigation
│   │   ├── Hero.tsx         # GSAP animated hero
│   │   ├── Solutions.tsx    # 3 solution cards
│   │   ├── ChooseFocus.tsx  # Operations/Revenue cards
│   │   ├── Process.tsx      # Timeline section
│   │   ├── Results.tsx      # Metrics with counters
│   │   ├── Pricing.tsx      # Price ranges
│   │   ├── FAQ.tsx          # Accordion FAQ
│   │   ├── BlueprintModal.tsx # Multi-step modal
│   │   └── ...
│   └── lib/
│       ├── i18n/            # Translations (ES/EN)
│       ├── supabase.ts      # Database client
│       ├── lead-scoring.ts  # Score calculation
│       └── analytics.ts     # Event tracking
├── public/
│   └── logo.png            # Synecta logo
└── supabase/
    └── migrations/         # Database schema
```

## Configuration

### Replace Placeholders

Search and replace these placeholders:

- `[[CALENDLY_URL]]` - Your Calendly booking link
- `[[PRIVACY_EMAIL]]` - Contact email for privacy inquiries

### Lead Scoring

Leads are scored (0-13 points) based on:
- Company size (21-200 employees): +2
- Urgency (within 4 weeks): +2
- Budget (≥€5,000): +3
- Maintenance interest: +2
- High volume (51+ tasks/day): +2
- Multiple pain points: +1
- GDPR requirements: +1

### Analytics Events

The following events are tracked:

- `start_form` - User opens contact form
- `submit_contact` - Contact form submitted
- `start_quiz` - Questionnaire started
- `quiz_step` - Each questionnaire step
- `quiz_complete` - Questionnaire submitted
- `calendly_click` - Calendly CTA clicked

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## License

Private - All rights reserved.

---

Built with ❤️ by Synecta
