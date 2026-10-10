import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageIntro from "@/components/PageIntro";
import WorkCard from "@/components/WorkCard";
import { WORKS } from "@/lib/work";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "픽플레이, 패스북, 리커넥트 등 코어셋이 기획하고 개발한 MVP 앱 · 웹 프로젝트와 개발 기간, 기술 스택.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        label="포트폴리오"
        title={
          <>
            기술적인 완성도가 중요하다면 다른 선택지도 많습니다.
            <br />
            <span className="text-teal">사업으로 이어질 파트너</span>가 필요하다면, 최선의 선택지입니다.
          </>
        }
      >
        <p>랜딩 웹/앱 · 쇼핑몰 · 커뮤니티 · 관리자</p>
      </PageIntro>

      <section className="section section--tight">
        <div className="wrap works__grid works__grid--all">
          {WORKS.map((work) => (
            <WorkCard key={work.slug} work={work} detailed />
          ))}
        </div>
      </section>

      <CtaBand
        title={
          <>
            100번을 상담하고
            <br />
            다른 개발사에서 진행하셔도 괜찮습니다.
          </>
        }
        body="저희와의 대화가 가치 있는 시작이 되신 걸로 충분합니다. 구상 중인 내용으로 편하게 문의 주시면 빠르게 검토 후 연락드립니다."
      />
    </>
  );
}
