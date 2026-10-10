const concerns = [
  "아직 거래도 많지 않은데 세무사 비용이 부담된다.",
  "홈택스는 너무 어렵다.",
  "장부는 어떻게 관리해야 하는지 모르겠다.",
  "신고가 틀릴까 봐 무섭다.",
  "결국 세무사를 써야 하나 고민된다.",
];
const steps = [
  ["01", "자료를 올립니다", "법인카드, 통장, 홈택스 세금계산서"],
  ["02", "앱이 장부로 정리합니다", "거래 분류, 부가세 구분, 복식장부 반영"],
  ["03", "필요한 것만 확인합니다", "애매하거나 위험한 거래만 짧게 질문합니다"],
  ["04", "신고할 숫자를 확인합니다", "원천세, 부가세 신고값과 홈택스 입력 위치를 안내합니다"],
  ["05", "장부가 결산까지 이어집니다", "범위 내 거래라면 월별 장부가 연간 결산 자료로 연결됩니다"],
];
const ProblemSolutionSection = () => (
  <>
    <section className="section problems" id="why">
      <div className="container split-head">
        <div>
          <p className="kicker">THE PROBLEM</p>
          <h2>초기 소형 법인의 흔한 고민입니다</h2>
        </div>
        <div className="concerns">
          {concerns.map((item, i) => (
            <div key={item}>
              <b>0{i + 1}</b>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="problem-end">
        사실 대부분의 초기 법인은
        <br />
        <strong>세무 대행을 쓰기엔 아직 이릅니다.</strong>
      </p>
    </section>
    <section className="section solution" id="how">
      <div className="container">
        <div className="center-head">
          <p className="kicker">HOW IT WORKS</p>
          <h2>재무박스는 이렇게 해결합니다.</h2>
          <p>복잡한 세무 업무를 매달 간편한 흐름으로 바꿉니다</p>
        </div>
        <div className="step-grid">
          {steps.map((step, i) => (
            <article key={step[0]} className="step-card">
              <span>
                {"STEP "}
                {step[0]}
              </span>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
              <div className={`step-icon icon-${i}`}>
                {i === 0 ? "↥" : i === 1 ? "▦" : i === 2 ? "✓" : i === 3 ? "→" : "▤"}
              </div>
            </article>
          ))}
        </div>
        <div className="input-only">
          <p>재무박스가 알아서 처리하고 정리한 숫자 그대로 안내에 따라</p>
          <strong>“입력만 하세요.”</strong>
        </div>
      </div>
    </section>
  </>
);
export default ProblemSolutionSection;