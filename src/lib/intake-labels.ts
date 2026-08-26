import type { Milestone, RevealMode, Tier, Tone } from "@/components/intake/types";

export const MILESTONE_LABELS: Record<Exclude<Milestone, "">, string> = {
  wedding: "Wedding",
  anniversary: "Anniversary",
  proposal: "Proposal",
  other: "Something else",
};

export const TONE_LABELS: Record<Exclude<Tone, "">, string> = {
  romantic: "Romantic & soft",
  playful: "Playful & fun",
  cinematic: "Cinematic & dramatic",
  documentary: "Documentary & candid",
};

export const REVEAL_MODE_LABELS: Record<Exclude<RevealMode, "">, string> = {
  auto: "Auto-unlock",
  on_next_visit_after_date: "Wait for us to open it",
};

export const TIER_DETAILS: Record<Exclude<Tier, "">, { label: string; price: number }> = {
  spark: { label: "Spark", price: 59 },
  forever: { label: "Forever", price: 149 },
  heirloom: { label: "Heirloom", price: 219 },
};
