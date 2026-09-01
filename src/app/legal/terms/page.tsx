import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";

export const metadata: Metadata = { title: "Terms — Legacy Link Studio" };

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of these terms",
    paragraphs: [
      "By starting an intake, placing an order, or otherwise using Legacy Link Studio (the \"Service\"), you agree to these Terms of Service. If you're placing an order as a gift, both you and the couple you're celebrating are bound by the parts of these terms that apply to how the Service is used, though only the person who checks out is responsible for payment.",
    ],
  },
  {
    heading: "2. What the Service does",
    paragraphs: [
      "You provide photos, video clips, a voice note, and written answers about a relationship's story. We use that material, along with AI-assisted video generation, to produce a personalized short film. Any scenes not covered by footage you supply are stylized recreations, not factual reconstructions.",
      "Your finished film is delivered behind a private link (a \"capsule\") that can be set to stay locked until a date you choose. Once unlocked, the capsule remains accessible at that same link indefinitely, for as long as the Service continues to operate.",
    ],
  },
  {
    heading: "3. Accounts and access",
    paragraphs: [
      "The Service does not require a login. Your capsule link is an unguessable, private URL — anyone who has it can view the capsule once it unlocks, so treat it the way you'd treat a shared document or photo album.",
      "If a link is lost, contact us using the email associated with your order and we'll help you recover it.",
    ],
  },
  {
    heading: "4. The content you submit",
    paragraphs: [
      "You retain ownership of the photos, video, audio, and written material you submit. By submitting it, you grant us a limited license to use it solely to produce, deliver, and support your order — we do not use your submitted material for advertising, training unrelated products, or any purpose beyond fulfilling your order without asking you first.",
      "You're responsible for making sure you have the right to share what you submit, and that it doesn't infringe anyone else's rights. Don't submit content depicting anyone who hasn't consented to being part of the film, or any content that's unlawful, hateful, or sexually explicit.",
    ],
  },
  {
    heading: "5. Gift orders",
    paragraphs: [
      "If you're placing an order as a gift, you're representing that you have a good-faith basis for the details you provide about the couple, and that gifting this experience is welcome. We rely on the information you give us and don't independently verify it.",
      "Legacy Link Studio isn't responsible for how or whether a gift-giver chooses to notify the recipient — the reveal-timing options we offer (immediate notification or a surprise held until the reveal date) reflect your stated preference, not a guarantee of delivery method.",
    ],
  },
  {
    heading: "6. Pricing, payment, and production timing",
    paragraphs: [
      "Current pricing for each package is listed on our Pricing page at the time you order. Payment is due in full at checkout, processed by a third-party payment processor — we never see or store your full card details.",
      "Most films are delivered within 7–10 days of a completed order, though this is an estimate, not a guaranteed delivery date, and can vary with order volume or the complexity of your story.",
    ],
  },
  {
    heading: "7. Cancellations and refunds",
    paragraphs: [
      "Because each film is custom-produced for your order, we're only able to offer a full refund if you cancel before production has meaningfully begun. Once AI generation or editing work has started, we may offer a partial refund at our discretion, but can't guarantee one.",
      "If your finished film has a genuine quality problem — corrupted delivery, a technical failure of the reveal mechanic, or a film that doesn't reflect the intake you submitted — contact us and we'll make it right, typically with a correction or a partial refund.",
      "Orders with the Display add-on (standalone, or included with Heirloom) ship as a separate, independently tracked leg from your digital delivery — adding or including it never delays your gallery or film. If the device arrives damaged, contact us within 14 days of delivery for a replacement.",
    ],
  },
  {
    heading: "8. Reveal dates and changes",
    paragraphs: [
      "You can update your capsule's reveal date yourself from your order status page, or by contacting us, at any time before the original date arrives. Once a capsule has unlocked, its reveal date can no longer be changed.",
    ],
  },
  {
    heading: "9. Disclaimers",
    paragraphs: [
      "AI-generated scenes are stylized approximations built from the details you provide — they are not guaranteed to be historically or visually precise, and the Service is provided \"as is\" without warranties of any kind, express or implied, including fitness for a particular purpose.",
      "We aren't liable for indirect, incidental, or consequential damages arising from your use of the Service. Our total liability for any claim relating to an order is limited to the amount you paid for that order.",
    ],
  },
  {
    heading: "10. Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. If we make a material change, we'll update the \"Last updated\" date above. Continuing to use the Service after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "11. Contact",
    paragraphs: [
      "Questions about these terms can be sent to info@legacylinkstudio.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Service"
      updated="September 1, 2026"
      intro="These terms govern your use of Legacy Link Studio. We've written them to be read rather than skimmed — plain language, nothing important buried in the fine print."
      sections={sections}
    />
  );
}
