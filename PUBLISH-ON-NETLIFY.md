# Put the invitation online (free, about 5 minutes)

## A. First publish
1. Go to **app.netlify.com/drop** and sign up (free). Email or Google login both work.
2. Open the **wedding-site** folder on your computer so you can see `index.html` inside it.
3. **Drag the whole wedding-site folder** onto the drop area on the Netlify page. (On a phone, do this from a laptop; phones can't drag folders.)
4. Wait about 30 seconds. Netlify shows a link like `https://random-name-123.netlify.app`. Open it. That is your live site.
5. Give it a nicer name: **Site configuration > Change site name**, e.g. `ishita-arjun`. The link becomes `https://ishita-arjun.netlify.app`.

## B. Make the WhatsApp preview work (one small edit, then publish again)
WhatsApp only shows the picture and title if the picture address is a full web address. So:
1. In VS Code open `index.html` and use Find and Replace (Ctrl/Cmd+H):
   replace `YOUR-SITE.netlify.app` with your real name, e.g. `ishita-arjun.netlify.app` (3 places).
2. Open `config.js` and set `siteUrl: "https://ishita-arjun.netlify.app/"`.
3. In Netlify open your site, then **Deploys**, and **drag the wedding-site folder onto the box that says "Drag and drop your site output folder here"**. The same link updates.
4. Test the preview: paste the link into a WhatsApp chat with yourself. If you ever change the picture or title and WhatsApp still shows the old one, add `?v=2` to the end of the link you send (WhatsApp remembers previews).

## C. Test on your phone before sharing
- Open the link on your phone. Tap the seal, watch the doors open, pinch to zoom, tilt the phone, and scratch the card.
- Try both languages (EN / বাং).
- Try a guest link: `https://ishita-arjun.netlify.app/?guest=Rina` should say "Dear Rina" on the cover and in the welcome.

## D. Guest links
Open `https://ishita-arjun.netlify.app/guests.html`, type names one per line, and tap **Send on WhatsApp** next to each name (it opens WhatsApp with the message and personal link ready; you choose the contact). It also remembers your names on that device.
Note: the WhatsApp preview picture is the same for everyone. Only the cover greeting inside the site is personal.

## Updating later
Change files, then drag the folder onto **Deploys** again. Links stay the same.
