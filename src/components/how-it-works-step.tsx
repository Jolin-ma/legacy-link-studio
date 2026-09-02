"use client";

import { SplitSpread } from "@/components/split-spread";

export interface HowItWorksStepData {
  n: string;
  title: string;
  copy: string;
  note?: { q: string; a: string };
}

/**
 * One process step rendered as a full-bleed {@link SplitSpread}: the step
 * number captions the graded image panel, the title and copy sit on paper.
 */
export function HowItWorksStep({
  step,
  index,
  grade,
}: {
  step: HowItWorksStepData;
  index: number;
  grade: "warm" | "forest";
}) {
  return (
    <SplitSpread
      index={index}
      gradeClass={grade === "forest" ? "grade-forest" : "grade-warm"}
      imageLabel={step.n}
    >
      <h3 className="font-display text-3xl font-normal leading-[1.1] md:text-4xl">
        {step.title}
      </h3>
      <p className="mt-5 font-sans text-[15px] leading-relaxed text-charcoal/70">
        {step.copy}
      </p>
      {step.note ? (
        <div className="mt-8 border-t hairline pt-6">
          <p className="font-display text-lg italic">{step.note.q}</p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal/60">
            {step.note.a}
          </p>
        </div>
      ) : null}
    </SplitSpread>
  );
}
