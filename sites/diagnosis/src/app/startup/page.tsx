import type { Metadata } from "next";
import StartupTest from "@/components/tests/StartupTest";

export const metadata: Metadata = {
  title: "창업성공 가능성 진단",
  description: "나의 창업 성공 가능성은 몇 점일까? 6가지 질문으로 창업 준비도와 우선 보완 포인트를 확인해 보세요.",
  alternates: { canonical: "/startup" },
  openGraph: {
    title: "창업성공 가능성 진단",
    description: "나의 창업 성공 가능성은 몇 점일까? 6가지 질문으로 창업 준비도와 우선 보완 포인트를 확인해 보세요.",
  },
  twitter: {
    title: "창업성공 가능성 진단",
    description: "나의 창업 성공 가능성은 몇 점일까? 6가지 질문으로 창업 준비도와 우선 보완 포인트를 확인해 보세요.",
  },
};

export default function Page() {
  return <StartupTest />;
}
