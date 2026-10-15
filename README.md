# Pahad Saathi (पहाड साथी)
### Elderly Safety & Community Care for Rural Sikkim
*Theme: Elderly Care & Healthy Ageing | Hack for Social Cause, VBYLD 2027*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing%20(13%20tests)-green.svg)](https://vitest.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20First-forest.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---

## 1. Project Overview

**Pahad Saathi** is an original, technology-driven social impact Progressive Web Application (PWA) created to protect senior citizens living alone or with limited support in remote and semi-rural communities across **Sikkim** (e.g., Yuksam, Dzongu, Ravangla, Soreng, and Geyzing).

In mountainous terrain, elderly individuals frequently face isolation while their adult children work elsewhere (Gangtok, Siliguri, Delhi, or abroad). Road access can be constrained by landslides and monsoons, and mobile networks suffer frequent outages.

### The Core Innovation: The Community Safety Loop
Pahad Saathi is not an ordinary medicine reminder or complex administrative dashboard. It introduces a closed-loop **community safety state machine**:
1. **Senior**: Simple 1-tap **"म ठीक छु (I am OK)"** check-in button with large touch targets (64–80px) and trilingual spoken voice feedback.
2. **Automated Escalation**: When the morning check-in window (07:00–10:00 AM) and grace period (60 min) expire without confirmation, an incident is triggered (`NOTIFIED_QUEUED`).
3. **Caregiver Acknowledgement**: Authorized family member acknowledges the alert (`ACKNOWLEDGED`) and assigns a local volunteer.
4. **Volunteer In-Person Visit**: Local village youth or ASHA worker receives the dispatch with an in-person welfare checklist (health, warmth, food ration, medicine, phone charging) and resolves the incident (`RESOLVED`).

---

## 2. Key Features

- **Senior Citizen Mode**: Dedicated, simplified, zero-clutter interface with large text, date/time greeting, prominent "I am OK" check-in button, one-tap SOS modal with direct dialer links (112, 108, primary contact), next medicine reminder, and "Check on Me" safety timer.
- **Family & Circle Dashboard**: Real-time status cards (Safe, Upcoming, Overdue, Help Requested), visual incident state machine pipeline, medicine adherence tracking, volunteer assignment, and full audit timelines.
- **Community Volunteer Mode**: Volunteer profile (e.g. Karma Lepcha in Yuksam Ward 3), availability toggle, active visit requests, interactive physical welfare checklist, and outcome logging (Completed, Unable to Reach, Escalated).
- **Verified Welfare Schemes Directory**: Searchable directory of verified pensions and entitlements (IGNOAPS, Sikkim Mukhya Mantri Vridha Pension, Ayushman Bharat PM-JAY, Rashtriya Vayoshri Yojana, Elderline 14567) linking directly to official government portals with **zero credential harvesting** (never asks for Aadhaar or bank account numbers).
- **Trilingual Localization & Accessibility**: Full translations for **Nepali (नेपाली)**, **Hindi (हिन्दी)**, and **English (EN)**, with Web Speech API Text-to-Speech (TTS), adjustable font scale, and WCAG 2.2 AA high-contrast styling.
- **Offline-First PWA**: Installable web app shell caching via Service Worker (`public/sw.js`) and 10 local IndexedDB stores via Dexie.js with an idempotent mutation sync queue.
- **Hackathon Test Fixtures (Demo Control Bar)**: Advance time (+2h, +6h), simulate missed check-ins immediately, toggle offline terrain simulation, and reset demo data with a single click.

---

## 3. Technology Stack

- **Frontend**: React 19, TypeScript, Vite.
- **Styling**: Tailwind CSS with custom forest-green (`#166534`) and warm-neutral palette.
- **Icons**: Lucide React.
- **Local Persistence & Offline Queue**: Dexie.js (IndexedDB) with `dexie-react-hooks`.
- **PWA**: Service Worker (`public/sw.js`) and Web App Manifest (`public/manifest.json`).
- **Data Validation**: Zod.
- **Testing**: Vitest, React Testing Library, `fake-indexeddb`.
- **Production Backend**: Supabase Auth and PostgreSQL schema with Row Level Security (RLS) policies (`supabase/migrations/`).

---

## 4. Quickstart Guide (Local Setup)

The application runs locally without any paid API keys or external cloud accounts. Demo mode is fully interactive and persists changes across page reloads in IndexedDB.

### Prerequisites
- Node.js LTS (v20+ or v24+)
- npm (v10+)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/pahad-saathi.git
cd pahad-saathi

# Install dependencies
npm install

# Run automated tests
npm test

# Start the local development server
npm run dev
```

Open your browser to `http://localhost:5173`.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 5. Demonstration Walkthrough (3-Minute Scenario)

1. **Senior Check-in**:
   - Open **Senior Citizen Mode**.
   - Tap **"म ठीक छु (I am OK)"**. Observe the celebratory confirmation and updated timestamp.
   - Tap **"मैले औषधी खाएँ (Taken)"** on the morning BP medicine card.
2. **Advance Time**:
   - In the **Test & Hackathon Controls** bar at the top, click **"+6 Hours"** (or click **"Simulate Missed Check-in (Overdue)"**).
   - Notice the senior status automatically shifts to **Check-in Overdue!**
3. **Caregiver Escalation**:
   - Switch to **Family & Circle** tab.
   - View the active incident in `NOTIFIED_QUEUED`.
   - Click **"Acknowledge Alert"** (state moves to `ACKNOWLEDGED`).
   - Select *Karma Lepcha* and click **"Assign Local Volunteer"** (state moves to `FOLLOW_UP_IN_PROGRESS`).
4. **Volunteer Visit**:
   - Switch to **Community Volunteer** tab.
   - Accept the task, complete the 4-point in-person checklist, enter visit notes, and click **"Complete Visit & Check"**.
   - Switch back to **Family & Circle**: Incident state is now `RESOLVED` and senior status returns to safe!
5. **Offline Mode & Sync**:
   - In the Test Bar, click **"Go Offline (Simulate Terrain)"**.
   - In Senior mode, tap **"I am OK"**; observe the action stored locally with `1 pending actions queued`.
   - Click **"Resume Online"** and tap **"Sync Offline Actions"** to verify idempotent sync.
6. **Welfare Schemes**:
   - Switch to **Welfare Schemes** to inspect verified official entitlements with official government portal links.

---

## 6. Repository Structure

```
pahad-saathi/
├── dist/                      # Production build bundle
├── docs/
│   ├── ARCHITECTURE.md        # Technical architecture & state machine diagrams
│   ├── DATA_MODEL.md          # Database schemas, field types, and indices
│   ├── SECURITY_AND_PRIVACY.md# Privacy safeguards, zero harvesting, and RLS
│   ├── DATA_SOURCES.md        # Verified Sikkim government welfare sources
│   ├── AI_USAGE_DISCLOSURE.md # AI tool transparency statement
│   ├── DEMO_SCRIPT.md         # 3-5 minute presentation script
│   └── SLIDES_OUTLINE.md      # 7-slide pitch deck outline
├── public/
│   ├── favicon.svg            # Mountain & care loop icon
│   ├── manifest.json          # PWA Web App Manifest
│   └── sw.js                  # Service Worker for offline shell caching
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Navigation, language switcher, accessibility
│   │   ├── DemoControlBar.tsx # Test time advancement & simulation fixtures
│   │   ├── SeniorMode.tsx     # Simplified elder interface with TTS
│   │   ├── CaregiverDashboard.tsx # Incident escalation state machine
│   │   ├── VolunteerMode.tsx  # In-person visit tasks and checklists
│   │   ├── WelfareAssistant.tsx   # Verified Sikkim welfare scheme directory
│   │   └── ImpactAnalytics.tsx    # Computed metrics & field validation plan
│   ├── context/
│   │   └── AppContext.tsx     # Global state, demo controls, and Dexie bindings
│   ├── db/
│   │   └── index.ts           # Dexie IndexedDB persistence & state transitions
│   ├── i18n/
│   │   └── index.ts           # Trilingual dictionaries (Nepali, Hindi, English) & TTS
│   ├── test/
│   │   ├── checkInFlow.test.ts        # Check-in and medicine unit tests
│   │   ├── incidentStateMachine.test.ts # State machine transition tests
│   │   ├── offlineQueue.test.ts       # Offline sync queue tests
│   │   ├── rolePermissions.test.ts    # Roles and verified data tests
│   │   └── setup.ts                   # Vitest setup with fake-indexeddb
│   ├── types/
│   │   └── index.ts           # TypeScript domain models
│   ├── App.tsx
│   ├── index.css              # Tailwind directives and accessibility styles
│   └── main.tsx
├── supabase/
│   └── migrations/
│       └── 20261015000000_pahad_saathi_core.sql # Supabase PostgreSQL & RLS
├── .env.example               # Safe configuration environment template
├── LICENSE                    # MIT License
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 7. Testing & Verification

Pahad Saathi includes automated unit and integration tests covering all critical safety loops:
```bash
# Run all automated tests
npm test
```

Test coverage includes:
- Incident State Machine transitions (`CREATED` -> `NOTIFIED_QUEUED` -> `ACKNOWLEDGED` -> `FOLLOW_UP_IN_PROGRESS` -> `RESOLVED`).
- Check-in timestamp recording, profile status updates, and auto-resolution of open missed check-ins.
- Offline mutation queueing and opportunistic sync.
- Trilingual translations, accessibility settings, and verified welfare scheme integrity.

---

## 8. Deployment Guide

### Vercel / Cloudflare Pages / Netlify
1. Connect this repository to your Vercel or Cloudflare Pages project.
2. Set Build Command: `npm run build`.
3. Set Output Directory: `dist`.
4. Ensure environment variables from `.env.example` are configured (or left at defaults for standalone offline-first demo mode).

---

## 9. Ethics, Privacy & Limitations

1. **No Artificial Intelligence Hallucinations in Care**: Automated escalation is governed by strict deterministic state machines, not probabilistic LLM decision-making.
2. **Zero Harvesting**: Pahad Saathi never collects Aadhaar numbers, bank account details, or private health records.
3. **Honest Delivery Disclaimer**: In demo mode, alerts are transparently labeled as `Simulated in Demo Mode`. Opening the 112 emergency dialer opens the device phone dialer; it does not claim automated satellite dispatch.
4. **Browser Background Limitations**: Web browsers restrict background execution when tabs are inactive. Background reliability is maximized by installing the PWA and configuring SMS fallback channels.

---

## 10. License & Attributions

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Third-party library attributions are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
