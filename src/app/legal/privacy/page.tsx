import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";

export const metadata: Metadata = { title: "Privacy — Legacy Link Studio" };

const sections: LegalSection[] = [
  {
    heading: "1. What we collect",
    paragraphs: [
      "To build your film, we collect what you enter during the intake flow: names, relationship dates, written answers about your story, the tone and music preferences you choose, and the photos, video clips, and voice notes you upload.",
      "To fulfill and deliver an order, we collect an email address for your receipt, recipient email address(es) for the reveal link, and — for Forever and Heirloom orders — a reveal date and unlock preference. If you add the Display device (or order Heirloom, which includes it), we also collect a shipping address. If you're placing an order as a gift, we collect your name and email separately from the couple's details.",
      "We don't collect full payment card numbers ourselves; those are handled directly by our payment processor.",
    ],
  },
  {
    heading: "2. How we use it",
    paragraphs: [
      "We use what you submit to produce your film, operate the locked-reveal mechanic, deliver order updates, and provide support if something goes wrong. We don't use your photos, footage, or story details for advertising or to train unrelated products.",
    ],
  },
  {
    heading: "3. How we share it",
    paragraphs: [
      "We share the minimum necessary information with a small number of third parties who help us operate: a payment processor to handle checkout, AI video-generation infrastructure to produce your gallery or film, and — for orders with the Display device — a shipping carrier to deliver it. We don't sell personal information to anyone.",
    ],
  },
  {
    heading: "4. How long we keep it",
    paragraphs: [
      "We retain your submitted photos, footage, and story details for as long as your capsule remains active, so the film can continue to be viewed at its link. If you'd like your source material deleted after delivery while keeping the finished film accessible, contact us and we'll take care of it.",
    ],
  },
  {
    heading: "5. Access and reveal tokens",
    paragraphs: [
      "Your capsule link is a long, unguessable identifier rather than a login — it is the credential. Treat it as you would any private link or password: whoever holds it can view the capsule once it unlocks.",
    ],
  },
  {
    heading: "6. Your choices",
    paragraphs: [
      "You can request a copy of the information tied to your order, ask us to correct it, or ask us to delete it (subject to what's needed to keep a delivered capsule functioning) by contacting us at the email below.",
    ],
  },
  {
    heading: "7. Children",
    paragraphs: [
      "The Service is intended for adults placing orders about their own relationships or gifting one to someone else. We don't knowingly collect personal information directly from children, though photos or footage submitted as part of a couple's story may naturally include family members of any age.",
    ],
  },
  {
    heading: "8. Cookies and analytics",
    paragraphs: [
      "This site may use basic, privacy-respecting analytics to understand overall traffic and improve the experience. We don't use third-party advertising trackers.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    paragraphs: [
      "If we make a material change to this policy, we'll update the \"Last updated\" date above.",
    ],
  },
  {
    heading: "10. Contact",
    paragraphs: [
      "Questions about this policy, or requests about your data, can be sent to info@legacylinkstudio.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      updated="September 1, 2026"
      intro="This policy explains what we collect, why, and what you can ask us to do with it. We've kept it in plain language, because a privacy policy you can't read isn't much of a promise."
      sections={sections}
    />
  );
}
