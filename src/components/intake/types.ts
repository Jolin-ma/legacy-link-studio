export type Milestone = "wedding" | "anniversary" | "proposal" | "other";

export type Tone = "romantic" | "playful" | "cinematic" | "documentary";

export type MusicPreference = "curated" | "song" | "surprise";

export type RevealMode = "auto" | "on_next_visit_after_date";

export type Tier = "spark" | "forever" | "heirloom";

export type NotifyMode = "on_ready" | "at_reveal";

export interface IntakeData {
  // Gift mode only — collected before everything else when entering via /gift
  giverName: string;
  giverEmail: string;
  notifyMode: NotifyMode | "";

  // Step 1 — The Couple
  partner1Name: string;
  partner2Name: string;
  relationshipStart: string;
  milestone: Milestone | "";
  milestoneOther: string;

  // Step 2 — The Story
  howMet: string;
  earlyDays: string;
  proposalMoment: string;
  secretDetail: string;
  tone: Tone | "";

  // Step 3 — The Footage
  photos: File[];
  videos: File[];
  voiceNote: File | null;
  musicPreference: MusicPreference | "";
  songChoice: string;

  // Step 4 — The Reveal
  revealDate: string;
  revealMode: RevealMode | "";
  recipientEmails: string;
  personalNote: string;

  // Step 5 — Package & Review
  tier: Tier | "";
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export const emptyIntakeData: IntakeData = {
  giverName: "",
  giverEmail: "",
  notifyMode: "",

  partner1Name: "",
  partner2Name: "",
  relationshipStart: "",
  milestone: "",
  milestoneOther: "",

  howMet: "",
  earlyDays: "",
  proposalMoment: "",
  secretDetail: "",
  tone: "",

  photos: [],
  videos: [],
  voiceNote: null,
  musicPreference: "",
  songChoice: "",

  revealDate: "",
  revealMode: "",
  recipientEmails: "",
  personalNote: "",

  tier: "",
  shippingAddress: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};
