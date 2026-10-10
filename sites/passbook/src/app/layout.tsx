import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { BEUSABLE_SRC, GA_MEASUREMENT_ID, GTM_ID, JSON_LD, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ko",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "G8OFlro93gyHV12Ey8XrJJODnnto8D7XLXMd7wH5bbE",
    other: {
      "naver-site-verification": "06cec3a58800ac1c65532e949cfa7b59d8c9712d",
      "facebook-domain-verification": "wocw3h2ihtp71f4105aoitiozu9sha",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />

        {children}

        <Script id="gtm">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <Script id="beusable" strategy="lazyOnload">
          {`(function(w,d,a){w.__beusablerumclient__={load:function(src){var b=d.createElement("script");b.src=src;b.async=true;b.type="text/javascript";d.getElementsByTagName("head")[0].appendChild(b);}};w.__beusablerumclient__.load(a+"?url="+encodeURIComponent(d.URL));})(window,document,"${BEUSABLE_SRC}");`}
        </Script>
      </body>
    </html>
  );
}
