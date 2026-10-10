const trustItems = [
  ["\u{1F512}", "사업 정보보호", "임대인에게는 플랫폼이 계산한 최종 정산 금액만 전달됩니다."],
  ["\u{1F9EE}", "투명한 자동 정산", "국세청 원천 데이터를 기준으로 시스템이 자동 계산합니다."],
  ["\u{1F9FE}", "세금계산서 자동화", "매월 전자세금계산서가 자동 발행되어 정산 흐름이 명확합니다."],
];
const TrustSection = () => (
  <section className="trust-section section">
    <div className="content">
      <div className="trust-intro">
        <p className="eyebrow light">SAFE BY DESIGN</p>
        <h2>
          “임대인에게 내 사업정보가 모두
          <br />
          공개되는 건 아닐까?”
        </h2>
        <p className="trust-submessage">걱정 마세요. 플랫폼이 철저하게 보호합니다.</p>
      </div>
      <div className="trust-grid">
        {trustItems.map(([icon, title, text]) => (
          <article key={title} className="trust-item">
            <span>{icon}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default TrustSection;