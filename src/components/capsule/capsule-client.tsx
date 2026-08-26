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

function PinGate({
  order,
  onVerified,
}: {
  order: CapsuleOrder;
  onVerified: () => void;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (pin === order.pin) {
      sessionStorage.setItem(`capsulePin:${order.revealToken}`, "verified");
      onVerified();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-ivory/60">
        This capsule is protected
      </p>
      <p className="mt-6 font-display text-2xl italic text-ivory/80">
        Enter your keepsake PIN
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          setError(false);
          setPin(e.target.value.replace(/\D/g, ""));
        }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="mt-8 w-full border-0 border-b border-ivory/30 bg-transparent pb-3 text-center font-display text-4xl tracking-[0.3em] text-ivory placeholder:text-ivory/20 focus:border-ivory focus:outline-none"
        placeholder="&middot;&middot;&middot;&middot;"
      />
      {error ? (
        <p className="mt-4 font-sans text-sm text-gold-light">
          That PIN doesn&rsquo;t match — check the printed card and try again.
        </p>
      ) : null}
      <button
        type="button"
        onClick={submit}
        disabled={pin.length !== 4}
        className="mt-8 border border-ivory/50 px-8 py-3 font-sans text-[13px] uppercase tracking-wider2 transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ivory"
      >
        Unlock
      </button>
    </>
  );
}

export function CapsuleClient({ token }: { token: string }) {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState<CapsuleOrder | null>(null);
  const [pinVerified, setPinVerified] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const found = getOrderByToken(token);
    setOrder(found);
    if (found?.tier === "heirloom") {
      setPinVerified(sessionStorage.getItem(`capsulePin:${token}`) === "verified");
    }
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

  if (order.tier === "heirloom" && !pinVerified) {
    return (
      <CapsuleShell>
        <PinGate order={order} onVerified={() => setPinVerified(true)} />
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
