"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FieldShell, SelectField, TextField } from "@/components/intake/ui";
import { readAttribution } from "@/lib/attribution";
import {
  EMAIL_PATTERN,
  WAITLIST_TIERS,
  type BuyerType,
  type Occasion,
  type TierInterest,
} from "@/lib/waitlist";

interface WaitlistData {
  buyerType: BuyerType | "";
  occasion: Occasion | "";
  occasionMonth: string; // "YYYY-MM", "unsure", or "" (not answered)
  tier: TierInterest | "";
  firstName: string;
  email: string;
  marketingOptIn: boolean;
  company: string; // honeypot
}

const OCCASION_OPTIONS: { value: Occasion; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "anniversary", label: "Anniversary" },
  { value: "proposal", label: "Proposal" },
  { value: "other", label: "Something else" },
];

/** This month plus the next 23, as "YYYY-MM" options. */
function upcomingMonths() {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return { value, label };
  });
}

/** Large text block with a hairline border that fills with the accent when selected. */
function Choice({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`block w-full border px-5 py-5 text-left transition-colors duration-300 md:px-6 ${
        active
          ? "border-forest bg-forest text-ivory"
          : "hairline text-charcoal md:hover:border-charcoal/40"
      }`}
    >
      {children}
    </button>
  );
}

function StepHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[1.75rem] font-normal leading-[1.15] md:text-4xl">
      {children}
    </h2>
  );
}

export function WaitlistFlow({ initialTier }: { initialTier: TierInterest | "" }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [months] = useState(upcomingMonths);
  const [data, setData] = useState<WaitlistData>({
    buyerType: "",
    occasion: "",
    occasionMonth: "",
    tier: initialTier,
    firstName: "",
    email: "",
    marketingOptIn: false,
    company: "",
  });

  const update = <K extends keyof WaitlistData>(key: K, value: WaitlistData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const steps: { isValid: boolean; render: () => ReactNode }[] = [
    {
      isValid: data.buyerType !== "",
      render: () => (
        <>
          <StepHeading>Who is this for?</StepHeading>
          <div className="mt-10 space-y-3">
            <Choice active={data.buyerType === "couple"} onSelect={() => update("buyerType", "couple")}>
              <span className="font-display text-xl md:text-2xl">For us, it&rsquo;s our story</span>
            </Choice>
            <Choice active={data.buyerType === "gift"} onSelect={() => update("buyerType", "gift")}>
              <span className="font-display text-xl md:text-2xl">It&rsquo;s a gift for someone else</span>
            </Choice>
          </div>
        </>
      ),
    },
    {
      isValid: data.occasion !== "" && data.occasionMonth !== "",
      render: () => (
        <>
          <StepHeading>What&rsquo;s the moment?</StepHeading>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {OCCASION_OPTIONS.map((opt) => (
              <Choice
                key={opt.value}
                active={data.occasion === opt.value}
                onSelect={() => update("occasion", opt.value)}
              >
                <span className="font-display text-lg md:text-xl">{opt.label}</span>
              </Choice>
            ))}
          </div>
          <div className="mt-12">
            <FieldShell
              label="Roughly when is it?"
              hint="A rough month is fine. It helps us know when to reach out."
            >
              <SelectField
                value={data.occasionMonth}
                onChange={(v) => update("occasionMonth", v)}
                placeholder="Choose a month"
                options={[...months, { value: "unsure", label: "Not sure yet" }]}
              />
            </FieldShell>
          </div>
        </>
      ),
    },
    {
      isValid: data.tier !== "",
      render: () => (
        <>
          <StepHeading>Which one feels right?</StepHeading>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {WAITLIST_TIERS.map((tier) => (
              <Choice key={tier.value} active={data.tier === tier.value} onSelect={() => update("tier", tier.value)}>
                <span className="block font-display text-2xl">{tier.name}</span>
                <span
                  className={`mt-1 block font-display text-xl transition-colors duration-300 ${
                    data.tier === tier.value ? "text-ivory" : "text-forest"
                  }`}
                >
                  ${tier.price}
                </span>
                <span
                  className={`mt-3 block font-sans text-sm leading-relaxed transition-colors duration-300 ${
                    data.tier === tier.value ? "text-ivory/80" : "text-charcoal/70"
                  }`}
                >
                  {tier.line}
                </span>
              </Choice>
            ))}
          </div>
          <button
            type="button"
            onClick={() => update("tier", "unsure")}
            aria-pressed={data.tier === "unsure"}
            className={`mt-6 font-sans text-sm underline underline-offset-4 transition-colors duration-300 ${
              data.tier === "unsure"
                ? "text-forest decoration-forest"
                : "text-charcoal/60 decoration-charcoal/25"
            }`}
          >
            Not sure yet
          </button>
        </>
      ),
    },
    {
      isValid: data.firstName.trim() !== "" && EMAIL_PATTERN.test(data.email.trim()),
      render: () => (
        <>
          <StepHeading>Where should we reach you?</StepHeading>
          <div className="mt-10 space-y-10">
            <FieldShell label="First name" required>
              <TextField value={data.firstName} onChange={(v) => update("firstName", v)} autoComplete="given-name" />
            </FieldShell>
            <FieldShell label="Email" required>
              <TextField
                type="email"
                value={data.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
                inputMode="email"
              />
            </FieldShell>
            {/* Honeypot — hidden from people and screen readers. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </label>
            </div>
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={data.marketingOptIn}
                onChange={(e) => update("marketingOptIn", e.target.checked)}
                className="peer sr-only"
              />
              <span
                className={`mt-0.5 h-5 w-5 shrink-0 border transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest ${
                  data.marketingOptIn ? "border-forest bg-forest" : "border-charcoal/30"
                }`}
              />
              <span className="font-sans text-[15px] leading-relaxed text-charcoal/75">
                Send me the occasional behind-the-scenes update.
              </span>
            </label>
          </div>
        </>
      ),
    },
  ];

  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...readAttribution(),
          first_name: data.firstName.trim(),
          email: data.email.trim(),
          buyer_type: data.buyerType,
          occasion: data.occasion,
          occasion_month: data.occasionMonth,
          tier_interest: data.tier,
          marketing_opt_in: data.marketingOptIn,
          company: data.company,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      router.push(`/waitlist/thanks?name=${encodeURIComponent(data.firstName.trim())}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const goNext = () => {
    if (!current.isValid || submitting) return;
    if (isLast) {
      void submit();
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setError("");
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div>
      <div className="h-px w-full bg-charcoal/10" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1}>
        <motion.div
          className="h-px bg-forest"
          initial={false}
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.7, ease: [0.45, 0, 0.15, 1] }}
        />
      </div>

      <form
        className="relative mt-12 overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
        noValidate
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: direction > 0 ? 16 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -16 : 16 }}
            transition={{ duration: 0.45, ease: [0.45, 0, 0.15, 1] }}
          >
            {current.render()}
          </motion.div>
        </AnimatePresence>

        {error ? (
          <p role="alert" className="mt-8 font-sans text-sm text-charcoal">
            {error}
          </p>
        ) : null}

        <div className="mt-12 flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="py-2 font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50 transition-colors duration-300 hover:text-charcoal disabled:invisible"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!current.isValid || submitting}
            className="rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-forest/25 disabled:text-ivory/50 disabled:hover:bg-forest/25"
          >
            {isLast ? (submitting ? "Saving…" : "Save my spot") : "Continue"}
          </button>
        </div>

        {isLast ? (
          <p className="mt-6 text-right font-sans text-[13px] text-charcoal/50">
            We&rsquo;ll only email you about Legacy Link. Unsubscribe anytime.
          </p>
        ) : null}
      </form>
    </div>
  );
}
