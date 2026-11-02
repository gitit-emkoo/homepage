import type { Metadata } from "next";
import RedirectHome from "@/components/RedirectHome";

export const metadata: Metadata = {
  title: "포트폴리오",
  robots: { index: false, follow: true },
  alternates: { canonical: "/#portfolio" },
};

export default function PortfolioRedirectPage() {
  return <RedirectHome hash="portfolio" />;
}
