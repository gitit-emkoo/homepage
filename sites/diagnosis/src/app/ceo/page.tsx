import type { Metadata } from "next";
import CeoTest from "@/components/tests/CeoTest";

export const metadata: Metadata = {
  title: "대표자 자질 테스트",
  description: "나는 대표로서 몇 점일까? 내가 몇 점짜리 대표인지 능력 지수와 성장 준비도를 테스트해 보세요!",
  alternates: { canonical: "/ceo" },
  openGraph: {
    title: "대표자 자질 테스트",
    description: "나는 대표로서 몇 점일까? 내가 몇 점짜리 대표인지 능력 지수와 성장 준비도를 테스트해 보세요!",
  },
  twitter: {
    title: "대표자 자질 테스트",
    description: "나는 대표로서 몇 점일까? 내가 몇 점짜리 대표인지 능력 지수와 성장 준비도를 테스트해 보세요!",
  },
};

export default function Page() {
  return <CeoTest />;
}
