import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import "./globals.css";

export const revalidate = 120;

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "REFORGE | Performance Training & Fitness",
    template: "%s | REFORGE",
  },
  description: siteConfig.description,
  openGraph: {
    title: "REFORGE | Performance Training & Fitness",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "REFORGE",
    type: "website",
    images: [{ url: "/brand/reforge-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "REFORGE | Performance Training & Fitness",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text font-sans">
        <JsonLd />
        <Providers>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
