# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Ignidash - FIRE Planning App

A minimalist FIRE (Financial Independence, Retire Early) planning app that prioritizes simplicity and user clarity.

## Key Differentiators

- **Values-Based Planning**: Start with personal values and lifestyle preferences, not just numbers
- **Life Modules**: Plan around modular life events (sabbaticals, career changes, kids) for flexible exploration
- **Context-Aware AI Copilot**: Personalized guidance based on user's specific modules and financial data
- **Shareable Plans**: Every plan can be shared via read-only link (`/shared/:id`)
- **FIRE-Focused**: Monte Carlo simulations, withdrawal strategies, sequence-of-returns analysis
- **Calm & Empowering UX**: Minimalist design with fast iteration between input and output

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (stone theme)
- **Auth**: BetterAuth (magic link + OAuth)
- **Database**: Neon (PostgreSQL) + Prisma
- **AI**: OpenAI API via Vercel Functions

## Key Principles

- **Desktop-first, mobile-responsive** - Optimize for desktop but ensure excellent mobile experience
- **Simplicity over features** - Avoid overwhelming users
- **Handle all edge cases** - Graceful error states, loading states, empty states
- **Performance matters** - Fast initial load, smooth interactions, minimal re-renders
- **Clear UX** - Users should never feel lost or confused

## Architecture

```
src/
├── app/          # App Router pages
├── components/   # React components + ui/
└── lib/          # Utilities
```

Import with `@/*` alias. Components use Radix UI + CVA patterns.

## Core Routes

- `/dashboard` - Main app (with `?view=plan|summary|settings`)
- `/onboarding` - Simple 3-click values intake
- `/shared/:id` - Public plan view

## Development Guidelines

1. **Error Handling**: Always provide meaningful error messages and recovery paths
2. **Loading States**: Show skeletons or spinners for async operations
3. **Empty States**: Guide users when no data exists
4. **Responsive Design**: Test on both desktop and mobile viewports
5. **Performance**: Use React.memo, useMemo, and useCallback where appropriate
6. **Accessibility**: Maintain ARIA labels and keyboard navigation

## Git Workflow

- When pushing changes, use `git add -A` to stage all changes
- Write clear and brief commit messages that describe the changes
- Use `git push` to update the remote repository

## Code Practices

- Always remember to actually use the components that you import.
- Check if there's a Shadcn component that's available before implementing UIs from scratch

```