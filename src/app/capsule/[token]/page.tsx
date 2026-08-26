import type { Metadata } from "next";
import { CapsuleClient } from "@/components/capsule/capsule-client";

export const metadata: Metadata = { title: "Your Capsule — Legacy Link Studio" };

export default async function CapsulePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <CapsuleClient token={token} />;
}
