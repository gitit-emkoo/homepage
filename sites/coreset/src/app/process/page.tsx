import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "서비스 · 절차",
  description: "MVP 앱, MVP 웹, 소개형 홈페이지, 업무용 앱/웹. 문의 접수부터 인계까지 7단계의 명확한 절차로 진행합니다.",
  alternates: { canonical: "/process" },
};

const SERVICES = [
  { name: "MVP 앱", items: ["Android", "iOS"] },
  { name: "MVP 웹", items: ["웹 서비스", "관리자 페이지", "이벤트 페이지"] },
  { name: "소개형 홈페이지", items: ["랜딩 웹/앱", "쇼핑몰", "커뮤니티", "관리자 기능"] },
  { name: "업무용 앱/웹", items: ["맞춤형 업무 툴", "협업/관리 기능", "효율적인 워크플로우"] },
];

const STEPS = [
  { title: "문의 접수", body: "개발이 필요한 서비스 내용을 전달받습니다." },
  { title: "유선 또는 대면 미팅", body: "아이디어와 의도 및 목적을 확인하고 주요 기능과 동작을 확인합니다." },
  { title: "적정 범위 및 견적 제안", body: "핵심 기능 중심으로 현실적인 범위를 제시하고 합리적인 견적을 제안합니다." },
  { title: "계약 및 대면 미팅", body: "계약 사항을 꼼꼼히 체크하고 착수 전 동작 흐름과 주요 기능을 재점검합니다." },
  { title: "소통 채널 개설 및 개발", body: "실시간 소통하며 합의된 범위를 기준으로 개발 작업을 진행합니다." },
  { title: "검수 및 수정", body: "교차 테스트를 진행하고 필요한 수정 사항들을 반영합니다." },
  { title: "인계 및 마무리 (클로징 미팅)", body: "프로젝트 결과물을 안전하게 전달하고, 운영과 유지 보수에 필요한 내용을 안내합니다." },
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

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        label="서비스 · 절차"
        title={
          <>
            절반이 넘는 고객사가
            <br />
            코어셋을 다시 찾고 있습니다.
          </>
        }
      />

      <section className="section section--tight">
        <div className="wrap">
          <ul className="services">
            {SERVICES.map((service) => (
              <li key={service.name}>
                <h2>{service.name}</h2>
                <p>{service.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section steps-section">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">진행 절차</p>
            <h2 className="h2">명확한 절차로 진행합니다.</h2>
          </div>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="steps__num">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section prep">
        <div className="wrap split">
          <div className="split__head">
            <p className="label">문의 전 준비</p>
            <h2 className="h2">
              아래 내용을 남겨 주시면
              <br />
              <span className="text-teal">더 빠르고 정확한 소통</span>을
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

      <CtaBand
        title={
          <>
            지금 바로 시작하지 않아도,
            <br />
            저희와 함께 하지 않아도
            <br />
            대화를 통해 얻는 도움이 분명히 있습니다.
          </>
        }
        body="부담 없이 문의 남겨 주세요."
        action="문의 남기기"
      />
    </>
  );
}
