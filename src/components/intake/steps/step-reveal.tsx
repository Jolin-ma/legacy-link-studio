"use client";

import type { IntakeData } from "../types";
import { CheckboxField, FieldShell, RadioGroup, TextAreaField, TextField } from "../ui";
import { DISPLAY_ADDON_PRICE, MILESTONE_LABELS, REVEAL_MODE_LABELS, TIER_DETAILS, TONE_LABELS } from "@/lib/intake-labels";

const revealModeOptions = [
  {
    value: "auto",
    label: "Auto-unlock",
    description: "The film plays automatically the moment the date arrives.",
  },
  {
    value: "on_next_visit_after_date",
    label: "Wait for us to open it",
    description: "Ready after the date, but stays locked until we choose to open it — perfect for opening together.",
  },
];

const notifyModeOptions = [
  {
    value: "on_ready",
    label: "As soon as it's ready",
    description: "They'll get the link the moment the film is finished.",
  },
  {
    value: "at_reveal",
    label: "Exactly at the reveal moment",
    description: "Keep it a surprise — nothing arrives until the date itself.",
  },
];

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

export function StepReveal({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  const isGift = data.giverName.trim() !== "";
  const isHeirloom = data.tier === "heirloom";
  const showAddress = isHeirloom || data.displayAddon;

  const setAddress = (field: keyof IntakeData["shippingAddress"], value: string) =>
    update("shippingAddress", { ...data.shippingAddress, [field]: value });

  const tier = data.tier === "" ? null : TIER_DETAILS[data.tier];

  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">The Reveal &amp; Review</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Set the moment your capsule comes to life, then take one last look
          before checkout.
        </p>
      </div>

      <FieldShell label="When should this unlock?" required>
        <TextField
          type="date"
          value={data.revealDate}
          onChange={(v) => update("revealDate", v)}
        />
      </FieldShell>

      <FieldShell label="How should it unlock?" required>
        <RadioGroup
          value={data.revealMode}
          onChange={(v) => update("revealMode", v as IntakeData["revealMode"])}
          options={revealModeOptions}
        />
      </FieldShell>

      <FieldShell
        label={
          isGift
            ? "Where should we send the couple's reveal link?"
            : "Who should receive the reveal link?"
        }
        hint="Separate multiple emails with a comma"
        required
      >
        <TextField
          type="text"
          value={data.recipientEmails}
          onChange={(v) => update("recipientEmails", v)}
          placeholder="name@email.com"
        />
      </FieldShell>

      {isGift ? (
        <FieldShell label="When should they be notified it's ready?" required>
          <RadioGroup
            value={data.notifyMode}
            onChange={(v) => update("notifyMode", v as IntakeData["notifyMode"])}
            options={notifyModeOptions}
          />
        </FieldShell>
      ) : null}

      <FieldShell
        label={isGift ? "Add a note from you" : "Add a personal note"}
        hint={
          isGift
            ? "Optional — included alongside the reveal, so they know it's from you"
            : "Optional — included alongside the reveal, lovely for gift orders"
        }
      >
        <TextAreaField
          value={data.personalNote}
          onChange={(v) => update("personalNote", v)}
          placeholder="A few words from you..."
          rows={3}
        />
      </FieldShell>

      {isHeirloom ? (
        <div className="border-b hairline pb-6 pt-1">
          <span className="font-display text-xl text-charcoal">
            Your Display device is included
          </span>
          <p className="mt-1 font-sans text-sm text-charcoal/60">
            A small LCD device loaded with your film, shipped to your door —
            already part of Heirloom, no separate charge.
          </p>
        </div>
      ) : (
        <CheckboxField
          checked={data.displayAddon}
          onChange={(v) => update("displayAddon", v)}
          label={`Add the Display device (+$${DISPLAY_ADDON_PRICE})`}
          description="A small LCD device loaded with your film, shipped to you. Your capsule still unlocks on your chosen date — only the physical device ships separately and arrives later."
        />
      )}

      {showAddress ? (
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
          <SummaryRow label="Package" value={tier ? `${tier.label} — $${tier.price}` : ""} />
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
          <SummaryRow
            label="Display device"
            value={isHeirloom ? "Included" : data.displayAddon ? `Added (+$${DISPLAY_ADDON_PRICE})` : ""}
          />
        </div>
      </div>
    </div>
  );
}
