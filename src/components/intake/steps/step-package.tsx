"use client";

import type { IntakeData } from "../types";
import { FieldShell, RadioGroup, TextField } from "../ui";
import { MILESTONE_LABELS, REVEAL_MODE_LABELS, TIER_DETAILS, TONE_LABELS } from "@/lib/intake-labels";

const tierOptions = (Object.entries(TIER_DETAILS) as [keyof typeof TIER_DETAILS, (typeof TIER_DETAILS)[keyof typeof TIER_DETAILS]][]).map(
  ([value, { label, price }]) => ({
    value,
    label: `${label} — $${price}`,
    description: {
      spark: "An animated photo film with music, delivered digitally.",
      forever: "A full cinematic mini-film with AI-recreated scenes and a locked reveal link.",
      heirloom: "Everything in Forever, plus a printed keepsake card shipped to your door.",
    }[value],
  })
);

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b hairline py-4 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
        {label}
      </span>
      <span className="font-sans text-[15px] text-charcoal/85 sm:max-w-md sm:text-right">
        {value}
      </span>
    </div>
  );
}

export function StepPackage({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  const setAddress = (
    field: keyof IntakeData["shippingAddress"],
    value: string
  ) => update("shippingAddress", { ...data.shippingAddress, [field]: value });

  return (
    <div className="space-y-14">
      <div>
        <p className="font-display text-3xl md:text-4xl">Package &amp; Review</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Choose your package, then take one last look before checkout.
        </p>
      </div>

      <FieldShell label="Choose your package" required>
        <RadioGroup
          value={data.tier}
          onChange={(v) => update("tier", v as IntakeData["tier"])}
          options={tierOptions}
        />
      </FieldShell>

      {data.tier === "heirloom" ? (
        <div className="space-y-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/60">
            Shipping address
          </p>
          <div className="grid gap-10 md:grid-cols-2">
            <FieldShell label="Address line 1" required>
              <TextField
                value={data.shippingAddress.line1}
                onChange={(v) => setAddress("line1", v)}
              />
            </FieldShell>
            <FieldShell label="Address line 2" hint="Optional">
              <TextField
                value={data.shippingAddress.line2}
                onChange={(v) => setAddress("line2", v)}
              />
            </FieldShell>
            <FieldShell label="City" required>
              <TextField
                value={data.shippingAddress.city}
                onChange={(v) => setAddress("city", v)}
              />
            </FieldShell>
            <FieldShell label="State / Province" required>
              <TextField
                value={data.shippingAddress.state}
                onChange={(v) => setAddress("state", v)}
              />
            </FieldShell>
            <FieldShell label="Postal code" required>
              <TextField
                value={data.shippingAddress.postalCode}
                onChange={(v) => setAddress("postalCode", v)}
              />
            </FieldShell>
            <FieldShell label="Country" required>
              <TextField
                value={data.shippingAddress.country}
                onChange={(v) => setAddress("country", v)}
              />
            </FieldShell>
          </div>
        </div>
      ) : null}

      <div>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/60">
          Your story, at a glance
        </p>
        <div className="mt-4">
          <SummaryRow label="Gift from" value={data.giverName} />
          <SummaryRow
            label="The couple"
            value={[data.partner1Name, data.partner2Name].filter(Boolean).join(" & ")}
          />
          <SummaryRow label="Story began" value={data.relationshipStart} />
          <SummaryRow
            label="Occasion"
            value={
              data.milestone === "other"
                ? data.milestoneOther
                : MILESTONE_LABELS[data.milestone as keyof typeof MILESTONE_LABELS] ?? ""
            }
          />
          <SummaryRow label="Tone" value={TONE_LABELS[data.tone as keyof typeof TONE_LABELS] ?? ""} />
          <SummaryRow
            label="Photos"
            value={data.photos.length ? `${data.photos.length} uploaded` : ""}
          />
          <SummaryRow
            label="Video clips"
            value={data.videos.length ? `${data.videos.length} uploaded` : ""}
          />
          <SummaryRow label="Voice note" value={data.voiceNote ? "Uploaded" : ""} />
          <SummaryRow
            label="Music"
            value={
              data.musicPreference === "song"
                ? `Song request: ${data.songChoice}`
                : data.musicPreference === "curated"
                ? "Curated instrumental"
                : data.musicPreference === "surprise"
                ? "Surprise us"
                : ""
            }
          />
          <SummaryRow label="Reveal date" value={data.revealDate} />
          <SummaryRow
            label="Reveal mode"
            value={REVEAL_MODE_LABELS[data.revealMode as keyof typeof REVEAL_MODE_LABELS] ?? ""}
          />
          <SummaryRow label="Recipients" value={data.recipientEmails} />
        </div>
      </div>
    </div>
  );
}
