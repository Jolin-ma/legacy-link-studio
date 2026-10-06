/** First-touch attribution for the visit, captured once and sent with the waitlist form. */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "referrer",
  "landing_path",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "ll_attribution";

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = { landing_path: window.location.pathname };
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const) {
      const value = params.get(key);
      if (value) data[key] = value;
    }
    // Same-site referrers are just internal navigation, not a source.
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      data.referrer = document.referrer;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked (some in-app browsers) — attribution is best-effort.
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
