import type { IntakeData } from "@/components/intake/types";

export type OrderDraft = Pick<
  IntakeData,
  | "giverName"
  | "giverEmail"
  | "notifyMode"
  | "partner1Name"
  | "partner2Name"
  | "milestone"
  | "milestoneOther"
  | "tone"
  | "revealDate"
  | "revealMode"
  | "recipientEmails"
  | "tier"
  | "shippingAddress"
> & {
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
    partner1Name: data.partner1Name,
    partner2Name: data.partner2Name,
    milestone: data.milestone,
    milestoneOther: data.milestoneOther,
    tone: data.tone,
    revealDate: data.revealDate,
    revealMode: data.revealMode,
    recipientEmails: data.recipientEmails,
    tier: data.tier,
    shippingAddress: data.shippingAddress,
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
