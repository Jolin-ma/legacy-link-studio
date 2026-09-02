"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldShell, TextField } from "@/components/intake/ui";
import { DISPLAY_ADDON_PRICE, MILESTONE_LABELS, REVEAL_MODE_LABELS, TIER_DETAILS } from "@/lib/intake-labels";
import { clearOrderDraft, loadOrderDraft, type OrderDraft } from "@/lib/order-draft";
import { generateOrderId } from "@/lib/ids";
import { createOrder } from "@/lib/orders";

interface PaymentForm {
  contactEmail: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const emptyPayment: PaymentForm = {
  contactEmail: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b hairline py-4 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
        {label}
      </span>
      <span className="font-sans text-[15px] text-charcoal/85 sm:max-w-xs sm:text-right">
        {value}
      </span>
    </div>
  );
}

function orderTotal(draft: OrderDraft): number {
  if (draft.tier === "") return 0;
  const base = TIER_DETAILS[draft.tier].price;
  // Heirloom's Display is bundled into its price already — don't double-charge.
  const addon = draft.displayAddon && draft.tier !== "heirloom" ? DISPLAY_ADDON_PRICE : 0;
  return base + addon;
}

function OrderSummary({ draft }: { draft: OrderDraft }) {
  const tier = draft.tier === "" ? null : TIER_DETAILS[draft.tier];
  const isSpark = draft.tier === "spark";
  const occasion =
    draft.milestone === "other"
      ? draft.milestoneOther
      : draft.milestone === ""
      ? ""
      : MILESTONE_LABELS[draft.milestone];

  return (
    <div>
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
        Order Summary
      </p>

      {tier ? (
        <div className="mt-6">
          <h2 className="font-display text-3xl font-normal">{tier.label}</h2>
          <p className="mt-1 font-display text-xl text-forest">${tier.price}</p>
        </div>
      ) : null}

      <div className="mt-10 border-t hairline">
        <SummaryRow label="Gift from" value={draft.giverName} />
        {isSpark ? (
          <>
            <SummaryRow label="Title" value={draft.sparkTitle} />
            <SummaryRow
              label="Photos"
              value={draft.sparkPhotoCount ? `${draft.sparkPhotoCount} uploaded` : ""}
            />
          </>
        ) : (
          <>
            <SummaryRow
              label="For"
              value={[draft.partner1Name, draft.partner2Name].filter(Boolean).join(" & ")}
            />
            <SummaryRow label="Occasion" value={occasion} />
            <SummaryRow label="Reveal date" value={draft.revealDate} />
            <SummaryRow
              label="Reveal"
              value={draft.revealMode === "" ? "" : REVEAL_MODE_LABELS[draft.revealMode]}
            />
            <SummaryRow
              label="Photos"
              value={draft.photoCount ? `${draft.photoCount} uploaded` : ""}
            />
            <SummaryRow
              label="Video clips"
              value={draft.videoCount ? `${draft.videoCount} uploaded` : ""}
            />
            <SummaryRow label="Voice note" value={draft.hasVoiceNote ? "Included" : ""} />
          </>
        )}
        <SummaryRow label="Recipients" value={draft.recipientEmails} />
        <SummaryRow
          label="Display device"
          value={
            draft.tier === "heirloom"
              ? "Included"
              : draft.displayAddon
              ? `Added (+$${DISPLAY_ADDON_PRICE})`
              : ""
          }
        />
        {draft.displayAddon || draft.tier === "heirloom" ? (
          <SummaryRow
            label="Ships to"
            value={[
              draft.shippingAddress.line1,
              draft.shippingAddress.city,
              draft.shippingAddress.state,
              draft.shippingAddress.postalCode,
              draft.shippingAddress.country,
            ]
              .filter(Boolean)
              .join(", ")}
          />
        ) : null}
      </div>

      {tier ? (
        <div className="mt-2 flex items-baseline justify-between border-t hairline pt-6">
          <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal">
            Total
          </span>
          <span className="font-display text-2xl text-charcoal">${orderTotal(draft)}</span>
        </div>
      ) : null}
    </div>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState<OrderDraft | null>(null);
  const [payment, setPayment] = useState<PaymentForm>(emptyPayment);

  useEffect(() => {
    const loadedDraft = loadOrderDraft();
    setDraft(loadedDraft);
    if (loadedDraft?.giverEmail) {
      setPayment((prev) => ({ ...prev, contactEmail: loadedDraft.giverEmail }));
    }
    setLoaded(true);
  }, []);

  const updatePayment = (key: keyof PaymentForm, value: string) =>
    setPayment((prev) => ({ ...prev, [key]: value }));

  const paymentValid =
    payment.contactEmail.trim() !== "" &&
    payment.cardName.trim() !== "" &&
    payment.cardNumber.trim() !== "" &&
    payment.expiry.trim() !== "" &&
    payment.cvc.trim() !== "";

  const handlePay = () => {
    if (!paymentValid || !draft) return;
    const orderId = generateOrderId();
    createOrder(orderId, draft);
    clearOrderDraft();
    router.push(`/order/${orderId}/confirmation`);
  };

  if (!loaded) {
    return <div className="min-h-[70svh]" />;
  }

  if (!draft) {
    return (
      <div className="flex min-h-[70svh] items-center">
        <div className="mx-auto max-w-xl px-6 py-32 text-center md:px-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            Checkout
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
            There&rsquo;s <span className="font-bold">nothing to check out</span> yet.
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-charcoal/70">
            Start your story and we&rsquo;ll bring you back here once
            you&rsquo;ve chosen a package.
          </p>
          <Link
            href="/start"
            className="mt-10 inline-flex items-center rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep"
          >
            Begin Your Story
          </Link>
        </div>
      </div>
    );
  }

  const tier = draft.tier === "" ? null : TIER_DETAILS[draft.tier];

  return (
    <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
        Checkout
      </p>
      <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] md:text-5xl">
        Almost <span className="font-bold">there</span>.
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
        <OrderSummary draft={draft} />

        <div className="md:border-l md:hairline md:pl-16">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-forest">
            Payment Details
          </p>

          <div className="mt-8 space-y-10">
            <FieldShell label="Email for your receipt" required>
              <TextField
                type="email"
                value={payment.contactEmail}
                onChange={(v) => updatePayment("contactEmail", v)}
                placeholder="you@email.com"
              />
            </FieldShell>

            <FieldShell label="Name on card" required>
              <TextField
                value={payment.cardName}
                onChange={(v) => updatePayment("cardName", v)}
              />
            </FieldShell>

            <FieldShell label="Card number" required>
              <TextField
                value={payment.cardNumber}
                onChange={(v) => updatePayment("cardNumber", v)}
                placeholder="4242 4242 4242 4242"
              />
            </FieldShell>

            <div className="grid grid-cols-2 gap-10">
              <FieldShell label="Expiry" required>
                <TextField
                  value={payment.expiry}
                  onChange={(v) => updatePayment("expiry", v)}
                  placeholder="MM / YY"
                />
              </FieldShell>
              <FieldShell label="CVC" required>
                <TextField
                  value={payment.cvc}
                  onChange={(v) => updatePayment("cvc", v)}
                  placeholder="123"
                />
              </FieldShell>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={!paymentValid}
            className="mt-12 w-full rounded-full bg-forest px-8 py-3.5 font-sans text-[13px] uppercase tracking-wider2 text-ivory transition-colors duration-300 hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-forest/25 disabled:text-ivory/50 disabled:hover:bg-forest/25"
          >
            {tier ? `Complete Payment — $${orderTotal(draft)}` : "Complete Payment"}
          </button>

          <p className="mt-4 font-sans text-[13px] italic text-charcoal/40">
            Demo checkout — no payment is actually processed.
          </p>
        </div>
      </div>
    </div>
  );
}
