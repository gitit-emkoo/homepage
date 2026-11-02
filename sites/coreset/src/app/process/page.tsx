import type { Metadata } from "next";
import RedirectHome from "@/components/RedirectHome";

export const metadata: Metadata = {
  title: "서비스 · 절차",
  robots: { index: false, follow: true },
  alternates: { canonical: "/#process" },
};

export default function ProcessRedirectPage() {
  return <RedirectHome hash="process" />;
}
