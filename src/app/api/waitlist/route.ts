import { NextResponse } from "next/server";
import { parseSubmission, saveSignup, sendConfirmationEmail } from "@/lib/waitlist-server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend it worked so bots don't retry.
  if (body && typeof body === "object" && (body as { company?: unknown }).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseSubmission(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await saveSignup(parsed.row);
  } catch (err) {
    console.error("[waitlist] save failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  try {
    await sendConfirmationEmail(parsed.row.first_name, parsed.row.email);
  } catch (err) {
    // The signup is saved — a failed email shouldn't block the thanks page.
    console.error("[waitlist] confirmation email failed", err);
  }

  return NextResponse.json({ ok: true });
}
