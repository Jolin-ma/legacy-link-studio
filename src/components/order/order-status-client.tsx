"use client";

import { useEffect, useState } from "react";
import {
  advanceDisplayFulfillment,
  getOrderById,
  markOrderReady,
  updateRevealAt,
  type CapsuleOrder,
  type DisplayFulfillmentStatus,
} from "@/lib/orders";
import { CapsuleLink } from "./capsule-link";

function toDateInputValue(timestamp: number | null): string {
  if (timestamp === null) return "";
  const d = new Date(timestamp);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

const DISPLAY_STATUS_LABELS: Record<DisplayFulfillmentStatus, string> = {
  sourcing: "Sourcing your device",
  loaded: "Loaded with your content",
  shipped: "Shipped",
  delivered: "Delivered",
};

export function OrderStatusClient({ id }: { id: string }) {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState<CapsuleOrder | null>(null);
  const [revealDateInput, setRevealDateInput] = useState("");

  useEffect(() => {
    const found = getOrderById(id);
    setOrder(found);
    setRevealDateInput(toDateInputValue(found?.revealAt ?? null));
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="min-h-[70svh]" />;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center md:px-10">
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
          Order #{id}
        </p>
        <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
          We couldn&rsquo;t find this order.
        </h1>
        <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
          It may have been placed on a different device or browser.
        </p>
      </div>
    );
  }

  const isSpark = order.tier === "spark";
  const statusLine = isSpark
    ? "Your gallery is ready."
    : order.status === "in_production"
    ? "Your story is being brought to life."
    : "Your film is ready, and waiting for its reveal moment.";

  return (
    <div className="mx-auto max-w-xl px-6 py-32 md:px-10">
      <div className="text-center">
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
          Order #{id}
        </p>
        <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
          {statusLine}
        </h1>
        {!isSpark && order.status === "in_production" ? (
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Estimated delivery: within 7&ndash;10 days of your order date.
            We&rsquo;ll email you the moment your capsule is ready.
          </p>
        ) : null}
      </div>

      <div className="mt-16">
        <CapsuleLink token={order.revealToken} />
      </div>

      {order.displayAddon && order.displayFulfillment ? (
        <div className="mt-16 border-t hairline pt-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
            Your Display device
          </p>
          <p className="mt-2 font-sans text-sm text-charcoal/60">
            Tracked separately from your {order.deliveryType === "gallery" ? "gallery" : "film"} above &mdash;
            this is the physical leg, on its own clock.
          </p>
          <p className="mt-4 font-display text-2xl text-charcoal">
            {DISPLAY_STATUS_LABELS[order.displayFulfillment.status]}
          </p>
          {order.displayFulfillment.trackingNumber ? (
            <p className="mt-2 font-sans text-sm text-charcoal/60">
              Tracking: {order.displayFulfillment.trackingNumber}
            </p>
          ) : null}
          {order.displayFulfillment.status !== "delivered" ? (
            <p className="mt-2 font-sans text-sm text-charcoal/60">
              Estimated arrival: {order.displayFulfillment.estimatedDelivery}
            </p>
          ) : null}
          {order.displayFulfillment.status !== "delivered" ? (
            <div className="mt-6">
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
                Demo control
              </p>
              <button
                type="button"
                onClick={() => {
                  const updated = advanceDisplayFulfillment(order.id);
                  if (updated) setOrder(updated);
                }}
                className="mt-4 rounded-full border border-charcoal/40 px-6 py-3 font-sans text-[13px] uppercase tracking-wider2 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                Advance display fulfillment
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {!isSpark ? (
        <div className="mt-16 space-y-10 border-t hairline pt-10">
          <div>
            <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
              Change your reveal date
            </p>
            <p className="mt-2 font-sans text-sm text-charcoal/60">
              Plans change — update the date your capsule unlocks.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <input
                type="date"
                value={revealDateInput}
                onChange={(e) => setRevealDateInput(e.target.value)}
                className="border-0 border-b hairline bg-transparent pb-2 font-display text-xl text-charcoal focus:outline-none focus:border-forest"
              />
              <button
                type="button"
                onClick={() => {
                  if (!revealDateInput) return;
                  setOrder(updateRevealAt(order.id, revealDateInput));
                }}
                className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50 transition-colors duration-300 hover:text-charcoal"
              >
                Update
              </button>
            </div>
          </div>

          {order.status === "in_production" ? (
            <div>
              <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
                Demo control
              </p>
              <p className="mt-2 font-sans text-sm text-charcoal/60">
                This build has no production pipeline — use this to simulate
                your film becoming ready, and see the capsule unlock.
              </p>
              <button
                type="button"
                onClick={() => setOrder(markOrderReady(order.id))}
                className="mt-4 rounded-full border border-charcoal/40 px-6 py-3 font-sans text-[13px] uppercase tracking-wider2 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                Mark as ready for delivery
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
