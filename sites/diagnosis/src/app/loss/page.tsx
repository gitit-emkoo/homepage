import type { Metadata } from "next";
import LossTest from "@/components/tests/LossTest";

export const metadata: Metadata = {
  title: "내 사업의 숨은 손해 진단",
  description:
    "소상공인이 꼭 알아야 할 숨은 손해는? 매출 기회, 마케팅, 비용, 운영 시간, 세금/서류, 지원혜택에서 놓치고 있는 손해를 확인해 보세요.",
  alternates: { canonical: "/loss" },
  openGraph: {
    title: "내 사업의 숨은 손해 진단",
    description:
      "소상공인이 꼭 알아야 할 숨은 손해는? 매출 기회, 마케팅, 비용, 운영 시간, 세금/서류, 지원혜택에서 놓치고 있는 손해를 확인해 보세요.",
  },
  twitter: {
    title: "내 사업의 숨은 손해 진단",
    description:
      "소상공인이 꼭 알아야 할 숨은 손해는? 매출 기회, 마케팅, 비용, 운영 시간, 세금/서류, 지원혜택에서 놓치고 있는 손해를 확인해 보세요.",
  },
};

export default function Page() {
  return <LossTest />;
}
