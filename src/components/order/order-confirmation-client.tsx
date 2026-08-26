"use client";

import { useEffect, useState } from "react";
import { getOrderById, type CapsuleOrder } from "@/lib/orders";
import { CapsuleLink } from "./capsule-link";

export function OrderConfirmationClient({ id }: { id: string }) {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState<CapsuleOrder | null>(null);

  useEffect(() => {
    setOrder(getOrderById(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="min-h-[70svh]" />;
  }

  const isGift = !!order?.giverName;

  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center md:px-10">
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
        Order Confirmed
      </p>
      <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
        {isGift
          ? "Their story is on its way to becoming a film."
          : "Your story is on its way to becoming a film."}
      </h1>
      <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
        We&rsquo;ve received everything and production begins now, with an
        estimated delivery in 7&ndash;10 days.
      </p>
      <p className="mt-10 font-sans text-xs uppercase tracking-wider2 text-charcoal/40">
        Order #{id}
      </p>

      {order ? (
        <div className="mt-12 text-left">
          <CapsuleLink token={order.revealToken} />
          {isGift ? (
            <p className="mt-6 font-sans text-sm text-charcoal/60">
              This is a gift for {[order.partner1Name, order.partner2Name]
                .filter(Boolean)
                .join(" & ")}
              . Notifications aren&rsquo;t automated in this build, so
              you&rsquo;ll want to share the link above with them yourself
              when the time is right.
            </p>
          ) : null}
          {order.pin ? (
            <p className="mt-6 font-sans text-sm text-charcoal/60">
              Your keepsake PIN is{" "}
              <span className="font-display text-lg text-charcoal">{order.pin}</span> — it
              travels with the printed card and is asked for whenever the
              capsule is opened on a new device.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
