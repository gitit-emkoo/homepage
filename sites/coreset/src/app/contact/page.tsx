import type { Metadata } from "next";
import RedirectHome from "@/components/RedirectHome";

export const metadata: Metadata = {
  title: "상담 문의",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function ContactRedirectPage() {
  return <RedirectHome />;
}
