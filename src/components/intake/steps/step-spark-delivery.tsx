"use client";

import type { IntakeData } from "../types";
import { CheckboxField, FieldShell, TextField } from "../ui";
import { DISPLAY_ADDON_PRICE, TIER_DETAILS } from "@/lib/intake-labels";

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b hairline py-4 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/50">
        {label}
      </span>
      <span className="font-sans text-[15px] text-charcoal/85 sm:max-w-md sm:text-right">
        {value}
      </span>
    </div>
  );
}

export function StepSparkDelivery({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  const setAddress = (field: keyof IntakeData["shippingAddress"], value: string) =>
    update("shippingAddress", { ...data.shippingAddress, [field]: value });

  return (
    <div className="space-y-14">
      <div>
        <p className="font-display text-3xl md:text-4xl">Delivery &amp; Review</p>
        <p className="mt-3 font-sans text-[15px] text-charcoal/60">
          Your gallery delivers as soon as it&rsquo;s ready &mdash; no reveal
          lock, no waiting on a date.
        </p>
      </div>

      <FieldShell
        label="Who should receive the link?"
        hint="Separate multiple emails with a comma"
        required
      >
        <TextField
          type="text"
          value={data.recipientEmails}
          onChange={(v) => update("recipientEmails", v)}
          placeholder="name@email.com"
        />
      </FieldShell>

      <div>
        <CheckboxField
          checked={data.displayAddon}
          onChange={(v) => update("displayAddon", v)}
          label={`Add the Display device (+$${DISPLAY_ADDON_PRICE})`}
          description="A small LCD device loaded with your gallery, shipped to you. Your link still delivers on the same timeline — only the physical device ships separately and arrives later."
        />
      </div>

      {data.displayAddon ? (
        <div className="space-y-10">
          <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/60">
            Shipping address
          </p>
          <div className="grid gap-10 md:grid-cols-2">
            <FieldShell label="Address line 1" required>
              <TextField
                value={data.shippingAddress.line1}
                onChange={(v) => setAddress("line1", v)}
              />
            </FieldShell>
            <FieldShell label="Address line 2" hint="Optional">
              <TextField
                value={data.shippingAddress.line2}
                onChange={(v) => setAddress("line2", v)}
              />
            </FieldShell>
            <FieldShell label="City" required>
              <TextField
                value={data.shippingAddress.city}
                onChange={(v) => setAddress("city", v)}
              />
            </FieldShell>
            <FieldShell label="State / Province" required>
              <TextField
                value={data.shippingAddress.state}
                onChange={(v) => setAddress("state", v)}
              />
            </FieldShell>
            <FieldShell label="Postal code" required>
              <TextField
                value={data.shippingAddress.postalCode}
                onChange={(v) => setAddress("postalCode", v)}
              />
            </FieldShell>
            <FieldShell label="Country" required>
              <TextField
                value={data.shippingAddress.country}
                onChange={(v) => setAddress("country", v)}
              />
            </FieldShell>
          </div>
        </div>
      ) : null}

      <div>
        <p className="font-sans text-[13px] uppercase tracking-wider2 text-charcoal/60">
          Your story, at a glance
        </p>
        <div className="mt-4">
          <SummaryRow label="Package" value={`${TIER_DETAILS.spark.label} — $${TIER_DETAILS.spark.price}`} />
          <SummaryRow label="Gift from" value={data.giverName} />
          <SummaryRow label="Title" value={data.sparkTitle} />
          <SummaryRow
            label="Photos"
            value={data.sparkPhotos.length ? `${data.sparkPhotos.length} uploaded` : ""}
          />
          <SummaryRow label="Recipients" value={data.recipientEmails} />
          <SummaryRow label="Display device" value={data.displayAddon ? `Added (+$${DISPLAY_ADDON_PRICE})` : ""} />
        </div>
      </div>
    </div>
  );
}
