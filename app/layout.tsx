import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do They GIF?",
  description: "See how many .gif links a Nostr user shares in their notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
