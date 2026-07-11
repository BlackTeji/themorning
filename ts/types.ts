export interface DetailCard {
  label: string;
  title: string;
  text: string;
  icon: "ceremony" | "reception" | "time" | "venue" | "dress" | "colors" | "parking";
  mapUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RsvpSubmission {
  fullName: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  guestCount: number;
  message: string;
  submittedAt: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  tall?: boolean;
}
