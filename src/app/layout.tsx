import type { Metadata } from "next";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://legacylinkstudio.com"),
  title: "Legacy Link Studio — Every love story deserves its own film",
  description:
    "Legacy Link Studio turns your love story into a cinematic film, delivered as a time capsule that unlocks the moment you choose.",
  openGraph: {
    siteName: "Legacy Link Studio",
    url: "https://legacylinkstudio.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
