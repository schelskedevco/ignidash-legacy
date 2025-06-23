# 🚀 Ignidash: FIRE Planning App - Project Plan

Ignidash is a minimalist, emotionally aware FIRE (Financial Independence, Retire Early) planning app. It combines long-term financial modeling with values-centered life design. Users explore and build personalized financial plans using modular life events (e.g., sabbaticals, part-time work, early retirement), aided by a deeply integrated AI Copilot that aligns with their personal values, goals, and lifestyle.

---

## ⚙️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui (`stone` base color)
- **Component Primitives**: Radix UI
- **Auth**: BetterAuth (magic link + OAuth)
- **Database**: Neon (PostgreSQL) + Prisma
- **Hosting**: Vercel (API, frontend, serverless functions)
- **AI Integration**: OpenAI API proxied through Vercel Functions (with future RAG)
- **State Management**: React Context with centralized explicit feature flags (`AppContext`)
- **Visualization**: `recharts`, custom charts
- **Jobs**: Vercel Cron (optional QStash integration)
- **Monitoring** (Post-MVP): Sentry, LogRocket/PostHog

---

## ✅ MVP Scope

### 🔀 App Routes & Navigation Logic

#### 🔧 Route Overview

- `/` — Marketing site or landing page
- `/onboarding` — Optional values intake for new or anonymous users
- `/dashboard` — Main app interface (plan building, output, Copilot)
  - Sub-views via shallow routing: `/dashboard?view=plan`, `?view=summary`, `?view=settings`
- `/shared/:id` — Public, read-only snapshot view of a shared plan
- `/account` — Profile, billing, preferences (Post-MVP)
- `/pricing` — Optional route for freemium/paid tier upsell

#### 🧭 Navigation Design

- Single `/dashboard` route for all planning sub-views
- Shallow routing with URL query (`?view=...`) for history + tab state
- Copilot opens in a side panel, no route change
- Shared layout shell for uninterrupted experience
- **Resilience Features**:
  - Autosave via localStorage or DB
  - `AppContext` for feature gating
  - Rehydration via `useEffect`
  - Avoid full route reloads during planning

---

### 🧭 Planning Core

- **Unified Dashboard View**
  - Shared layout, responsive
  - Mobile: tabbed view
  - Desktop: sidebar + panels

- **Plan Input Mode**
  - Timeline builder for life/finance modules
  - Modules: sabbaticals, kids, career shifts, etc.
  - Includes dates, income/expense deltas, notes
  - Drag-and-drop (desktop), tap-to-expand (mobile)
  - Inline Copilot suggestions

- **Settings Panel**
  - Adjust inflation, returns, taxes
  - Choose withdrawal method (4%, VPW, guardrails)
  - Toggle Copilot guidance
  - Configure output display modes

- **Summary Mode**
  - Monte Carlo FIRE simulations
  - Charts: Net worth, income/expense, withdrawal
  - Optional AI summaries
  - Responsive layout

- **Onboarding**
  - Skippable
  - 3-click values picker
  - Toggles: Kids, sabbaticals, etc.
  - Copilot uses happiness data for suggestions

---

### 🔗 Sharing & Collaboration

- Read-only `SharedPlan` URLs
- Viewer access controlled by feature flags (`canEdit`, `canUseCopilot`)

---

### 📊 Output & UX

- Unified dashboard with live inputs and outputs
- Interactive projections, timeline, AI insights
- Mobile responsive
- Calm, minimalist visual theme (`stone`)

---

## ⏰ 6-Week Build Plan

### Week 1: Initialization & Infra

- Scaffold Next.js + Tailwind v4 + shadcn/ui
- Set up BetterAuth
- Configure Neon + Prisma
- Deploy to Vercel

### Week 2: Context & Onboarding

- Build `AppContext` feature flags
- Onboarding UI + DB persistence
- Dashboard shell layout
- Define initial life modules

### Week 3: Plan Editor

- Build timeline UI + builder logic
- Life module create/edit
- SharedPlan data model + snapshots
- Smart default plans from onboarding

### Week 4: Financial Engine

- Projection engine: inflation, compounding
- Monte Carlo simulations
- Tax + withdrawal logic
- Sequence-of-returns modeling
- Chart rendering

### Week 5: AI Copilot Integration

- Secure OpenAI proxy (Vercel Functions)
- Copilot for module suggestions
- Copilot for plan analysis (risks/tradeoffs)
- Display Copilot in structured side panel

### Week 6: Finalization & Launch Prep

- SharedPlan public view route
- Mobile layout + error state polish
- Add value tags + narrative cues
- GDPR-aligned delete/account purge
- Launch waitlist page

---

## 🏛 Post-MVP Enhancements

- **Resilience**: Neon PITR, retries, error boundaries
- **Background Jobs**: Vercel Cron + QStash
  - Copilot precompute, plan exports, SharedPlan expiry
- **Caching**: Vercel KV or Redis for charts + Copilot
- **Data Isolation**: Postgres RLS + scoped tokens
- **Multi-Region**: Vercel edge + regional Neon reads
- **Monitoring**: Sentry, PostHog
- **Multi-User**: Invite system + RBAC + SharedPlan IDs
- **Plan Versioning**: Branching + diffs
- **Account Aggregation**: Plaid
- **Copilot RAG**: Vector DB + GPT + context injection
- **Paid Tiers**: Stripe + usage gating

---

## 🧱 Design System (Stone Theme)

- **Base**: `stone`
- **Font**: Inter, soft hierarchy
- **Components**: shadcn/ui + Radix
- **Layout**: Timeline center, Copilot right, nav left
- **Aesthetic**: Calm, introspective

---

## 📲 Marketing

- Landing page + waitlist
- Shareable plan templates
- Social preview & value-based content

---

## 🔐 Auth Details

- Magic link or OAuth (BetterAuth)
- Anonymous Copilot preview allowed
- Account required to save or share plans
