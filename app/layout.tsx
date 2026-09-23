import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../styles.css";
import MaintenancePage from "../components/MaintenancePage";

export const metadata: Metadata = {
  title: "Nimbus Conquer | Earn Your Legend",
  description: "Nimbus Conquer — the classic journey returns.",
  icons: {
    icon: "/assets/nimbus-favicon.png",
    shortcut: "/assets/nimbus-favicon.png",
    apple: "/assets/nimbus-favicon.png",
  },
  openGraph: {
    title: "Nimbus Conquer | Earn Your Legend",
    description: "A true old-school MMORPG experience for European adventurers.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isLocalDevelopment = process.env.NODE_ENV !== "production";
  // Temporarily expose the full site for production integration testing.
  const maintenanceEnabled = false;

  if (maintenanceEnabled) {
    return (
      <html lang="en">
        <body>
          <MaintenancePage />
        </body>
      </html>
    );
  }

  const redirectScript = `
    (function () {
      const isLocalDevelopment = ${isLocalDevelopment};
      const rawStaticFlag = typeof window !== 'undefined' ? window.__NIMBUS_MAINTENANCE__ : undefined;
      const staticFlag = rawStaticFlag === true || rawStaticFlag === 'true';
      const envFlag = ${maintenanceEnabled};
      const isMaintenance = isLocalDevelopment ? false : (rawStaticFlag === undefined ? envFlag : staticFlag);
      const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
      const maintenancePath = '/maintenance';

      if (isMaintenance && path !== maintenancePath) {
        window.location.replace(maintenancePath);
        return;
      }

      if (!isMaintenance && path === maintenancePath) {
        window.location.replace('/');
      }
    })();
  `;

  return (
    <html lang="en">
      <body>
        <Script src="/maintenance-status.js" strategy="beforeInteractive" />
        <Script id="maintenance-redirect" strategy="beforeInteractive">
          {redirectScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
