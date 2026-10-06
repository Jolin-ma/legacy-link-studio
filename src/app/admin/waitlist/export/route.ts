import { listSignups } from "@/lib/waitlist-server";
import type { WaitlistRow } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const COLUMNS: (keyof WaitlistRow)[] = [
  "created_at",
  "first_name",
  "email",
  "buyer_type",
  "occasion",
  "occasion_month",
  "tier_interest",
  "marketing_opt_in",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "referrer",
  "landing_path",
];

function cell(value: unknown) {
  const s = value === null || value === undefined ? "" : String(value);
  // Quote everything; neutralise leading formula characters for spreadsheet apps.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const rows = await listSignups();
  if (rows === null) {
    return new Response("Supabase isn't configured.", { status: 503 });
  }

  const csv = [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((c) => cell(r[c])).join(","))].join("\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="waitlist-${date}.csv"`,
    },
  });
}
