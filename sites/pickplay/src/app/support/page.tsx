import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import SupportForm from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "고객센터",
  description: "픽플레이 이용 중 궁금한 점이나 불편한 점을 남겨 주세요. 작성해 주신 이메일로 답변드립니다.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <SubPage title="고객문의">
      <h1 className="doc__title">문의 입력</h1>
      <SupportForm />
    </SubPage>
  );
}
