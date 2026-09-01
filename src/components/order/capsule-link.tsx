"use client";

import { useState } from "react";

export function CapsuleLink({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  const path = `/capsule/${token}`;

  const handleCopy = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — the visible link below still works
    }
  };

  return (
    <div className="border-t hairline pt-8">
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
        Your capsule
      </p>
      <p className="mt-3 font-sans text-[15px] text-charcoal/70">
        This private link is yours to keep — bookmark it, or share it with
        whoever should receive the reveal.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href={path}
          className="font-display text-lg text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:text-charcoal"
        >
          {path}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50 transition-colors duration-300 hover:text-charcoal"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
