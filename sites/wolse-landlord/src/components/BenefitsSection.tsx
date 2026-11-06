const benefits = [
  ["+1", "성사율을 높이는 또 하나의 옵션", "고정 월세로 안 맞던 손님에게 매출연동 조건을 함께 제안할 수 있습니다. 기존 플랫폼과 병행 가능합니다."],
  ["AUTO", "정산·세금계산서까지 자동", "계약 후 매달 월세 산출과 세금계산서 발행을 플랫폼이 처리해, 계약 이후 문의 대응이 줄어듭니다."],
  ["NEW", "손님층 확대", "초기 비용 부담으로 놓쳤던 예비창업자까지 손님으로 만들 수 있습니다."],
  ["ONLY", "차별화된 채널 선점", "지역에서 가장 먼저 매출연동 계약을 제안하는 중개사무소가 되세요."],
];

const BenefitsSection = () => (
  <section className="section benefits" id="benefits">
    <div className="section-heading centered">
      <span className="kicker">BROKER BENEFITS</span>
      <h2>
        중개 업무는 유연해지고
        <br />
        <span className="benefits-accent">성사율</span>은 높아집니다.
      </h2>
      <p>
        <strong>또 하나의 수익 채널을</strong>
        {" 만들어 보세요"}
      </p>
    </div>
    <div className="benefit-grid">
      {benefits.map(([label, title, text], index) => (
        <article key={title} className={`benefit-card benefit-${index}`}>
          <span className="benefit-tag">{label}</span>
          <h3>{title}</h3>
          <p>{text}</p>
          <span className="arrow">↗</span>
        </article>
      ))}
    </div>
  </section>
);
export default BenefitsSection;
