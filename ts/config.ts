import type { DetailCard, FaqItem, GalleryImage } from "./types.js";

export const COUPLE = {
  brideFirst: "Adebusola",
  brideFull: "Adebusola Ademilola",
  groomFirst: "Martinez",
  groomFull: "Martinez Oghenetejiri",
  monogram: "AM",
  hashtag: "#WhereOurMorningBegins",
};

export const WEDDING_DATE_ISO = "2026-08-28T14:00:00";
export const WEDDING_DATE_DISPLAY = "August 28, 2026";

export const HERO_COPY = {
  eyebrow: "Together with our families",
  invite: "we joyfully invite you to celebrate our wedding",
};

export const HERO_MEDIA = {
  enabled: true,
  mp4: "assets/video/hero-sunrise.mp4",
  webm: "assets/video/hero-sunrise.webm",
  poster: "assets/video/hero-poster.svg",
};

export const DETAILS: DetailCard[] = [
  {
    icon: "ceremony",
    label: "Ceremony",
    title: "The Traditional Wedding",
    text: "A joyous traditional wedding ceremony uniting the Sofowora and Esiekpe families in celebration of Adebusola & Martinez.",
  },
  {
    icon: "time",
    label: "Time",
    title: "2:00 PM",
    text: "Guests are kindly asked to arrive a little before 2:00 PM, as the ceremony begins promptly.",
  },
  {
    icon: "dress",
    label: "Dress Code",
    title: "Traditional Attire",
    text: "There's no aso-ebi for this celebration — we'd simply love to see everyone dressed in their most beautiful traditional attire.",
  },
  {
    icon: "venue",
    label: "Venue",
    title: "Gallant Event Center",
    text: "1A Jumat Olukoya Street, Ojota, Lagos.",
    mapUrl: "https://maps.google.com/?q=1A+Jumat+Olukoya+Street+Ojota+Lagos",
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "What time should I arrive?",
    answer: "Please plan to arrive a little before 2:00 PM so we can all be seated before the ceremony begins.",
  },
  {
    question: "What should I wear?",
    answer: "There's no aso-ebi for this celebration — we'd simply love to see everyone dressed in their most beautiful traditional attire.",
  },
  {
    question: "Can I bring a plus-one?",
    answer: "We've kept our guest list carefully arranged, so we're only able to accommodate the guests named on your invitation. Thank you for understanding.",
  },
  {
    question: "By when should I RSVP?",
    answer: "We'd love to hear from you by August 15, 2026, so we can finalize seating and catering.",
  },
];

export const GALLERY: GalleryImage[] = [
  { src: "images/gallery/01.jpg", alt: "Adebusola and Martinez walking together at sunrise", tall: true },
  { src: "images/gallery/02.jpg", alt: "A close, quiet moment between Adebusola and Martinez" },
  { src: "images/gallery/03.jpg", alt: "Hands intertwined in soft morning light" },
  { src: "images/gallery/04.jpg", alt: "Adebusola and Martinez laughing together", tall: true },
  { src: "images/gallery/05.jpg", alt: "A candid portrait taken at golden hour" },
  { src: "images/gallery/06.jpg", alt: "A treasured moment between Adebusola and Martinez" },
  { src: "images/gallery/07.jpg", alt: "Adebusola and Martinez silhouetted against the horizon", tall: true },
  { src: "images/gallery/08.jpg", alt: "A detail shot from the couple's engagement" },
];

export const GIFT_COPY = {
  title: "Your presence is the greatest gift.",
  subtitle: "However, if you'd like to bless us as we begin this new chapter, a contribution toward our new home would be treasured.",
  buttonLabel: "Gift Details",
};

export const GIFT_ACCOUNT = {
  accountNumber: "0121883875",
  bankName: "Sterling Bank",
  accountName: "Adebusola Sofowora",
};

export const FOOTER_COPY = {
  message: "We can't wait to celebrate with you.",
};

export const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwVmYU-7_iVJAgZljeei70rqOL03zu3TCazPFcqITJ1C20nZZHaK12MZH1NhcE5bHSR/exec";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCht2QP0UmxtzILWJ2_HiqVAWwBJZ7yYW0",
  authDomain: "am-rsvp-84151.firebaseapp.com",
  projectId: "am-rsvp-84151",
  storageBucket: "am-rsvp-84151.firebasestorage.app",
  messagingSenderId: "540774010738",
  appId: "1:540774010738:web:8d2ce85b472ac5c809d7eb",
};

export const FIRESTORE_COLLECTION = "rsvps";
