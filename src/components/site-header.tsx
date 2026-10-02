import Link from "next/link";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay
          ? "absolute top-0 left-0 right-0 z-30 text-ivory"
          : "relative z-30 border-b hairline bg-bone text-charcoal"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-7 pb-4 md:px-10 md:py-7">
        <Link
          href="/"
          className="font-display text-lg tracking-wider2 uppercase text-current"
        >
          Legacy Link&nbsp;Studio
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] uppercase tracking-wider2 text-current/80 transition-colors duration-300 hover:text-current"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/start"
            className="rounded-full border border-current/40 px-5 py-2 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-current"
          >
            Begin Your Story
          </Link>
        </nav>

        <Link
          href="/start"
          className="font-sans text-[13px] uppercase tracking-wider2 md:hidden"
        >
          Begin
        </Link>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-5 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-sans text-[11px] uppercase tracking-wider2 text-current/80 transition-colors duration-300 hover:text-current"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
