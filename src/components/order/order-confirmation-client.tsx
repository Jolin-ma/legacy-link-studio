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
  const isSpark = order?.tier === "spark";
  const deliveryWord = order?.deliveryType === "gallery" ? "gallery" : "film";

  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center md:px-10">
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
        Order Confirmed
      </p>
      <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
        {isSpark
          ? isGift
            ? "Their gallery is coming to life."
            : "Your gallery is coming to life."
          : isGift
          ? "Their story is on its way to becoming a film."
          : "Your story is on its way to becoming a film."}
      </h1>
      <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
        {isSpark
          ? "We've received your photos and generation is underway — your gallery link is ready below."
          : "We've received everything and production begins now, with an estimated delivery in 7–10 days."}
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
          {order.displayAddon && order.displayFulfillment ? (
            <p className="mt-6 font-sans text-sm text-charcoal/60">
              {isSpark
                ? `Your ${deliveryWord} is ready above`
                : `Your ${deliveryWord} above will unlock on its own timeline`}{" "}
              &mdash; your Display device is a separate leg, on its way and
              expected around{" "}
              <span className="text-charcoal/80">
                {order.displayFulfillment.estimatedDelivery}
              </span>
              . We&rsquo;ll track it on your order status page, not this one.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
