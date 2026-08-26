"use client";

import type { IntakeData } from "../types";
import { FieldShell, RadioGroup } from "../ui";
import { TIER_DETAILS } from "@/lib/intake-labels";

const tierOptions = (
  Object.entries(TIER_DETAILS) as [
    keyof typeof TIER_DETAILS,
    (typeof TIER_DETAILS)[keyof typeof TIER_DETAILS]
  ][]
).map(([value, { label, price, format, description }]) => ({
  value,
  label: `${label} — $${price}`,
  description: `${format}. ${description}`,
}));

export function StepPackage({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">Choose Your Package</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          This decides everything that follows — Spark is a short, self-serve
          path; Forever and Heirloom continue into the fuller story intake.
        </p>
      </div>

      <FieldShell label="Which package fits your story?" required>
        <RadioGroup
          value={data.tier}
          onChange={(v) => update("tier", v as IntakeData["tier"])}
          options={tierOptions}
        />
      </FieldShell>
    </div>
  );
}
