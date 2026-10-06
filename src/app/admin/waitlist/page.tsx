import type { Metadata } from "next";
import { listSignups } from "@/lib/waitlist-server";
import type { WaitlistRow } from "@/lib/waitlist";

export const metadata: Metadata = { title: "Waitlist — Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

// Launch target (waitlist spec §8): 100 signups within 6 weeks, or 20 choosing Forever/Heirloom.
const TARGET_TOTAL = 100;
const TARGET_PREMIUM = 20;

function countBy(rows: WaitlistRow[], key: keyof WaitlistRow) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const value = String(row[key] ?? "(none)");
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function formatMonth(date: string | null) {
  if (!date) return "Not sure";
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function Breakdown({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <div>
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">{title}</p>
      <ul className="mt-4 space-y-2">
        {rows.map(([label, n]) => (
          <li key={label} className="flex justify-between border-b hairline pb-2 font-sans text-sm">
            <span>{label}</span>
            <span className="tabular-nums text-charcoal/70">{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AdminWaitlistPage() {
  const rows = await listSignups();

  if (rows === null) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 font-sans text-[15px] text-charcoal/70">
        Supabase isn&rsquo;t configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY — until
        then, signups are forwarded to the Formspree inbox.
      </main>
    );
  }

  const premium = rows.filter((r) => r.tier_interest === "forever" || r.tier_interest === "heirloom").length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">Waitlist</p>
          <h1 className="mt-3 font-display text-5xl font-normal tabular-nums">{rows.length}</h1>
          <p className="mt-2 font-sans text-sm text-charcoal/60">
            {rows.length}/{TARGET_TOTAL} signups · {premium}/{TARGET_PREMIUM} choosing Forever or Heirloom
          </p>
        </div>
        <a
          href="/admin/waitlist/export"
          className="rounded-full bg-forest px-6 py-3 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors hover:bg-forest-deep"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <Breakdown title="By tier" rows={countBy(rows, "tier_interest")} />
        <Breakdown title="By source" rows={countBy(rows, "utm_source")} />
        <Breakdown title="By buyer" rows={countBy(rows, "buyer_type")} />
      </div>

      <div className="mt-16 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left font-sans text-sm">
          <thead>
            <tr className="border-b hairline text-[12px] uppercase tracking-wider2 text-charcoal/50">
              <th className="py-3 pr-4 font-normal">When</th>
              <th className="py-3 pr-4 font-normal">Name</th>
              <th className="py-3 pr-4 font-normal">Email</th>
              <th className="py-3 pr-4 font-normal">Occasion</th>
              <th className="py-3 pr-4 font-normal">Tier</th>
              <th className="py-3 pr-4 font-normal">Buyer</th>
              <th className="py-3 pr-4 font-normal">Source</th>
              <th className="py-3 font-normal">Updates</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b hairline">
                <td className="py-3 pr-4 whitespace-nowrap">{formatMonth(r.occasion_month)}</td>
                <td className="py-3 pr-4">{r.first_name}</td>
                <td className="py-3 pr-4">{r.email}</td>
                <td className="py-3 pr-4">{r.occasion}</td>
                <td className="py-3 pr-4">{r.tier_interest}</td>
                <td className="py-3 pr-4">{r.buyer_type}</td>
                <td className="py-3 pr-4">
                  {[r.utm_source, r.utm_content].filter(Boolean).join(" / ") || "—"}
                </td>
                <td className="py-3">{r.marketing_opt_in ? "Yes" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
