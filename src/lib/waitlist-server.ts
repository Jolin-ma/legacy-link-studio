import {
  BUYER_TYPES,
  EMAIL_PATTERN,
  MONTH_PATTERN,
  OCCASIONS,
  TIER_INTERESTS,
  type WaitlistRow,
} from "./waitlist";

const TABLE = "waitlist_signups";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdekrbba";

export type SignupRow = Omit<WaitlistRow, "id" | "created_at">;

const optional = (v: unknown, max = 500) =>
  typeof v === "string" && v.trim() !== "" ? v.trim().slice(0, max) : null;

/** Returns a clean row, or an error message safe to show the visitor. */
export function parseSubmission(body: unknown): { row: SignupRow } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const b = body as Record<string, unknown>;

  const firstName = optional(b.first_name, 100);
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!firstName) return { error: "Please add your first name." };
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { error: "That email doesn't look right." };
  }
  if (!BUYER_TYPES.includes(b.buyer_type as never)) return { error: "Please choose who it's for." };
  if (!OCCASIONS.includes(b.occasion as never)) return { error: "Please choose the moment." };
  if (!TIER_INTERESTS.includes(b.tier_interest as never)) return { error: "Please choose a film." };

  const month = b.occasion_month;
  if (month !== "unsure" && !(typeof month === "string" && MONTH_PATTERN.test(month))) {
    return { error: "Please choose a month." };
  }

  return {
    row: {
      first_name: firstName,
      email,
      buyer_type: b.buyer_type as SignupRow["buyer_type"],
      occasion: b.occasion as SignupRow["occasion"],
      occasion_month: month === "unsure" ? null : `${month}-01`,
      tier_interest: b.tier_interest as SignupRow["tier_interest"],
      marketing_opt_in: b.marketing_opt_in === true,
      utm_source: optional(b.utm_source),
      utm_medium: optional(b.utm_medium),
      utm_campaign: optional(b.utm_campaign),
      utm_content: optional(b.utm_content),
      referrer: optional(b.referrer, 1000),
      landing_path: optional(b.landing_path),
    },
  };
}

function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return {
    endpoint: `${url.replace(/\/$/, "")}/rest/v1/${TABLE}`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  };
}

export function isDatabaseConfigured() {
  return supabase() !== null;
}

/** Inserts, or updates the existing row when the email is already on the list. */
export async function saveSignup(row: SignupRow): Promise<void> {
  const db = supabase();
  if (!db) {
    // Supabase not configured yet — don't lose the signup, send it to the Formspree inbox.
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: `Waitlist signup — ${row.first_name}`, ...row }),
    });
    if (!res.ok) throw new Error(`Formspree fallback failed (${res.status})`);
    return;
  }

  const res = await fetch(`${db.endpoint}?on_conflict=email`, {
    method: "POST",
    headers: { ...db.headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase upsert failed (${res.status}): ${await res.text()}`);
}

/** All signups, soonest occasion first ("not sure" last). Null when Supabase isn't configured. */
export async function listSignups(): Promise<WaitlistRow[] | null> {
  const db = supabase();
  if (!db) return null;
  const res = await fetch(
    `${db.endpoint}?select=*&order=occasion_month.asc.nullslast,created_at.asc`,
    { headers: db.headers, cache: "no-store" },
  );
  if (!res.ok) throw new Error(`Supabase select failed (${res.status}): ${await res.text()}`);
  return (await res.json()) as WaitlistRow[];
}

export async function sendConfirmationEmail(firstName: string, email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const text = `Hi ${firstName},

Thanks for joining. You're officially on the list.

We're opening to a small group first, and you'll hear from us before anyone else. The first ten couples get founding pricing.

If you have a question in the meantime, just reply to this email. It comes straight to me.

Jolin
Legacy Link`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.WAITLIST_FROM_EMAIL ?? "Jolin at Legacy Link <info@legacylinkstudio.com>",
      to: email,
      reply_to: process.env.WAITLIST_REPLY_TO ?? "info@legacylinkstudio.com",
      subject: "You're on the Legacy Link list",
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed (${res.status}): ${await res.text()}`);
}
