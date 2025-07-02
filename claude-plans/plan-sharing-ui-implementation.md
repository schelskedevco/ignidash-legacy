# Plan Sharing Section UI Implementation Plan

## Overview

Create a compelling product demo showing how users can share their FIRE plans via simple links to Reddit, X (Twitter), and iMessage, using realistic sample data from the existing fire-scenarios.

## Component Architecture

### 1. MockBrowser Component

```
MockBrowser
├── Browser chrome (tab, address bar, controls)
├── URL: ignidash.com/shared/sabbatical-explorer-2024
├── Plan preview (title, key metrics)
└── Copy link button with success animation
```

### 2. PlatformPreviewCard Component

**Reddit Preview:**

- Post title: "My flexible FIRE plan - 35yo targeting work-optional by 42, thoughts?"
- Subreddit: r/financialindependence
- Preview snippet showing key metrics
- Upvotes, comments UI

**X (Twitter) Preview:**

- Tweet text: "Sharing my FIRE roadmap - $95k income → work-optional by 42 with $1.2M target 🎯"
- Link card with plan preview
- Engagement metrics

**iMessage Preview:**

- Clean message bubble
- Text: "Hey! Check out my retirement plan, would love your thoughts"
- Link preview card
- Authentic iOS messaging UI

### 3. ShareDemoGrid Component

- Responsive grid layout
- MockBrowser at top
- Three platform cards below
- Consistent spacing with existing sections

## Sample Data Integration

**Using "Sabbatical Barista" Scenario:**

- Age: 35, Income: $95k, Assets: $200k
- Focus: "Work-Optional Explorer"
- Target: Flexible lifestyle with part-time work ($1,500/month)
- Key Message: "Work-optional by 42, flexible adventure lifestyle"

## Design System Consistency

**Colors & Gradients:**

- Use existing GRADIENTS.text for highlights
- Maintain warmRose background gradient
- Platform-specific accent colors (Reddit orange, X blue, iMessage green)

**Typography & Spacing:**

- SPACING.container for padding
- TYPOGRAPHY.alignment for text alignment
- Consistent with ProductPageSection patterns

**Components:**

- shadcn/ui Button for copy actions
- Card components for platform previews
- Tooltip for additional context

## Implementation Details

### File Structure

```
src/components/features/plan-sharing/
├── plan-sharing-section.tsx (main export)
├── components/
│   ├── mock-browser.tsx
│   ├── platform-preview-card.tsx
│   └── share-demo-grid.tsx
```

### Key Features

1. **Copy Link Animation**: Success state with checkmark
2. **Platform Authenticity**: Realistic UI elements for each platform
3. **Responsive Design**: Mobile-first with desktop optimization
4. **Accessibility**: Proper ARIA labels and keyboard navigation
5. **Micro-interactions**: Subtle hover effects and transitions

## Content Strategy

**Core Message**: "One simple link" that works everywhere
**Use Cases Demonstrated**:

- Community feedback (Reddit)
- Professional sharing (X)
- Personal discussion (iMessage)

**Realistic Context**:

- Show actual financial numbers from sample data
- Use authentic usernames and engagement metrics
- Include relevant hashtags and subreddit context

## Success Criteria

- Clear demonstration of sharing capability
- Authentic platform representation
- Consistent with app's minimalist design
- Engaging without being overwhelming
- Mobile responsive and accessible
