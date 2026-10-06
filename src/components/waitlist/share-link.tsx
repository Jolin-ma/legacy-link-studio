"use client";

import { useState } from "react";

export function ShareLink() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/waitlist`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Legacy Link Studio", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Share sheet dismissed or clipboard blocked — nothing to do.
    }
  };

  return (
    <p className="font-sans text-[15px] leading-relaxed text-charcoal/70">
      Know a couple who&rsquo;d love this?{" "}
      <button
        type="button"
        onClick={share}
        className="text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-forest"
      >
        {copied ? "Link copied" : "Send them the link"}
      </button>
      .
    </p>
  );
}
