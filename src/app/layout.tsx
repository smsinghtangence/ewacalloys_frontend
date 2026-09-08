import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import { getProductCategories, getServices, getIndustries, getFooterColumns } from "@/lib/catalog";
import { getHeaderSettings } from "@/lib/headerSettings";

export const metadata: Metadata = {
  title: "EWAC",
  description: "EWAC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [productCategories, services, industries, footerColumns, headerSettings] = await Promise.all([
    getProductCategories(),
    getServices(),
    getIndustries(),
    getFooterColumns(),
    getHeaderSettings(),
  ]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo-m.svg" />
        {/*
          The design's own markup (contact.php, blogs.php, insights.php, about.php)
          uses raw Bootstrap 5 grid and utility classes (row, col-lg-4, container,
          d-flex, gy-5, gx-4, text-md-end, etc.) directly — main.css never redefines
          these, it only styles the site-specific classes layered on top. The design
          loads Bootstrap's CSS from a CDN, but this app's CSP only allows
          style-src 'self' — self-hosted here (like every other vendor stylesheet
          under assets/vendor/) rather than opening the CSP to a third-party origin.
        */}
        <link rel="stylesheet" href="/assets/vendor/bootstrap/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/fonts/fonts.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body>
        <SiteHeader
          productCategories={productCategories}
          services={services}
          industries={industries}
          headerSettings={headerSettings}
        />
        {children}
        <Footer columns={footerColumns} />
      </body>
    </html>
  );
}
