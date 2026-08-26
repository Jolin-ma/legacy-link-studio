"use client";

import { useEffect, useState } from "react";
import { getOrderById, markOrderReady, updateRevealAt, type CapsuleOrder } from "@/lib/orders";
import { CapsuleLink } from "./capsule-link";

function toDateInputValue(timestamp: number | null): string {
  if (timestamp === null) return "";
  const d = new Date(timestamp);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

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
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
          Order #{id}
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
          We couldn&rsquo;t find this order.
        </h1>
        <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
          It may have been placed on a different device or browser.
        </p>
      </div>
    );
  }

  const statusLine =
    order.status === "in_production"
      ? "Your story is being brought to life."
      : "Your film is ready, and waiting for its reveal moment.";

  return (
    <div className="mx-auto max-w-xl px-6 py-32 md:px-10">
      <div className="text-center">
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-gold">
          Order #{id}
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
          {statusLine}
        </h1>
        {order.status === "in_production" ? (
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Estimated delivery: within 7&ndash;10 days of your order date.
            We&rsquo;ll email you the moment your capsule is ready.
          </p>
        ) : null}
      </div>

      <div className="mt-16">
        <CapsuleLink token={order.revealToken} />
      </div>

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
              className="border-0 border-b hairline bg-transparent pb-2 font-display text-xl text-charcoal focus:outline-none focus:border-gold"
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
              className="mt-4 border border-charcoal/40 px-6 py-3 font-sans text-[13px] uppercase tracking-wider2 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Mark as ready for delivery
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
