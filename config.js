/* ------------------------------------------------------------------
   ALL wedding details live here. Change this file only; the layout
   never needs to be touched. Every text has an English (en) and a
   Bengali (bn) version.
------------------------------------------------------------------- */
window.WEDDING = {
  // The final public address of the site (used by guests.html to build links). Fill it in after you publish.
  siteUrl: "https://debjani-weds-arpan.site/",


  // Families section (doors): the line shown under each door once it is opened
  parentLines: {
    bride: { en: "Only daughter of late Mr. Netai Chandra Nandy & Mrs. Asima Nandy", bn: "স্বর্গীয় শ্রী নিতাই চন্দ্র নন্দী ও শ্রীমত্যা অসীমা নন্দীর স্নেহের কন্যা" },
    groom: { en: "Only son of Mr. Debabrata Das & Mrs. Susmita Das", bn: "শ্রী দেবব্রত দাস ও শ্রীমতী সুস্মিতা দাসের স্নেহের পুত্র" }
  },
  voiceLabel: { en: "Play", bn: "শুনুন" },

  names: {
    bride: { en: "Debjani", bn: "দেবযানী" },
    groom: { en: "Arpan", bn: "অর্পণ" }
  },

  // Main wedding date and time (ISO, with the time zone offset)
  dateTime: "2026-11-26T19:30:00+05:30",
  durationHours: 4,

  parents: {
    bride: { en: "Mr. Ranjan Sen & Mrs. Mala Sen", bn: "শ্রী রঞ্জন সেন ও শ্রীমতী মালা সেন" },
    groom: { en: "Mr. Suresh Chatterjee & Mrs. Rina Chatterjee", bn: "শ্রী সুরেশ চট্টোপাধ্যায় ও শ্রীমতী রীণা চট্টোপাধ্যায়" }
  },


  // The five wedding rituals shown on the "Wedding Rituals" page (picture, name, one line). Add `date:` (ISO) to show a date and time, or `when:` for a short text.
  rituals: [
    {
      image: "assets/rituals/gaye-holud.webp", date: "2026-11-26T09:30:00+05:30",
      name: { en: "Gaye Holud", bn: "গায়ে হলুদ" },
      note: { en: "Turmeric is applied to the bride and groom with blessings and songs.", bn: "আশীর্বাদ আর গানের মধ্যে বর-কনের গায়ে হলুদ মাখানো হয়।" }
    },
    {
      image: "assets/rituals/saat-paak.webp", when: { en: "On the wedding evening", bn: "বিয়ের সন্ধ্যায়" },
      name: { en: "Saat Paak", bn: "সাত পাক" },
      note: { en: "The bride circles the groom seven times, a bond for a lifetime.", bn: "কনে বরের চারপাশে সাতবার ঘোরে, সারা জীবনের বাঁধন।" }
    },
    {
      image: "assets/rituals/shubho-drishti.webp", when: { en: "On the wedding evening", bn: "বিয়ের সন্ধ্যায়" },
      name: { en: "Shubho Drishti", bn: "শুভ দৃষ্টি" },
      note: { en: "The couple’s first look at each other, from behind two betel leaves.", bn: "দুটি পানপাতার আড়াল থেকে বর-কনের প্রথম চোখে চোখ।" }
    },
    {
      image: "assets/rituals/laja-homa.webp", when: { en: "On the wedding evening", bn: "বিয়ের সন্ধ্যায়" },
      name: { en: "Laja Homa", bn: "লাজ হোম" },
      note: { en: "Puffed rice is offered to the sacred fire, praying for a home of plenty.", bn: "পবিত্র অগ্নিতে খই আহুতি দিয়ে সমৃদ্ধ সংসারের প্রার্থনা।" }
    },
    {
      image: "assets/rituals/sindur-daan.webp", when: { en: "On the wedding evening", bn: "বিয়ের সন্ধ্যায়" },
      name: { en: "Sindur Daan", bn: "সিঁদুর দান" },
      note: { en: "The groom fills the bride’s parting with sindoor, the sacred red.", bn: "বর কনের সিঁথিতে পবিত্র লাল সিঁদুর পরিয়ে দেয়।" }
    }
  ],

  events: [
    {
      date: "2026-11-26T12:00:00+05:30",
      title: { en: "Aiburobhat", bn: "আইবুড়োভাত" },
      note: { en: "Traditional pre-wedding feast for the bride", bn: "কনের জন্য বিবাহ-পূর্ব ঐতিহ্যবাহী ভোজ" }
    },
    {
      date: "2026-11-26T09:30:00+05:30",
      title: { en: "Gaye Holud", bn: "গায়ে হলুদ" },
      note: { en: "Turmeric ceremony with music and colour", bn: "গান ও রঙে হলুদের অনুষ্ঠান" }
    },
    {
      date: "2026-11-26T19:30:00+05:30",
      title: { en: "Biye / Wedding", bn: "বিয়ে" },
      note: { en: "The sacred wedding ceremony", bn: "পবিত্র বিবাহ অনুষ্ঠান" }
    },
    {
      date: "2026-11-26T13:00:00+05:30",
      title: { en: "Bou Bhat", bn: "বউভাত" },
      note: { en: "Reception lunch hosted by the groom's family", bn: "বরপক্ষের পক্ষ থেকে বউভাতের আয়োজন" }
    },
    {
      date: "2026-11-26T19:30:00+05:30",
      title: { en: "Reception", bn: "রিসেপশন" },
      note: { en: "Grand evening reception with dinner", bn: "নৈশভোজসহ সান্ধ্য সংবর্ধনা" }
    }
  ],

  venue: {
    name: { en: "St. Patrick's Community Centre", bn: "সেন্ট প্যাট্রিকস কমিউনিটি সেন্টার" },
    address: { en: "1, Mangal Pandey Road, Dum Dum Cantonment, Rajbari, North Dumdum, Kolkata 700028, West Bengal", bn: "১, মঙ্গল পান্ডে রোড, দমদম ক্যান্টনমেন্ট, রাজবাড়ি, উত্তর দমদম, কলকাতা ৭০০০২৮, পশ্চিমবঙ্গ" },
    mapQuery: "St. Patrick's Church, 1 Mangal Pandey Road, Dum Dum Cantonment, Kolkata 700028",   // used for the embedded map
    mapUrl: ""   // PASTE your exact Google Maps share link here; the "Open in Maps" button uses it. If empty, the button searches mapQuery.
  },

  // The two family panels (live text). Names transcribed from the original pictures: please check every spelling.
  families: {
    bride: {
      title: { en: "Bride", bn: "পাত্রী" },
      lines: [
        { value: { en: "Kalyaniya Debashriya Sarkar", bn: "কল্যাণীয়া দেবশ্রিয়া সরকার" } },
        { label: { en: "Father", bn: "বাবা" }, value: { en: "Dipak Kumar Sarkar", bn: "দীপক কুমার সরকার" } },
        { label: { en: "Mother", bn: "মা" }, value: { en: "Papiya Kha Sarkar", bn: "পাপিয়া খাঁ সরকার" } },
        { label: { en: "Brother", bn: "ভাই" }, value: { en: "Debarjun Sarkar", bn: "দেবার্জুন সরকার" } },
        { label: { en: "Grandfather", bn: "পিতামহ" }, value: { en: "Late Bhupal Chandra Sarkar", bn: "৺ভূপাল চন্দ্র সরকার" } },
        { label: { en: "Grandmother", bn: "পিতামহী" }, value: { en: "Srimatya Anita Sarkar", bn: "শ্রীমত্যা অনিতা সরকার" } },
        { label: { en: "Residence", bn: "নিবাস" }, value: { en: "Balighata", bn: "বালিঘাটা" } },
        { label: { en: "Post", bn: "পোষ্ট" }, value: { en: "Raghunathganj", bn: "রঘুনাথগঞ্জ" } },
        { label: { en: "District", bn: "জেলা" }, value: { en: "Murshidabad", bn: "মুর্শিদাবাদ" } },
        { label: { en: "PIN", bn: "পিন" }, value: { en: "742225", bn: "৭৪২২২৫" } },
        { value: { en: "West Bengal", bn: "পশ্চিমবঙ্গ" } }
      ]
    },
    groom: {
      title: { en: "Groom", bn: "পাত্র" },
      lines: [
        { value: { en: "Kalyaniya Kaulik Ghosh", bn: "কল্যাণীয় কৌলিক ঘোষ" } },
        { label: { en: "Father", bn: "বাবা" }, value: { en: "Kartik Ghosh", bn: "কার্তিক ঘোষ" } },
        { label: { en: "Mother", bn: "মা" }, value: { en: "Achala Ghosh", bn: "অচলা ঘোষ" } },
        { label: { en: "Sister", bn: "দিদি" }, value: { en: "Kausumi Ghosh", bn: "কৌসুমী ঘোষ" } },
        { label: { en: "Brother-in-law", bn: "জামাইবাবু" }, value: { en: "Sunanda Mondal", bn: "সুনন্দ মন্ডল" } },
        { label: { en: "Niece", bn: "ভাগ্নি" }, value: { en: "Shrinika Mondal", bn: "শ্রীনিকা মন্ডল" } },
        { label: { en: "Grandfather", bn: "পিতামহ" }, value: { en: "Late Badal Chandra Ghosh", bn: "৺বাদল চন্দ্র ঘোষ" } },
        { label: { en: "Grandmother", bn: "পিতামহী" }, value: { en: "Late Badan Bala Ghosh", bn: "৺বদন বালা ঘোষ" } },
        { label: { en: "Residence", bn: "নিবাস" }, value: { en: "Baganbari", bn: "বাগানবাড়ি" } },
        { label: { en: "Post", bn: "পোষ্ট" }, value: { en: "Raghunathganj", bn: "রঘুনাথগঞ্জ" } },
        { label: { en: "District", bn: "জেলা" }, value: { en: "Murshidabad", bn: "মুর্শিদাবাদ" } }
      ]
    }
  },

  music: "assets/music.mp3",     // optional; the music button appears only if this file exists

  // Interface texts
  ui: {
    tapToOpen: { en: "Tap to open", bn: "খুলতে ট্যাপ করুন" },
    skip: { en: "Skip", bn: "এড়িয়ে যান" },
    scroll: { en: "Scroll", bn: "স্ক্রল করুন" },
    invited: { en: "You are cordially invited", bn: "আপনাকে সাদর আমন্ত্রণ" },
    welcome: {
      en: "With hearts full of joy and gratitude, we joyfully invite you to celebrate the sacred union of our beloved {bride} and {groom}. Your presence and blessings will make our celebrations truly complete.",
      bn: "আনন্দ ও কৃতজ্ঞতায় ভরা হৃদয়ে আমরা আমাদের প্রিয় {bride} ও {groom}-এর শুভ বিবাহে আপনাকে সাদরে আমন্ত্রণ জানাচ্ছি। আপনার উপস্থিতি ও আশীর্বাদে আমাদের উৎসব পূর্ণতা পাবে।"
    },
    weds: { en: "weds", bn: "ও" },
    brideShutter: { en: "Bride", bn: "পাত্রী" },
    groomShutter: { en: "Groom", bn: "পাত্র" },
    blessing: { en: "We seek your blessings on this new beginning.", bn: "নতুন যাত্রায় আপনাদের আশীর্বাদ কামনা করি।" },
    brideFamily: { en: "Bride's family", bn: "কনের পরিবার" },
    groomFamily: { en: "Groom's family", bn: "বরের পরিবার" },
    weddingDate: { en: "Wedding Date", bn: "বিয়ের তারিখ" },
    scratch: { en: "Scratch the leaves", bn: "পাতায় আঁচড় কাটুন" },
    saveTheDate: { en: "Save the Date", bn: "তারিখটি সংরক্ষণ করুন" },
    celebrations: { en: "The Celebrations", bn: "উৎসবের সূচি" },
    rituals: { en: "Wedding Rituals", bn: "বিয়ের রীতি" },
    venue: { en: "Venue", bn: "অনুষ্ঠানস্থল" },
    openMaps: { en: "Open in Maps", bn: "ম্যাপে খুলুন" },
    dear: { en: "Dear {guest}", bn: "প্রিয় {guest}" },
    calendarTitle: { en: "{bride} & {groom}'s Wedding", bn: "{bride} ও {groom}-এর বিয়ে" }
  }
};
