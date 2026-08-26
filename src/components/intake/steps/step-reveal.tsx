"use client";

import type { IntakeData } from "../types";
import { FieldShell, RadioGroup, TextAreaField, TextField } from "../ui";

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

export function StepReveal({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  const isGift = data.giverName.trim() !== "";

  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">The Reveal</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Set the moment your capsule comes to life.
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
    </div>
  );
}
