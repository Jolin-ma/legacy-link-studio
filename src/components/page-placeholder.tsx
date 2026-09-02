import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PagePlaceholder({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70svh] items-center bg-ivory">
        <div className="mx-auto max-w-2xl px-6 py-32 md:px-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            {copy}
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
