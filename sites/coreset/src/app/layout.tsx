import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ContactModal from "@/components/ContactModal";
import { ContactProvider } from "@/components/ContactProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | 코어셋` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ko",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "코어셋 CoreSet - 기획·제작부터 마케팅·AI까지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og.jpg"],
  },
  verification: {
    google: [
      "ncfRSo5zHMnVgC8MqMy_z-j8GypBklnB61c80nB8Ca0",
      "nfOHT08x7M2Q4qvKhwyHA1x-RxdFIezq-FERCR-1u88",
    ],
    other: {
      "naver-site-verification": "b7428ad53f70f1ff2951dec93fff0845a983b63f",
      "facebook-domain-verification": "wocw3h2ihtp71f4105aoitiozu9sha",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f6f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <ContactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ContactModal />
        </ContactProvider>
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
