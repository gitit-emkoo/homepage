import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | 코어셋` },
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
    google: "ncfRSo5zHMnVgC8MqMy_z-j8GypBklnB61c80nB8Ca0",
    other: {
      "naver-site-verification": "b7428ad53f70f1ff2951dec93fff0845a983b63f",
      "facebook-domain-verification": "wocw3h2ihtp71f4105aoitiozu9sha",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
