"use client";

import type { IntakeData } from "../types";
import { FieldShell, TextField, SelectField } from "../ui";

const milestoneOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "anniversary", label: "Anniversary" },
  { value: "proposal", label: "Proposal" },
  { value: "other", label: "Something else" },
];

export function StepCouple({
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
        <p className="font-display text-3xl md:text-4xl">The Couple</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          {isGift
            ? "Now, tell us about the couple you're celebrating."
            : "Let's start with the two of you."}
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <FieldShell label="Partner 1" required>
          <TextField
            value={data.partner1Name}
            onChange={(v) => update("partner1Name", v)}
            placeholder="Their name"
          />
        </FieldShell>

        <FieldShell label="Partner 2" required>
          <TextField
            value={data.partner2Name}
            onChange={(v) => update("partner2Name", v)}
            placeholder="Their name"
          />
        </FieldShell>
      </div>

      <FieldShell
        label="When did your story begin?"
        hint="Roughly is fine — a month and year works."
        required
      >
        <TextField
          type="month"
          value={data.relationshipStart}
          onChange={(v) => update("relationshipStart", v)}
        />
      </FieldShell>

      <FieldShell label="What is this capsule for?" required>
        <SelectField
          value={data.milestone}
          onChange={(v) => update("milestone", v as IntakeData["milestone"])}
          options={milestoneOptions}
        />
      </FieldShell>

      {data.milestone === "other" ? (
        <FieldShell label="Tell us what you're celebrating" required>
          <TextField
            value={data.milestoneOther}
            onChange={(v) => update("milestoneOther", v)}
            placeholder="e.g. moving in together"
          />
        </FieldShell>
      ) : null}
    </div>
  );
}
