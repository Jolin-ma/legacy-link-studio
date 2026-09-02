"use client";

import type { IntakeData } from "../types";
import { CaptionedPhotosField, FieldShell, TextField } from "../ui";

const MAX_SPARK_PHOTOS = 4;

export function StepSparkPhotos({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">Your Photos</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Choose 4 of your favorites. Each one gets its own short
          looping motion piece &mdash; no milestone required, just the
          moments you want to keep.
        </p>
      </div>

      <CaptionedPhotosField
        label="Photos"
        hint={`Choose your ${MAX_SPARK_PHOTOS} favorites`}
        max={MAX_SPARK_PHOTOS}
        files={data.sparkPhotos}
        captions={data.sparkCaptions}
        onChange={(files, captions) => {
          update("sparkPhotos", files);
          update("sparkCaptions", captions);
        }}
      />

      <FieldShell label="A title for the set" hint="Optional — partner names, or anything you'd like">
        <TextField
          value={data.sparkTitle}
          onChange={(v) => update("sparkTitle", v)}
          placeholder="e.g. Maya & Theo"
        />
      </FieldShell>
    </div>
  );
}
