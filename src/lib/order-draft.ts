import type { IntakeData } from "@/components/intake/types";

export type OrderDraft = Pick<
  IntakeData,
  | "giverName"
  | "giverEmail"
  | "notifyMode"
  | "tier"
  | "partner1Name"
  | "partner2Name"
  | "milestone"
  | "milestoneOther"
  | "relationshipStart"
  | "howMet"
  | "earlyDays"
  | "proposalMoment"
  | "secretDetail"
  | "tone"
  | "musicPreference"
  | "songChoice"
  | "personalNote"
  | "revealDate"
  | "revealMode"
  | "recipientEmails"
  | "displayAddon"
  | "shippingAddress"
  | "sparkTitle"
  | "sparkCaptions"
> & {
  deliveryType: "gallery" | "film";
  sparkPhotoCount: number;
  photoCount: number;
  videoCount: number;
  hasVoiceNote: boolean;
};

const STORAGE_KEY = "legacyLinkOrderDraft";

export function buildOrderDraft(data: IntakeData): OrderDraft {
  return {
    giverName: data.giverName,
    giverEmail: data.giverEmail,
    notifyMode: data.notifyMode,
    tier: data.tier,
    partner1Name: data.partner1Name,
    partner2Name: data.partner2Name,
    milestone: data.milestone,
    milestoneOther: data.milestoneOther,
    relationshipStart: data.relationshipStart,
    howMet: data.howMet,
    earlyDays: data.earlyDays,
    proposalMoment: data.proposalMoment,
    secretDetail: data.secretDetail,
    tone: data.tone,
    musicPreference: data.musicPreference,
    songChoice: data.songChoice,
    personalNote: data.personalNote,
    revealDate: data.tier === "spark" ? "" : data.revealDate,
    revealMode: data.tier === "spark" ? "" : data.revealMode,
    recipientEmails: data.recipientEmails,
    displayAddon: data.tier === "heirloom" ? true : data.displayAddon,
    shippingAddress: data.shippingAddress,
    sparkTitle: data.sparkTitle,
    sparkCaptions: data.sparkCaptions,
    deliveryType: data.tier === "spark" ? "gallery" : "film",
    sparkPhotoCount: data.sparkPhotos.length,
    photoCount: data.photos.length,
    videoCount: data.videos.length,
    hasVoiceNote: data.voiceNote !== null,
  };
}

export function saveOrderDraft(draft: OrderDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function loadOrderDraft(): OrderDraft | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OrderDraft;
  } catch {
    return null;
  }
}

export function clearOrderDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}
