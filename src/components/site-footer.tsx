import Link from "next/link";

const columns = [
  {
    heading: "Legacy Link Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-xl">Legacy Link Studio</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/70">
              Every love story deserves its own film.
            </p>
          </div>

          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="font-sans text-[12px] uppercase tracking-wider2 text-charcoal/50">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-charcoal/80 transition-colors duration-300 hover:text-charcoal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-xs">
            <p className="font-sans text-[12px] uppercase tracking-wider2 text-charcoal/50">
              Contact
            </p>
            <a
              href="mailto:info@legacylinkstudio.com"
              className="mt-4 block font-sans text-sm text-charcoal/80 transition-colors duration-300 hover:text-charcoal"
            >
              info@legacylinkstudio.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t hairline pt-6 md:flex-row md:items-center">
          <p className="font-sans text-xs text-charcoal/50">
            &copy; {new Date().getFullYear()} Legacy Link Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
