# Pahad Saathi — Technical Architecture

## 1. System Overview

**Pahad Saathi (पहाड साथी)** is an offline-first Progressive Web Application (PWA) designed for senior citizens living in remote and semi-rural communities across Sikkim (such as Yuksam, Dzongu, Ravangla, and Soreng), their family caregivers working in urban centres (Gangtok, Siliguri, Delhi), and local community volunteers (Panchayat youth and ASHA health workers).

The primary architectural goal is to bridge the "last-mile isolation gap" in Himalayan terrain, where cellular connectivity is intermittent and physical distances over mountain ridges delay emergency response.

```
+-----------------------------------------------------------------------------------------+
|                                    PAHAD SAATHI ARCHITECTURE                            |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +-----------------------+     +------------------------+     +--------------------+   |
|   |  Senior Citizen Mode  |     |  Caregiver Dashboard   |     |  Community Care    |   |
|   |  (Simplified, TTS,    |     |  (State Machine Loop,  |     |  Volunteer Network |   |
|   |   Big Touch Targets)  |     |   Incident Management) |     |  (Checklist Tasks) |   |
|   +-----------+-----------+     +-----------+------------+     +---------+----------+   |
|               |                             |                            |              |
|               +----------------------+      |      +---------------------+              |
|                                      |      |      |                                    |
|                                      v      v      v                                    |
|                         +-----------------------------------+                           |
|                         |      COMMUNITY SAFETY LOOP        |                           |
|                         |       (Core State Machine)        |                           |
|                         +-----------------+-----------------+                           |
|                                           |                                             |
|                                           v                                             |
|                        +-------------------------------------+                          |
|                        |   OFFLINE-FIRST PERSISTENCE LAYER   |                          |
|                        |  - Service Worker Shell Cache       |                          |
|                        |  - Dexie IndexedDB (10 Stores)      |                          |
|                        |  - Idempotent Sync Mutation Queue   |                          |
|                        +------------------+------------------+                          |
|                                           |                                             |
|                   +-----------------------+-----------------------+                     |
|                   | (When Online)                                 | (Offline)           |
|                   v                                               v                     |
|        +--------------------+                           +-------------------+           |
|        | Optional Supabase  |                           | Local IndexedDB   |           |
|        | PostgreSQL + RLS   |                           | Queue & Recovery  |           |
|        +--------------------+                           +-------------------+           |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Core Innovation: The Community Safety Loop

Rather than offering generic standalone medicine timers or unmonitored SOS buttons, Pahad Saathi implements a **four-stage closed-loop community safety state machine**:

```
[ CREATED ]
    │
    ▼
[ NOTIFIED / QUEUED ]  ──(Overdue check-in window OR Senior taps SOS)
    │
    ▼
[ ACKNOWLEDGED ]       ──(Caregiver in Gangtok taps "Acknowledge Alert" & contacts neighbour)
    │
    ▼
[ FOLLOW_UP_PROGRESS ] ──(Caregiver assigns nearby volunteer; volunteer accepts task)
    │
    ▼
[ RESOLVED ]           ──(Volunteer conducts in-person visit in Yuksam; confirms safety)
    │
    └──(If unreachable/emergency)──► [ ESCALATED ] ──(Ward Panchayat & Police 112 alerted)
```

### State Machine Transition Rules:
1. **Triggering**:
   - `MISSED_CHECK_IN`: Automatically triggered when the senior's morning check-in window (e.g., 07:00 - 10:00 AM) passes and the 60-minute grace period expires without confirmation.
   - `SOS`: Manually triggered by the senior via the prominent 1-tap SOS action.
2. **Notification & Delivery**:
   - In demo mode, status is visibly marked as `simulated_demo`.
   - In offline mode, status is marked as `offline_queued` in IndexedDB.
   - In production mode, status updates to `delivered_cloud` via Supabase real-time channels.
3. **Caregiver Acknowledgement**:
   - Authorized caregiver confirms awareness with a timestamped note. Prevents duplicate panic calls.
4. **Volunteer Dispatch**:
   - Local volunteer in the same ward (e.g. Karma Lepcha in Yuksam Ward 3) receives the task with a standardized welfare checklist.
5. **Resolution**:
   - Outcome is verified via checklist (health, water/ration, medicine supply, phone charging). Senior's status in the profile is returned to `ok`.

---

## 3. Offline-First Architecture

Because mountain weather, heavy rains, landslides, and power cuts frequently disable internet towers in rural Sikkim, Pahad Saathi is built on an **offline-first local persistence architecture**:

1. **Service Worker (`public/sw.js`)**:
   - Caches the application shell (`/`, `/index.html`, `/manifest.json`, icon assets).
   - Serves cached assets instantly when the device is off-grid.
2. **IndexedDB via Dexie (`src/db/index.ts`)**:
   - Stores 10 relational stores locally on the device: `seniors`, `checkIns`, `incidents`, `medicines`, `contacts`, `volunteers`, `volunteerTasks`, `schemes`, `syncQueue`, and `appMeta`.
   - All check-in actions, medicine acknowledgements, and visit notes write to IndexedDB first.
3. **Mutation Queue & Idempotent Sync**:
   - Every mutation performed while offline is appended to `syncQueue` with a UUID timestamp.
   - Upon network reconnection, `syncPendingMutations()` flushes pending actions without duplicating records or discarding newer data.
   - The top banner provides a live indicator: `Offline Mode Active (Using local IndexedDB cache)` and the exact count of queued items.

---

## 4. Accessibility & Vernacular Design

- **Trilingual Dictionary**: Native support for Nepali (नेपाली), Hindi (हिन्दी), and English (EN).
- **Text-to-Speech (TTS)**: Web Speech API helper `speakText()` reads screen summaries aloud at a comfortable 0.9x cadence with native language codes (`ne-NP`, `hi-IN`).
- **Touch Target Sizing**: Primary action buttons in Senior Citizen Mode meet or exceed 64px - 80px (well above WCAG 2.2 AA 24px/48px thresholds).
- **High-Contrast Mode**: Single-tap accessibility toggle with high-contrast borders and sharp typography.
