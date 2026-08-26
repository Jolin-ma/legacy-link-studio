import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Privacy — Legacy Link Studio" };

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Privacy Policy"
      copy="Full privacy policy will be published here before launch."
    />
  );
}
