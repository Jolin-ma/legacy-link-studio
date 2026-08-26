import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = { title: "Checkout — Legacy Link Studio" };

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <CheckoutClient />
      </main>
      <SiteFooter />
    </>
  );
}
