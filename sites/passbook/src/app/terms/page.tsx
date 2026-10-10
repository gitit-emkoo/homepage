import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import { TERMS_TEXT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "이용약관",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SubPageHeader />
      <main className="subpage">
        <h1 className="subpage__title subpage__title--small">이용약관</h1>
        <div className="legal">{TERMS_TEXT}</div>
      </main>
    </>
  );
}
