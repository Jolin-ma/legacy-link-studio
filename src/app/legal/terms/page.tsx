import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Terms — Legacy Link Studio" };

export default function TermsPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Terms of Service"
      copy="Full terms will be published here before launch."
    />
  );
}
