# Assignment-5-CIS512

High-level: runnable prototypes that prove our mobile UI can do what it needs to do: styles, photo intake (≥2), scheduling with earliest + flexible swap, QR confirm + local reminder, and QR scan on device.

Team: [Hugo Hou, Eroll Qorrolli, Thomas Zeuthen]
 Mentor: [Dan Kim] · Meeting date: [11.03 2025]
 Target device: Mobile (iOS/Android via Expo Go, SDK 54)
 Design reference: A4 Hi-Fi Prototype (Figma) — https://docs.google.com/document/d/16SUx3nyDDgW-NAPIKZlmsnrUfzgfktKSdk8bc3dLr58/edit?usp=sharing

 
1) What’s inside

Prototypes (screens):

StyleBoard — “Hello Styles” (colors/typography/buttons/chips/stepper)

Intake — photo picker + 2-photo gate

Schedule — chips (AM/PM/Evening) + Earliest available + flex time-swap demo

Confirm — QR code + local notification (“30min before” demo as +30s)

Scanner — on-device QR scanning and validation

Key Files: 
App.js                       # screen switcher (Home → screens)
styles/tokens.js             # color & type tokens
screens/StyleBoard.js
screens/Intake.js
screens/Schedule.js
screens/Confirm.js
screens/Scanner.js
utils/swap.js                # same-building time-swap helper
data/tenants.json            # tiny mock data

2) Demo script (A5 evidence)

Record short clips (10–20s each) on phone:

R1 Hello World / Nav

Launch → Home → open any screen.

R2 Hello Styles (StyleBoard)

Show palette, headings/body text, primary/outline buttons, chip, stepper.

R3 Intake (2-photo gate)

Pick two photos → counter goes 0/2 → 2/2 → “Next” becomes enabled.

R6 Schedule (Earliest + Flex swap)

Select PM → see Earliest available teaser.

Toggle Flex → tap “Find earlier” → UI updates + log like
Swapped: B-3F ↔ B-5F (PM).

R5 Confirm (QR + reminder)

Tap “Enable 30-min reminder” (demo uses +30s) → notification arrives.

R5 Scanner (verify)

Open Scanner → scan the Confirm QR → see “Job verified: AT-2048.”

3) Mapping to requirements
Requirement	Where / How
R1 Hello World	App.js (home + navigation)
R2 Hello Styles	styles/tokens.js, screens/StyleBoard.js
R3 Image Intake (≥2)	screens/Intake.js + expo-image-picker
R6 Earliest + Flex swap	screens/Schedule.js + utils/swap.js + data/tenants.json
R5 Local notification	screens/Confirm.js + expo-notifications (+ expo-constants)
R5 QR code	screens/Confirm.js + react-native-qrcode-svg
R5 QR scan (on device)	screens/Scanner.js + expo-camera

4) Notes & constraints

Camera/Notifications require Expo Go on device. Web preview won’t work.

First run: accept Camera/Photos/Notifications permissions.

Reminder uses +30 seconds for demo; swap to 1800 seconds for “30 min”.

Scheduling is a prototype using in-memory JSON (no server).

5) Troubleshooting

Red screen / camera module not found: update Expo Go to latest; reopen via My Device.

No camera view / permissions denied: iOS Settings → Expo → Camera (enable). Android → App Info → Permissions.

QR scan fine on web but crashes on phone: you’re likely running browser preview—use My Device.

Notification not shown: ensure permission granted; keep app foreground/background for ~30s.
