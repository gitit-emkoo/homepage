import type { Metadata } from "next";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import CtaBand from "@/components/CtaBand";
import HeroStage from "@/components/HeroStage";
import InstagramFeed from "@/components/InstagramFeed";
import ProcessTabs from "@/components/ProcessTabs";
import ServicesBento from "@/components/ServicesBento";
import { INSTAGRAM_HANDLE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FACTS = [
  { value: "12–50일", label: "MVP 기준 개발 기간" },
  { value: "3개월", label: "완료 후 무상 A/S, 계약서 명시" },
  { value: "절반 이상", label: "다시 코어셋을 찾는 고객사" },
  { value: "NDA", label: "아이디어 보호를 위한 비밀유지계약" },
];

const CLICHES = ["“고 스펙의 개발자”", "“대기업 프로젝트 다수의 수행 경험”", "“아이디어만 있어도 기획해 드립니다.”"];

const WORRIES = [
  { before: "아이디어는 있는데 어디까지 어떻게 개발해야 할지 모르겠어요. ", mark: "말하다 보면 범위만 커질까 부담이고..", after: "" },
  { before: "", mark: "프리랜서는 문제 생기면 보호받기 어렵다는데", after: " 정식 법인 개발사는 아무래도 비싸고..." },
  { before: "MVP이다 보니 현실적으로 ", mark: "대면 미팅도 어렵고 충분한 상담 역시 쉽지 않고", after: "" },
  { before: "", mark: "기획이 정리되지 않아서 시작은 미뤄지고", after: " 경험도 많지 않아 서비스 방향 설정도 쉽지 않고.." },
];

const POINTS = [
  {
    title: "MVP 프로젝트에 특화된 방식으로 일합니다",
    body: "대형 시스템보다 검증을 위한 기획 및 개발에 집중해 왔으며, 축적된 경험과 노하우를 바탕으로 MVP 방식에 최적화된 시스템을 갖추고 있습니다.",
  },
  {
    title: "불필요한 요소는 덜어내고 꼭 필요한 범위만 제안합니다",
    body: "크게 시작해서 실패하는 경우가 더 많기 때문에 검증에 꼭 필요한 범위만 정확히 잡아 비용은 줄이고 가능성은 높입니다.",
  },
  {
    title: "MVP일수록 대면 소통은 더 중요합니다",
    body: "작은 프로젝트는 방향이 흔들리기 쉽기 때문에 적은 예산일수록 직접 만나 정확하게 소통하고 성공의 확률을 높이는 일이 중요합니다.",
  },
  {
    title: "투자사 출신의 기획 담당자가 사업화 관점에서 설계합니다",
    body: "기획 단계부터 사업화 관점에서 접근하기 때문에 아이디어만 구현되는 것보다 실제 시장에서 더 좋은 결과로 이어질 수 있습니다.",
  },
];

const MAIN_TEAM = ["총괄 / 기획", "디자인", "개발 (P)", "개발 (B)"];
const SUB_TEAM = ["법인 설립", "예비 특허"];

const SERVICE_KINDS = [
  { name: "MVP 앱", items: ["Android", "iOS"] },
  { name: "MVP 웹", items: ["웹 서비스", "관리자 페이지", "이벤트 페이지"] },
  { name: "소개형 홈페이지", items: ["랜딩 웹/앱", "쇼핑몰", "커뮤니티", "관리자 기능"] },
  { name: "업무용 앱/웹", items: ["맞춤형 업무 툴", "협업/관리 기능", "효율적인 워크플로우"] },
];

const PREP = [
  "구현하고자 하는 서비스 한 줄 정의",
  "꼭 필요한 기능 및 주요 동작",
  "참고하고 싶은 앱이나 웹사이트",
  "디자인 컨셉 (참고 앱이나 웹)",
];

const PROMISES = [
  { title: "투명한 계약", sub: "불안하지 않게" },
  { title: "빠른 응답", sub: "답답하지 않게" },
  { title: "진행 현황 공유", sub: "궁금하지 않게" },
];

const FAQ = [
  {
    q: "기획서 없이도 시작할 수 있나요?",
    a: "아이디어로 무엇을 검증하고 어떻게 증명해야 자금 확보와 본서비스로 이어질 수 있는지부터 함께 논의하며 정리하고 있습니다.",
  },
  {
    q: "추가 비용이 발생할 수 있나요?",
    a: "정해진 견적 외 절대 발생하지 않습니다. 너무 무리한 요구만 아니라면 범위를 벗어나도 최대한 해드리려고 노력하고 있습니다.",
  },
  {
    q: "작은 프로젝트도 미팅 가능한가요?",
    a: "고객사의 특별한 사유가 아니라면, 작을수록 방향 설정이 중요하기 때문에 초기 미팅은 대면 미팅으로 진행하고 있습니다.",
  },
  {
    q: "A/S 기간은 어떻게 되나요?",
    a: "개발 범위에 따라 다를 수 있지만 MVP 기준 완료 후 3개월까지 무상 A/S 해드리고 있고, 이 부분은 계약서에 명시해 보장하고 있습니다.",
  },
  {
    q: "아이디어 보호는 확실한가요?",
    a: "고객님 아이디어를 철저히 보호하기 위해 NDA(비밀유지계약)를 체결하고 있습니다.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__grid" />
          <div className="hero__glow" />
        </div>
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="hero__brand">코어셋 CoreSet</p>
            <h1 className="hero__title">
              기획·제작부터
              <br />
              <span>마케팅·AI</span>까지
            </h1>
            <p className="hero__lead">
              MVP 앱·웹 개발에 더해, 이미지·영상·온라인 광고 대행과 AI 영상·이미지 제작까지 한 팀에서 이어갑니다.
            </p>
            <div className="hero__actions">
              <ContactButton className="btn btn--ink">
                빠른 문의 <span aria-hidden="true">→</span>
              </ContactButton>
              <Link href="#portfolio" className="btn btn--line">
                포트폴리오 보기
              </Link>
            </div>
          </div>
          <HeroStage />
        </div>
        <div className="wrap">
          <ul className="facts">
            {FACTS.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section services-block" id="services">
        <div className="wrap">
          <div className="section__head section__head--center">
            <p className="label">서비스</p>
            <h2 className="h2">
              세 가지로, 처음부터
              <br />
              다음 단계까지 함께합니다
            </h2>
          </div>
          <ServicesBento />
        </div>
      </section>

      <section className="cliche">
        <div className="wrap">
          <p className="cliche__ask">이런 문구들, 이미 너무 많이 보셨죠?</p>
          <ul className="cliche__list">
            {CLICHES.map((line) => (
              <li key={line}>
                <s>{line}</s>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section why">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">왜 MVP는 달라야 하나</p>
            <h2 className="h2">
              MVP는 내 아이디어를
              <br />
              <span className="text-accent">자본으로 바꾸는 과정</span>이기
              <br />
              때문입니다.
            </h2>
          </div>
          <ol className="why__list">
            <li>
              <p>
                MVP 개발 목표가 완성도 높은 출시인가요?
                <br />
                아니면 <strong>핵심을 검증하고, 자금을 확보해 사업의 첫 시작</strong>을 만드는 것인가요?
              </p>
            </li>
            <li>
              <p>
                <strong>답은 분명합니다.</strong> 그렇다면 지금 아이디어에 더 필요한 건 오버 스펙 기술력이 아니라{" "}
                <strong>사업화 중심의 전략적인 기획력</strong>입니다.
              </p>
              <p className="why__scale" aria-label="기술력보다 기획력">
                <span>기술력</span>
                <i>&lt;</i>
                <span className="is-strong">기획력</span>
              </p>
            </li>
            <li>
              <p>
                코어셋의 가장 큰 강점은 <strong>투자사 출신의 기획 담당자</strong>가 어떻게 잘 만들지보다{" "}
                <strong>무엇을 검증해야 하는지</strong>, 비즈니스 모델별로 <strong>어떤 지표들이 필요한지</strong>{" "}
                실전 사업으로 이어지는 시각에서 MVP를 설계한다는 점입니다.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section worries">
        <div className="wrap">
          <h2 className="h2 worries__title">
            초기에 이런 고민과 걱정,
            <br />
            너무 잘 알고 공감하고 있습니다.
          </h2>
          <ul className="worries__list">
            {WORRIES.map((w) => (
              <li key={w.mark}>
                <blockquote>
                  {w.before}
                  <mark>{w.mark}</mark>
                  {w.after}
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section points">
        <div className="wrap">
          <div className="section__head">
            <p className="label">코어셋이 일하는 방식</p>
            <h2 className="h2">이런 고민과 걱정을 이렇게 해결합니다</h2>
          </div>
          <ol className="points__list">
            {POINTS.map((point, i) => (
              <li key={point.title}>
                <span className="points__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section team">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">ONE 팀 배정</p>
            <h2 className="h2">
              아이디어가 <span className="text-accent">빠르게 시장에</span> 출시되고
              <br />
              정확히 검증되도록
              <br />
              ONE 팀을 배정합니다.
            </h2>
          </div>
          <div className="team__chart">
            <div className="team__group">
              <p className="team__caption">
                <b>Main</b> 프로젝트 팀 구성
              </p>
              <ul className="team__roles">
                {MAIN_TEAM.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
            <div className="team__group team__group--sub">
              <p className="team__caption">
                <b>Sub</b> 초기 사업 실무 서포트
              </p>
              <ul className="team__roles">
                {SUB_TEAM.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <p className="team__note">사업 초기 과정에 중요한 실무적인 부분까지 서포트하고 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" id="process">
        <div className="wrap">
          <div className="section__head section__head--center">
            <p className="label">서비스 · 절차</p>
            <h2 className="h2">
              절반이 넘는 고객사가
              <br />
              코어셋을 다시 찾고 있습니다.
            </h2>
          </div>
          <ul className="services">
            {SERVICE_KINDS.map((service) => (
              <li key={service.name}>
                <h3>{service.name}</h3>
                <p>{service.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section steps-section">
        <div className="wrap">
          <div className="section__head section__head--center">
            <p className="label">진행 절차</p>
            <h2 className="h2">
              명확한 절차로
              <br />
              <span className="text-accent">차근차근</span> 진행합니다
            </h2>
          </div>
          <ProcessTabs />
        </div>
      </section>

      <section className="section prep">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">문의 전 준비</p>
            <h2 className="h2">
              아래 내용을 남겨 주시면
              <br />
              <span className="text-accent">더 빠르고 정확한 소통</span>을
              <br />
              시작할 수 있습니다.
            </h2>
          </div>
          <ol className="prep__list">
            {PREP.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section promises">
        <div className="wrap">
          <div className="section__head">
            <p className="label">계약서에 넣는 3가지</p>
            <h2 className="h2">
              코어셋은 3가지 추가 사항을
              <br />
              계약서에 넣어 확실하게 보장합니다.
            </h2>
          </div>
          <ul className="promises__list">
            {PROMISES.map((p) => (
              <li key={p.title}>
                <span>{p.sub}</span>
                <strong>{p.title}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">FAQ</p>
            <h2 className="h2">자주 하는 질문</h2>
          </div>
          <div className="faq__list">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section works" id="portfolio">
        <div className="wrap">
          <div className="section__head section__head--row">
            <div>
              <p className="label">포트폴리오</p>
              <h2 className="h2">
                Instagram @{INSTAGRAM_HANDLE}
                <br />
                에서 작업물을 만나보세요
              </h2>
            </div>
            <Link href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} className="link-arrow" target="_blank" rel="noopener noreferrer">
              인스타그램 바로가기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <InstagramFeed />
        </div>
      </section>

      <CtaBand
        title={
          <>
            외주 파트너가 아닌
            <br />
            전략 팀과 개발 팀이 되어
            <br />
            <span>든든하게 함께하겠습니다.</span>
          </>
        }
        body="앱·웹 제작, 마케팅, AI 크리에이티브 — 궁금한 점이 있다면 무엇이든 문의해 주세요."
      />
    </>
  );
}
