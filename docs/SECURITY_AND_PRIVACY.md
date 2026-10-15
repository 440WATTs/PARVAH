# Pahad Saathi — Security, Privacy & Integrity Architecture

## 1. Core Principles

Pahad Saathi is built on principles of **data minimization, dignity for the elderly, transparent communication, and zero data harvesting**:

1. **Zero Credential Harvesting**:
   - The system **never** collects, prompts for, or stores Aadhaar numbers, PAN cards, bank account details, PINs, or SMS OTPs.
   - Government welfare guidance links directly to official government portals without acting as a credential intermediary.
2. **No Intrusive Surveillance**:
   - The application does **not** perform continuous GPS tracking, hidden camera monitoring, or ambient microphone listening.
   - Check-ins are deliberate, dignity-affirming one-tap confirmations ("म ठीक छु / I am OK") performed during the senior's habitual morning routine.
3. **Honest Delivery Status**:
   - The app never reports "SMS sent", "Volunteer dispatched", or "112 contacted" unless the operation actually succeeded via a verified carrier gateway.
   - In demo mode, status is visibly and unambiguously labeled as `Simulated in Demo Mode`.
   - In offline mode, actions are explicitly marked as `Queued in Local Storage (Pending Network)`.

---

## 2. Row Level Security (RLS) & Multi-Tenancy

In production mode with PostgreSQL/Supabase, multi-tenant isolation is enforced at the database kernel level through Row Level Security (RLS) policies:

- **Caregivers**: Can only read and modify senior records if their authenticated User ID exists in that senior's `trusted_circle` table.
- **Volunteers**: Can only view tasks explicitly assigned to them in their locality ward. A volunteer cannot browse other seniors' profiles, clinical notes, or phone numbers without an active assignment.
- **Seniors**: Can update their own check-in timestamp and trigger emergency alerts.
- **Welfare Directory**: Publicly readable, but can only be modified by administrators.

---

## 3. Browser Storage & Offline Limitations

- **IndexedDB Security**: Data stored in IndexedDB is sandboxed by origin (`same-origin policy`). However, it is stored on the client device. On shared family tablets or public kiosk devices, users must be cautioned not to leave sensitive personal notes.
- **Background Execution Limitation**: Browsers restrict background JavaScript execution when tabs are closed or devices enter deep battery sleep. The application clearly documents that background monitoring requires the PWA to be installed or an active SMS fallback gateway rather than relying on browser timers alone.
- **Emergency Number Handling**: The 112 National Emergency button uses standard `tel:112` URI schemes to launch the native device phone dialer. The application transparently states that opening the dialer allows the user to place the emergency call directly rather than claiming automated dispatch.
