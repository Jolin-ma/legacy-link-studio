"use client";

import type { IntakeData } from "../types";
import { FieldShell, TextAreaField, RadioGroup } from "../ui";

const toneOptions = [
  { value: "romantic", label: "Romantic & soft" },
  { value: "playful", label: "Playful & fun" },
  { value: "cinematic", label: "Cinematic & dramatic" },
  { value: "documentary", label: "Documentary & candid" },
];

export function StepStory({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">The Story</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          The details only you two would think to include are what make this feel like yours.
        </p>
      </div>

      <FieldShell label="How did you meet?" required>
        <TextAreaField
          value={data.howMet}
          onChange={(v) => update("howMet", v)}
          placeholder="Set the scene — where were you, what happened..."
          rows={4}
        />
      </FieldShell>

      <FieldShell label="First date, or the early days" hint="Optional">
        <TextAreaField
          value={data.earlyDays}
          onChange={(v) => update("earlyDays", v)}
          placeholder="What do you remember most?"
          rows={3}
        />
      </FieldShell>

      <FieldShell label="The proposal — or the moment that matters most" required>
        <TextAreaField
          value={data.proposalMoment}
          onChange={(v) => update("proposalMoment", v)}
          placeholder="Tell us what happened, and how it felt"
          rows={4}
        />
      </FieldShell>

      <FieldShell
        label="A detail only the two of you would know"
        hint="Optional — this is what makes the film feel personal, not generic."
      >
        <TextAreaField
          value={data.secretDetail}
          onChange={(v) => update("secretDetail", v)}
          placeholder="An inside joke, a nickname, a small ritual..."
          rows={3}
        />
      </FieldShell>

      <FieldShell label="What tone should your film take?" required>
        <RadioGroup
          value={data.tone}
          onChange={(v) => update("tone", v as IntakeData["tone"])}
          options={toneOptions}
        />
      </FieldShell>
    </div>
  );
}
