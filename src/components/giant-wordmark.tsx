/**
 * Oversized closing wordmark — the studio name set at display scale and
 * allowed to bleed past the viewport edges. A quiet signature at the foot
 * of interior pages.
 */
export function GiantWordmark({ text = "Legacy Link Studio" }: { text?: string }) {
  return (
    <div className="overflow-hidden border-t hairline bg-ivory">
      <p className="whitespace-nowrap px-6 py-14 text-center font-display text-[clamp(2rem,10.5vw,10rem)] font-normal leading-none tracking-tight text-charcoal md:py-20">
        {text}
      </p>
    </div>
  );
}
