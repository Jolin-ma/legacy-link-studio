"use client";

import type { IntakeData } from "../types";
import { FieldShell, TextField } from "../ui";

export function StepGiver({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">About You</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          You&rsquo;re giving someone their story — so we know who&rsquo;s
          behind the surprise.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <FieldShell label="Your name" required>
          <TextField
            value={data.giverName}
            onChange={(v) => update("giverName", v)}
            placeholder="Your name"
          />
        </FieldShell>

        <FieldShell label="Your email" required>
          <TextField
            type="email"
            value={data.giverEmail}
            onChange={(v) => update("giverEmail", v)}
            placeholder="you@email.com"
          />
        </FieldShell>
      </div>
    </div>
  );
}
