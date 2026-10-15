# AI Usage Disclosure & Verification Statement

In compliance with the transparency and integrity guidelines of **Hack for Social Cause, VBYLD 2027**, this document transparently describes how Artificial Intelligence (AI) tools were utilized in the development of **Pahad Saathi**, how outputs were reviewed, and our engineering verification process.

---

## 1. AI Tools Utilized

- **Tool Name**: Antigravity AI Coding Assistant (powered by Google DeepMind Gemini models).
- **Interface**: Agentic CLI & pair programming environment.

---

## 2. Tasks Performed with AI Assistance

1. **Initial Codebase Scaffolding**:
   - Generation of TypeScript interface definitions for domain entities (`SeniorProfile`, `IncidentAlert`, `VolunteerVisitTask`, `MedicineReminder`).
   - Setup of Tailwind CSS configuration and accessible color tokens.
2. **Persistence & IndexedDB Setup**:
   - Drafting Dexie schema stores and offline mutation queue logic.
3. **Automated Test Scaffolding**:
   - Authoring Vitest test cases for state machine transitions, check-in auto-resolutions, and offline queue synchronization.
4. **Documentation Drafting**:
   - Formulating technical architecture descriptions, data models, and presentation slide outlines.

---

## 3. Human Review & Verification Process

All AI-generated code and copy were rigorously inspected and validated:

- **State Machine Verification**: Transition logic (`CREATED` -> `NOTIFIED_QUEUED` -> `ACKNOWLEDGED` -> `FOLLOW_UP_IN_PROGRESS` -> `RESOLVED`) was reviewed against real-world rural escalation procedures to prevent unmonitored states.
- **Factual Verification of Welfare Data**: All government schemes (IGNOAPS, Sikkim Mukhya Mantri Vridha Pension, Ayushman Bharat, RVY, Elderline 14567) were verified against official government portals (e.g. `nsap.nic.in`, `sikkim.gov.in`, `nha.gov.in`) with official dates and eligibility rules.
- **Security Audit**: Ensured no private keys, carrier credentials, or database secrets are committed to client code. Verified that no Aadhaar or bank credentials are collected.
- **Accessibility & Contrast Verification**: Verified that buttons meet large touch target criteria (64px - 80px), color contrast complies with WCAG 2.2 AA, and Web Speech API TTS functions across supported browsers.

---

## 4. Estimated AI Assistance Breakdown

*(Note: Approximate development contribution estimates; to be confirmed by the submitting project team)*

- **Architecture, Concept & Domain Problem Formulation**: ~80% Human Developer / 20% AI brainstorming.
- **Code Authoring & Component Assembly**: ~60% AI Scaffolding & Code Generation / 40% Human Engineering, Refactoring & Bug Fixing.
- **Testing & Verification**: ~50% AI Test Scaffolding / 50% Human Execution & Verification.
- **Welfare & Official Data Grounding**: 100% Verified against official Government of India and Government of Sikkim published portals.
