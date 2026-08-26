export type Milestone =
  | "wedding"
  | "anniversary"
  | "proposal"
  | "just_started"
  | "few_months"
  | "one_year"
  | "no_milestone"
  | "other";

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

  // Step 1 — Choose Your Package (always first, branches everything after it)
  tier: Tier | "";

  // Spark path — Step 2A: Your Photos
  sparkPhotos: File[];
  sparkCaptions: string[];
  sparkTitle: string;

  // Forever/Heirloom path — Step 2B: The Couple
  partner1Name: string;
  partner2Name: string;
  relationshipStart: string;
  milestone: Milestone | "";
  milestoneOther: string;

  // Forever/Heirloom path — Step 3B: The Story
  howMet: string;
  earlyDays: string;
  proposalMoment: string;
  secretDetail: string;
  tone: Tone | "";

  // Forever/Heirloom path — Step 4B: The Footage
  photos: File[];
  videos: File[];
  voiceNote: File | null;
  musicPreference: MusicPreference | "";
  songChoice: string;

  // Spark: Step 3A / Forever/Heirloom: Step 5B — Delivery & Reveal
  revealDate: string;
  revealMode: RevealMode | "";
  recipientEmails: string;
  personalNote: string;

  // The Display add-on — optional on Spark/Forever, always on for Heirloom
  displayAddon: boolean;
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

  tier: "",

  sparkPhotos: [],
  sparkCaptions: [],
  sparkTitle: "",

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

  displayAddon: false,
  shippingAddress: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};
