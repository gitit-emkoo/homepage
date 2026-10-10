import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import { PRIVACY_TEXT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SubPageHeader />
      <main className="subpage">
        <h1 className="subpage__title subpage__title--small">개인정보처리방침</h1>
        <div className="legal">{PRIVACY_TEXT}</div>
      </main>
    </>
  );
}
