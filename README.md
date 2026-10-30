# Bengali wedding invitation (Debjani & Arpan)

Open this folder in VS Code and click "Go Live" (or run `python3 -m http.server 5500`), then open http://localhost:5500

- `config.js`  -> ALL names, dates, events, venue, notes, music (English + Bengali). Edit only this file.
- `assets/music.mp3` -> optional; the music button appears only if the file exists.

Flow: tap anywhere on the door -> curtains part -> wooden doors swing open -> camera moves through the doorway while the couple walk (assets/walk.mp4) -> the illustrated card (assets/card.webp) -> scroll sections.

- Door layers: assets/door/ (wall, two leaves, two curtains), all cut from the original door picture.
- A small Skip button appears during the walk. Add ?skip to the address to jump straight to the card.
- The walk video has no sound (the music button still works if assets/music.mp3 exists).
- Names, date, venue: config.js only.

## New in this version
- Smoother 3D: draws only while something moves (doors, light, zoom); no constant redraw. Lower pixel ratio, no MSAA on dense screens.
- `PUBLISH-ON-NETLIFY.md` - hosting steps, WhatsApp preview (`assets/og.jpg`), guest links.
- `guests.html` - type names, copy or send each personal link (`?guest=Name`, optional `&lang=bn`).

- Families page (right after the card): assets/fam/ (garland, two windows, frames, couple). It builds in as you scroll and reverses when you scroll back. Tap a closed window to open it. The text lives inside the pictures arch-l / arch-r, so to change names, replace those images.
- The "You are cordially invited" section has been removed.

## New in v10
- Family windows: tapping a window now makes red and pink roses (rose heads plus loose petals) fall and spin gently. The petal burst on the scratch reveal is unchanged.
- "A Secret Awaits You" is now "Wedding Date" (বিয়ের তারিখ in Bengali). The picture of the hands, the two betel leaves and the red vessel is `assets/date/hands.webp` (the "Art Dot Com" caption is cropped out). The two leaves are the scratch surface (`assets/date/leaves.webp`, a green foil in exactly the leaf shape). The day appears in the left red circle, the month and year in the right one; the full date, time and the Save the Date button appear below. The date comes from `dateTime` in config.js.
- The section background is the exact yellow of the picture (#F5E80E), joined to the red families page by a thin red band.
- Falling flowers (window taps and the scratch reveal) are real red roses and petals cut from a garden photo: `assets/fx/rose1-8.webp`, `petal1-6.webp`. Replace those files to change them.

## New in v12 - Wedding Rituals page
- "The Celebrations" list is replaced by a "Wedding Rituals" page (Gaye Holud, Saat Paak, Shubho Drishti, Laja Homa, Sindur Daan). Tap a ritual to change the picture; the picture is shown through shapes that pop in and out (GSAP, saved locally in `assets/vendor/gsap.min.js`, so no internet is needed for it).
- Names, one-line texts (English + Bengali) and pictures live in `config.js` under `rituals`. Pictures are in `assets/rituals/`. Add `date:` to show a date/time under a ritual, or `when:` for a short text.
- The old `events` list is still in `config.js` but no longer shown.

## New in v13
- Removed: the countdown, the Dress Code / Pre-Wedding / Stay / Gifts blocks, and the white-diya divider band (everywhere).
- Venue page now matches the rest: red background, gold heading, map in an arched gold frame (like the family windows).
- The ending is now the yellow blessing picture: `assets/blessing.webp` (replace this file to change it).

## New in v16
- Script font: Playball (self-hosted in assets/fonts) for headings, dates, titles, ritual names and buttons; Tiro Bangla (self-hosted) in Bengali mode.
- Family panels are live text (config.js -> `families`), English and Bengali. Blank arches: assets/fam/arch-*-clean.webp.
- Hero card: Bengali mode uses assets/card-bn.webp with live Bengali names. Ending: English mode uses assets/blessing-en.webp with live text.
- Venue: St. Patrick's Church. Put your exact Google link in config.js `venue.mapUrl`.
- Gaye Holud 9:30 AM; the Save the Date file now holds the wedding and Gaye Holud.
- Music: starts on the door tap, fades in over 2 s to 35%, loops, mute is remembered, pauses when the phone locks.
