"use client";

import { useEffect, useState } from "react";
import { getOrderByToken, markUnlocked, type CapsuleOrder } from "@/lib/orders";

const GRADIENT =
  "radial-gradient(120% 90% at 50% 30%, #4a392b 0%, #2b2019 55%, #17110c 100%)";

function CapsuleShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-ivory">
      <div className="absolute inset-0" style={{ backgroundImage: GRADIENT }} />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </main>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Countdown({ revealAt, now }: { revealAt: number; now: number }) {
  const remaining = Math.max(0, revealAt - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <p className="mt-4 font-display text-5xl font-light md:text-7xl">
      {days} : {pad(hours)} : {pad(minutes)} : {pad(seconds)}
    </p>
  );
}

function SparkGallery({ order }: { order: CapsuleOrder }) {
  const count = order.sparkCaptions.length || 3;
  const items = Array.from({ length: count }, (_, i) => ({
    n: i + 1,
    caption: order.sparkCaptions[i] ?? "",
  }));

  return (
    <>
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
        {order.sparkTitle || "Your Gallery"}
      </p>
      <p className="mt-6 font-sans text-sm text-ivory/50">
        This is yours to keep, and to watch again whenever you&rsquo;d like.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 text-left">
        {items.map((item) => (
          <div key={item.n} className="aspect-[3/4] border border-ivory/15 p-4">
            <span className="font-sans text-[11px] uppercase tracking-wider2 text-ivory/40">
              {String(item.n).padStart(2, "0")}
            </span>
            {item.caption ? (
              <p className="mt-2 font-display text-sm italic text-ivory/70">
                &ldquo;{item.caption}&rdquo;
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

export function CapsuleClient({ token }: { token: string }) {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState<CapsuleOrder | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setOrder(getOrderByToken(token));
    setLoaded(true);
  }, [token]);

  useEffect(() => {
    if (!order || order.unlockedAt) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [order]);

  const isReady = order?.status === "ready";
  const isPastRevealTime = order ? order.revealAt === null || now >= order.revealAt : false;
  const isUnlocked =
    order?.unlockedAt != null || (isReady && isPastRevealTime && order?.revealMode === "auto");

  useEffect(() => {
    if (order && isReady && isPastRevealTime && order.revealMode === "auto" && !order.unlockedAt) {
      const updated = markUnlocked(token);
      if (updated) setOrder(updated);
    }
  }, [order, isReady, isPastRevealTime, token]);

  if (!loaded) {
    return <main className="min-h-svh bg-espresso" />;
  }

  if (!order) {
    return (
      <CapsuleShell>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
          Legacy Link Studio
        </p>
        <p className="mt-6 font-display text-2xl italic text-ivory/80">
          This link isn&rsquo;t one we recognize.
        </p>
        <p className="mt-4 font-sans text-sm text-ivory/50">
          Double-check the link, or reach out if you think this is a mistake.
        </p>
      </CapsuleShell>
    );
  }

  const names = [order.partner1Name, order.partner2Name].filter(Boolean).join(" & ");

  if (!isReady) {
    return (
      <CapsuleShell>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
          {names}
        </p>
        <p className="mt-8 font-display text-2xl italic text-ivory/80">
          Your story is being crafted.
        </p>
        <p className="mt-4 font-sans text-sm text-ivory/50">
          Come back soon — this link will hold your film the moment it&rsquo;s
          ready.
        </p>
      </CapsuleShell>
    );
  }

  if (isUnlocked) {
    if (order.deliveryType === "gallery") {
      return (
        <CapsuleShell>
          <SparkGallery order={order} />
        </CapsuleShell>
      );
    }
    return (
      <CapsuleShell>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
          {names}
        </p>
        <p className="mt-8 font-display text-4xl md:text-5xl">Your Story</p>
        <p className="mt-6 font-sans text-sm text-ivory/50">
          This is yours to keep, and to watch again whenever you&rsquo;d like.
        </p>
      </CapsuleShell>
    );
  }

  if (isPastRevealTime) {
    return (
      <CapsuleShell>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
          {names}
        </p>
        <p className="mt-8 font-display text-2xl italic text-gold-light">
          Your story is ready.
        </p>
        <button
          type="button"
          onClick={() => {
            const updated = markUnlocked(token);
            if (updated) setOrder(updated);
          }}
          className="mt-8 border border-ivory/50 px-8 py-4 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso"
        >
          Open when you&rsquo;re ready
        </button>
      </CapsuleShell>
    );
  }

  return (
    <CapsuleShell>
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
        {names}
      </p>
      <p className="mt-8 font-display text-2xl italic text-gold-light">
        Your story unlocks in
      </p>
      {order.revealAt !== null ? <Countdown revealAt={order.revealAt} now={now} /> : null}
      <p className="mt-8 font-sans text-sm text-ivory/50">
        Days &middot; Hours &middot; Minutes &middot; Seconds
      </p>
    </CapsuleShell>
  );
}
