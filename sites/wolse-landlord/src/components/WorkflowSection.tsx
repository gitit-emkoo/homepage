const steps = [
  { number: "01", title: "AI 상권 데이터 분석", description: "합리적인 기준 시세 제안", tone: "mint" },
  { number: "02", title: "계약조건 선택·합의", description: "타입별 매출연동 조건 합의", tone: "violet" },
  { number: "03", title: "전자계약 체결", description: "합의한 조건으로 간편하고 안전한 전자 계약체결", tone: "blue" },
  {
    number: "04",
    title: "국세청 데이터 연동·월세 산출",
    description: "원천 데이터 기준으로 월세 자동 산출",
    tone: "peach",
  },
  { number: "05", title: "매월 세금계산서 자동 발행", description: "산출된 내역 기준 세금계산서 처리", tone: "mint" },
  { number: "06", title: "거래 데이터 기록", description: "모든 거래 내역을 투명하게 기록", tone: "violet" },
];
const WorkflowSection = () => (
  <section className="section workflow" id="workflow">
    <div className="workflow-layout">
      <div className="workflow-copy">
        <span className="kicker">ONE TRUSTED WORKFLOW</span>
        <h2>
          {"투명하고 안전한 시스템으로 "}
          <br />
          새로운 임대차 거래의 표준을 만듭니다.
        </h2>
        <p>개인 간 신뢰, 복잡성 문제로 어렵고 불안했던 매출연동 거래가 투명하고 안전해 집니다</p>
      </div>
      <div className="workflow-board" aria-label="계약부터 거래 기록까지의 6단계 과정">
        {steps.map((step) => (
          <article key={step.number} className={`process-step process-${step.number} ${step.tone}`}>
            <span className="process-number">
              {"STEP "}
              {step.number}
            </span>
            <div className="process-content">
              <span className="process-dot" />
              <div>
                <b>{step.title}</b>
                <p>{step.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default WorkflowSection;