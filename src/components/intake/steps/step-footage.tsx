"use client";

import type { IntakeData } from "../types";
import { FieldShell, FileDropField, SelectField, TextField } from "../ui";

const musicOptions = [
  { value: "curated", label: "Curated instrumental" },
  { value: "song", label: "Send us a song" },
  { value: "surprise", label: "Surprise us" },
];

export function StepFootage({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-12">
      <div>
        <p className="font-display text-3xl md:text-4xl">The Footage</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Anything you can share helps us make the film feel like you. We&rsquo;ll recreate the rest.
        </p>
      </div>

      <FileDropField
        label="Photos"
        hint="5 or more recommended"
        accept="image/*"
        files={data.photos}
        onChange={(files) => update("photos", files)}
      />

      <FileDropField
        label="Video clips"
        hint="Optional"
        accept="video/*"
        files={data.videos}
        onChange={(files) => update("videos", files)}
      />

      <FileDropField
        label="A voice note"
        hint="Optional — a source for narration in your own voice"
        accept="audio/*"
        multiple={false}
        files={data.voiceNote ? [data.voiceNote] : []}
        onChange={(files) => update("voiceNote", files[0] ?? null)}
      />

      <FieldShell label="Music" required>
        <SelectField
          value={data.musicPreference}
          onChange={(v) => update("musicPreference", v as IntakeData["musicPreference"])}
          options={musicOptions}
        />
      </FieldShell>

      {data.musicPreference === "song" ? (
        <FieldShell label="Which song?" required>
          <TextField
            value={data.songChoice}
            onChange={(v) => update("songChoice", v)}
            placeholder="Title — Artist"
          />
        </FieldShell>
      ) : null}
    </div>
  );
}
