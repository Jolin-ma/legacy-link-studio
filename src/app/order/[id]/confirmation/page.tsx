import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderConfirmationClient } from "@/components/order/order-confirmation-client";

export const metadata: Metadata = { title: "Order Confirmed — Legacy Link Studio" };

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70svh] items-center bg-ivory">
        <OrderConfirmationClient id={id} />
      </main>
      <SiteFooter />
    </>
  );
}
