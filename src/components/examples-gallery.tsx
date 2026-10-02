import { FilmPanel } from "@/components/film-panel";
import { SparkLoops, type SparkLoop } from "@/components/spark-loops";

type Tone = "warm" | "forest" | "rose" | "dark";

export interface SampleStory {
  names: string;
  format: string;
  caption: string;
  tone: Tone;
  videoSrc?: string;
  posterSrc?: string;
  comingSoon?: boolean;
  /** Spark stories show their motion photos as a still-to-motion grid instead of a full-screen panel. */
  loops?: SparkLoop[];
}

const toneGrade: Record<Tone, string> = {
  warm: "grade-warm",
  forest: "grade-forest",
  rose: "grade-rose",
  dark: "grade-dark",
};

/**
 * Every sample story as its own full-screen film panel, separated by ivory
 * gutters. A story without a `videoSrc` shows its graded panel until real
 * footage is dropped in; a story with `loops` renders as a Spark demo grid.
 */
export function ExamplesGallery({ stories }: { stories: SampleStory[] }) {
  return (
    <div className="space-y-16 pb-16 md:space-y-24 md:pb-24">
      {stories.map((story) =>
        story.loops ? (
          <section key={story.names} className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="max-w-2xl">
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
                {story.format}
              </p>
              <h2 className="mt-6 font-display text-4xl font-normal leading-[1.05] md:text-6xl">
                {story.names}
              </h2>
              <p className="mt-6 font-display text-xl italic leading-relaxed text-charcoal/70 md:text-2xl">
                &ldquo;{story.caption}&rdquo;
              </p>
            </div>
            <div className="mt-12 md:mt-16">
              <SparkLoops loops={story.loops} />
            </div>
          </section>
        ) : (
          <FilmPanel
            key={story.names}
            minHeight="100svh"
            videoSrc={story.videoSrc}
            posterSrc={story.posterSrc}
            soundToggle={Boolean(story.videoSrc)}
            containOnMobile
            gradeClass={toneGrade[story.tone]}
          >
            <div className="max-w-2xl">
              {story.comingSoon ? (
                <p className="mb-6 inline-flex rounded-full border border-ivory/40 px-4 py-1.5 font-sans text-[12px] uppercase tracking-wider2 text-ivory/90">
                  Coming soon
                </p>
              ) : null}
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest-light">
                {story.format}
              </p>
              <h2 className="mt-6 font-display text-4xl font-normal leading-[1.05] md:text-6xl lg:text-7xl">
                {story.names}
              </h2>
              <p className="mt-6 font-display text-xl italic leading-relaxed text-ivory/75 md:text-2xl">
                &ldquo;{story.caption}&rdquo;
              </p>
            </div>
          </FilmPanel>
        ),
      )}
    </div>
  );
}
