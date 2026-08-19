import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteData } from "@/lib/site-data";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Skyward Roofing & Restoration",
    template:
      "%s | Skyward Roofing",
  },

  description:
    "Professional roofing services from Skyward Roofing & Restoration.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteData();

  return (
    <html lang="en">
      <body>
        <SiteHeader
          leftMenu={siteData.headerLeftMenu}
          rightMenu={siteData.headerRightMenu}
          branding={siteData.branding}
          topBar={siteData.topBar}
          settings={siteData.header}
        />

        {children}

        <SiteFooter
          menuOne={siteData.footerMenuOne}
          menuTwo={siteData.footerMenuTwo}
          branding={siteData.branding}
          settings={siteData.footer}
        />
      </body>
    </html>
  );
}