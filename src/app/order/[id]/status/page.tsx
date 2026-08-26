import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderStatusClient } from "@/components/order/order-status-client";

export const metadata: Metadata = { title: "Order Status — Legacy Link Studio" };

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader />
      <main className="min-h-[70svh] bg-ivory">
        <OrderStatusClient id={id} />
      </main>
      <SiteFooter />
    </>
  );
}
