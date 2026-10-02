import {
  DISPLAY_ADDON_PRICE,
  MILESTONE_LABELS,
  REVEAL_MODE_LABELS,
  TIER_DETAILS,
  TONE_LABELS,
} from "./intake-labels";
import type { OrderDraft } from "./order-draft";

/**
 * Formspree form "Legacy Link Studio Orders". The endpoint is public by
 * design — it's the same URL a plain HTML form would put in `action`.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdekrbba";

const MUSIC_LABELS = {
  curated: "Curated for us",
  song: "A specific song",
  surprise: "Surprise us",
} as const;

export function orderTotal(draft: OrderDraft): number {
  if (draft.tier === "") return 0;
  const base = TIER_DETAILS[draft.tier].price;
  // Heirloom's Display is bundled into its price already — don't double-charge.
  const addon = draft.displayAddon && draft.tier !== "heirloom" ? DISPLAY_ADDON_PRICE : 0;
  return base + addon;
}

/**
 * Flattens an order into labelled, human-readable fields so the Formspree
 * notification email and dashboard read like an order sheet. Empty fields
 * are dropped. Card details are never part of this — they don't reach
 * OrderDraft at all.
 */
function buildPayload(orderId: string, contactEmail: string, draft: OrderDraft) {
  const tierLabel = draft.tier === "" ? "" : TIER_DETAILS[draft.tier].label;
  const couple = [draft.partner1Name, draft.partner2Name].filter(Boolean).join(" & ");
  const occasion =
    draft.milestone === "other"
      ? draft.milestoneOther
      : draft.milestone === ""
      ? ""
      : MILESTONE_LABELS[draft.milestone];
  const hasDisplay = draft.displayAddon || draft.tier === "heirloom";
  const address = draft.shippingAddress;

  const fields: Record<string, string> = {
    _subject: `New order ${orderId} — ${tierLabel}${couple ? ` for ${couple}` : ""}`,
    email: contactEmail,
    "Order ID": orderId,
    Package: tierLabel,
    Total: `$${orderTotal(draft)}`,
    "Gift from": draft.giverName,
    "Giver email": draft.giverEmail,
    "Notify giver": draft.notifyMode === "on_ready" ? "When ready" : draft.notifyMode === "at_reveal" ? "At reveal" : "",
    Couple: couple,
    "Together since": draft.relationshipStart,
    Occasion: occasion,
    "How they met": draft.howMet,
    "Early days": draft.earlyDays,
    "Proposal moment": draft.proposalMoment,
    "Secret detail": draft.secretDetail,
    Tone: draft.tone === "" ? "" : TONE_LABELS[draft.tone],
    Music: draft.musicPreference === "" ? "" : MUSIC_LABELS[draft.musicPreference],
    Song: draft.songChoice,
    "Spark title": draft.sparkTitle,
    "Spark captions": draft.sparkCaptions.filter(Boolean).join(" | "),
    Photos: String(draft.tier === "spark" ? draft.sparkPhotoCount : draft.photoCount),
    "Video clips": draft.tier === "spark" ? "" : String(draft.videoCount),
    "Voice note": draft.hasVoiceNote ? "Yes" : "",
    "Reveal date": draft.revealDate,
    "Reveal mode": draft.revealMode === "" ? "" : REVEAL_MODE_LABELS[draft.revealMode],
    Recipients: draft.recipientEmails,
    "Personal note": draft.personalNote,
    "Display device": draft.tier === "heirloom" ? "Included" : draft.displayAddon ? "Added" : "",
    "Ships to": hasDisplay
      ? [address.line1, address.line2, address.city, address.state, address.postalCode, address.country]
          .filter(Boolean)
          .join(", ")
      : "",
  };

  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== ""));
}

export async function submitOrder(
  orderId: string,
  contactEmail: string,
  draft: OrderDraft,
): Promise<void> {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(buildPayload(orderId, contactEmail, draft)),
  });
  if (!res.ok) {
    throw new Error(`Order submission failed (${res.status})`);
  }
}
