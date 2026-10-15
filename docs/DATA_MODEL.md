# Pahad Saathi — Data Model & Schema Reference

This document describes the schema design, field constraints, relationships, and state representations implemented across both client IndexedDB (Dexie) and production PostgreSQL (Supabase).

## 1. Entity Overview

| Entity | Primary Key | Description |
|---|---|---|
| `seniors` | `id` (UUID / text) | Core profile for elderly beneficiary, check-in window, and contact preferences |
| `check_ins` | `id` (UUID / text) | Historical record of every safety check-in, timestamp, and method |
| `incidents` | `id` (UUID / text) | Missed check-in and SOS alerts managed through the 5-state lifecycle |
| `incident_timeline` | `id` (UUID / text) | Audit history tracking every transition step, actor name, and notes |
| `medicines` | `id` (UUID / text) | Daily medicine schedule with dose, time, and adherence tracking |
| `trusted_circle` | `id` (UUID / text) | Family members and neighbours authorized to monitor the senior |
| `volunteers` | `id` (UUID / text) | Local community youth and ASHA workers available for home visits |
| `volunteer_tasks` | `id` (UUID / text) | Dispatched physical home visit tasks with in-person checklists |
| `welfare_schemes` | `id` (text slug) | Verified government welfare and pension entitlements directory |
| `sync_queue` | `id` (UUID / text) | Offline mutation queue holding pending database updates |

---

## 2. Detailed Schema Definitions

### A. Seniors (`seniors`)
- `id`: Unique identifier (e.g. `'senior-01'`)
- `name`: Beneficiary full name (e.g. "Aama Passang Doma")
- `age`: Number (e.g. 74)
- `gender`: Female / Male / Other
- `village`: Local ward/village (e.g. "Yuksam, Ward 2")
- `district`: Administrative district in Sikkim (e.g. "Gyalshing / West Sikkim")
- `primaryLanguage`: Preferred language code (`'ne'`, `'hi'`, `'en'`)
- `checkInWindowStart`: Time string (e.g. `'07:00'`)
- `checkInWindowEnd`: Time string (e.g. `'10:00'`)
- `gracePeriodMinutes`: Integer grace period before overdue trigger (default: 60)
- `lastCheckInAt`: ISO-8601 timestamp of most recent confirmed check-in
- `status`: `'ok' | 'upcoming' | 'overdue' | 'help_requested'`
- `checkOnMeTimerMinutes`: Configurable safety timer duration in minutes
- `checkOnMeExpiresAt`: ISO-8601 timestamp when active safety timer expires
- `emergencyNotes`: Key clinical or contextual notes (e.g. "Lives alone near Dubdi Monastery trail")
- `phone`: Mobile contact number

### B. Incidents (`incidents`)
- `id`: Unique incident ID (e.g. `'sos-1729000000'` or `'overdue-1729000000'`)
- `seniorId`: Foreign key to `seniors.id`
- `seniorName`: Denormalized senior name for fast offline rendering
- `village`: Denormalized location for volunteer dispatch
- `type`: `'SOS' | 'MISSED_CHECK_IN' | 'CHECK_ON_ME_EXPIRED' | 'MEDICINE_MISSED'`
- `state`: `'CREATED' | 'NOTIFIED_QUEUED' | 'ACKNOWLEDGED' | 'FOLLOW_UP_IN_PROGRESS' | 'RESOLVED' | 'ESCALATED'`
- `createdAt`: ISO-8601 timestamp
- `acknowledgedAt`: ISO-8601 timestamp when caregiver acknowledged
- `acknowledgedBy`: Name or ID of responding caregiver
- `assignedVolunteerId`: ID of assigned volunteer
- `assignedVolunteerName`: Name of assigned volunteer
- `resolvedAt`: ISO-8601 timestamp of resolution
- `resolutionNotes`: Summary of visit outcome and verification
- `deliveryStatus`: `'simulated_demo' | 'offline_queued' | 'delivered_cloud' | 'failed_carrier'`
- `syncStatus`: `'synced' | 'pending' | 'simulated'`

### C. Volunteer Tasks (`volunteer_tasks`)
- `id`: Task ID (e.g. `'task-1729000000'`)
- `incidentId`: Optional reference to triggering incident
- `seniorId`: Reference to senior
- `seniorName`: Senior's name
- `village`: Specific ward in Yuksam or Dzongu
- `volunteerId`: Assigned volunteer ID
- `assignedAt`: ISO-8601 timestamp
- `status`: `'assigned' | 'accepted' | 'declined' | 'completed' | 'unable_to_reach' | 'rescheduled' | 'escalated'`
- `taskTitle`: Human-readable task description
- `priority`: `'normal' | 'urgent' | 'emergency'`
- `checklist`: JSON array of checklist items:
  - `id`: Item ID
  - `label`: Description (e.g. "Check physical status", "Verify medicine supply", "Verify phone charged")
  - `checked`: Boolean
- `outcomeNote`: Written notes from volunteer upon physical home visit
- `completedAt`: ISO-8601 completion timestamp

### D. Welfare Schemes (`welfare_schemes`)
- `id`: Unique slug (e.g. `'scheme-ignoaps'`)
- `title`: English title
- `titleNe`: Nepali vernacular title
- `authority`: Administering government ministry/department
- `description`: Plain-language explanation
- `eligibility`: Array of verified eligibility conditions
- `benefits`: Verified monetary or in-kind assistance
- `documentsRequired`: Array of official documents needed
- `officialUrl`: Official government portal link
- `lastVerified`: Date string (`'2026-10-15'`)
- `category`: `'pension' | 'health' | 'assistive' | 'legal'`
