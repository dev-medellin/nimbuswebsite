import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../styles.css";
import "../classic-pvp.css";
import MaintenancePage from "../components/MaintenancePage";

export const metadata: Metadata = {
  title: "Nimbus Conquer | Classic PvP Realm",
  description: "Nimbus Conquer — a classic PvP realm built around skill, rivalry, and earned progression.",
  icons: {
    icon: "/assets/nimbus-favicon.png",
    shortcut: "/assets/nimbus-favicon.png",
    apple: "/assets/nimbus-favicon.png",
  },
  openGraph: {
    title: "Nimbus Conquer | Classic PvP Realm",
    description: "Enter a classic PvP realm of guild wars, city battles, tournaments, and earned progression.",
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
        <body className="classic-pvp-site">
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
      <body className="classic-pvp-site">
        <Script src="/maintenance-status.js" strategy="beforeInteractive" />
        <Script id="maintenance-redirect" strategy="beforeInteractive">
          {redirectScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
