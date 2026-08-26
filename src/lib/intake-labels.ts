import type { Milestone, RevealMode, Tier, Tone } from "@/components/intake/types";

export const MILESTONE_LABELS: Record<Exclude<Milestone, "">, string> = {
  wedding: "Wedding",
  anniversary: "Anniversary",
  proposal: "Proposal",
  just_started: "Just started dating",
  few_months: "A few months in",
  one_year: "One year together",
  no_milestone: "No particular milestone — just because",
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

export const TIER_DETAILS: Record<
  Exclude<Tier, "">,
  { label: string; price: number; format: string; description: string }
> = {
  spark: {
    label: "Spark",
    price: 59,
    format: "Self-serve photo booth · 3–4 motion photos",
    description:
      "Upload your favorite photos and watch each one come to life with subtle AI motion — delivered as a small gallery, fully automated, no waiting on a milestone.",
  },
  forever: {
    label: "Forever",
    price: 169,
    format: "Commissioned film · 60–90 sec cinematic trailer",
    description:
      "A full cinematic mini-film blending your own footage with AI-recreated scenes, optional narration, and a locked-reveal link that unlocks on your chosen date. One round of revisions included.",
  },
  heirloom: {
    label: "Heirloom",
    price: 209,
    format: "Commissioned film · 60–90 sec cinematic trailer",
    description:
      "Everything in Forever, plus the Display device included — a real bundle discount versus buying it separately.",
  },
};

export const DISPLAY_ADDON_PRICE = 59;
export const HEIRLOOM_SEPARATE_PRICE = TIER_DETAILS.forever.price + DISPLAY_ADDON_PRICE;
