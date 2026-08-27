import type { Metadata } from "next";
import "./globals.css";
import "../styles.css";

export const metadata: Metadata = {
  title: "Nimbus Conquer | Earn Your Legend",
  description: "Nimbus Conquer — the classic journey returns.",
  openGraph: {
    title: "Nimbus Conquer | Earn Your Legend",
    description: "A true old-school MMORPG experience for European adventurers.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
