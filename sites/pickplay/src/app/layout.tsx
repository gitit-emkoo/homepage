import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | PickPlay` },
  description: SITE_DESCRIPTION,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ko",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "ExMysz3aeDVWHVZW7z2GEuEzedeWsszBlD8R1d9opug",
    other: {
      "naver-site-verification": "a8271856ec38fbfff12e01cfbc1c3c1785fe987b",
      "facebook-domain-verification": "wocw3h2ihtp71f4105aoitiozu9sha",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0060ce",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
