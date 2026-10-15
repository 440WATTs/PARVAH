# Pahad Saathi — Hackathon 3-5 Minute Live Demonstration Script

This structured script guides evaluators and judges through the core features and innovation of **Pahad Saathi** in approximately 3 to 5 minutes.

---

## Preparation (0:00 - 0:30)
1. Open the application locally: `http://localhost:5173`.
2. Notice the top banner:
   - **Language selector**: Nepali (नेपाली), Hindi (हिन्दी), English (EN).
   - **Accessibility toggles**: Large font mode, High-contrast mode, Read Aloud (TTS).
   - **Test & Hackathon Controls**: Virtual clock and fast-forward fixtures.
3. Click **Reset Demo Data** in the test bar to ensure a clean starting state.

---

## Act 1: Senior Citizen Mode (0:30 - 1:15)
- **Role**: Aama Passang Doma (Age 74, Yuksam, West Sikkim).
1. Select **Senior Citizen Mode** from the navigation bar.
2. Show the large, uncluttered interface:
   - Warm greeting: *"नमस्ते, आमा पासाङ डोमा!"*
   - Audio feedback: Click **"Read Aloud (TTS)"** to hear the spoken greeting in Nepali/Hindi.
3. Demonstrate Check-in:
   - Tap the large green **"म ठीक छु (I am OK)"** button.
   - Observe the celebratory confirmation, spoken confirmation, and updated timestamp.
4. Demonstrate Medicine Reminder:
   - Notice the *"Today's Medicine"* card showing *Amlodipine 5mg (BP Tab)*.
   - Tap **"मैले औषधी खाएँ (I Took My Medicine)"**. Notice the status updates to taken.
5. Demonstrate "Check on Me" Timer:
   - Point out the safety timer widget. Tap **"2-Hour Timer"** (for seniors going to fields or resting).

---

## Act 2: Time Advancement & Missed Check-In Escalation (1:15 - 2:15)
- **Innovation**: The automated Community Safety Loop.
1. In the **Test & Hackathon Controls** bar, click **"+6 Hours"** (or click **"Simulate Missed Check-in (Overdue)"**).
2. The virtual clock advances past the check-in window and grace period.
3. Observe the Senior status automatically transition to **"Check-in Overdue!"** with an escalation incident triggered in the system.

---

## Act 3: Caregiver Dashboard & Volunteer Coordination (2:15 - 3:30)
- **Role**: Tenzing Bhutia (Son working in Gangtok).
1. Switch to **Family & Circle (Caregiver Dashboard)**.
2. Point out the real-time status card showing Aama Passang is *Overdue*.
3. Scroll to **Active Incidents & Alerts**:
   - The incident is in state: `NOTIFIED_QUEUED`.
4. **Step 1 - Acknowledge**:
   - Click **"Acknowledge Alert"**. State transitions to `ACKNOWLEDGED`.
5. **Step 2 - Assign Local Volunteer**:
   - Select *Karma Lepcha (Yuksam Ward 3)* and click **"Assign Local Volunteer"**.
   - State transitions to `FOLLOW_UP_IN_PROGRESS`.
6. Switch to **Community Volunteer** tab:
   - Observe Karma Lepcha's dashboard. A new urgent visit task appears!
   - Click **"Accept Visit"**.
   - Review the physical home visit checklist (check physical health, verify heating/ration, verify medicine, ensure phone charged). Check off all items.
   - Enter note: *"Visited cottage. Aama was resting by the woodstove, safe and healthy."*
   - Click **"Complete Visit & Check"**.
7. Return to **Caregiver Dashboard**:
   - The incident has progressed to **RESOLVED**!
   - Review the audit timeline showing every actor, timestamp, and verification step.
   - Senior status is restored to **Safe & Checked In**.

---

## Act 4: Offline-First Operation in Remote Himalayan Ridges (3:30 - 4:15)
1. In the Demo Control bar, click **"Go Offline (Simulate Terrain)"**.
2. Notice the network pill turns yellow: *"Offline Mode Active (Using local IndexedDB cache)"*.
3. Switch to **Senior Citizen Mode**:
   - Tap **"I am OK"** or trigger **"Check on Me"**.
   - Notice the check-in is saved immediately in local IndexedDB.
   - The header displays: `1 pending actions queued`.
4. In the Demo Control bar, click **"Resume Online"**.
5. Tap **"Sync Offline Actions"**:
   - Actions are opportunistically synchronized with zero data loss or duplicate records!

---

## Act 5: Welfare Scheme Directory & Impact Metrics (4:15 - 5:00)
1. Switch to **Welfare Schemes**:
   - Show verified Sikkim schemes: IGNOAPS, Sikkim Vridha Pension, Ayushman Bharat, Rashtriya Vayoshri Yojana, Elderline 14567.
   - Click **"View Required Documents"** for IGNOAPS.
   - Point out the official `.gov.in` / `.nic.in` external URLs and the explicit privacy banner stating no Aadhaar/bank data is harvested.
2. Switch to **Impact & Validation**:
   - Show quantitative metrics calculated strictly from live database records: Check-in completion rate, Avg Caregiver Ack time (~4 min), Avg Community Resolution (~28 min), Medicine adherence rate.
   - Click **"View Proposed Sikkim Field-Validation Plan"** to show the 25-senior pilot methodology for rural Gyalshing/Dzongu.

---

## Conclusion
Pahad Saathi proves that by combining offline-first Progressive Web App technology, accessible trilingual design, and a closed-loop community response network, we can protect vulnerable elderly citizens living alone in remote Himalayan villages.
