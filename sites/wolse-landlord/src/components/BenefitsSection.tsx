const benefits = [
  ["0%", "플랫폼 수수료0%", "월세스위치는 계약을 위한 매칭과 운영 시스템만 제공합니다."],
  ["+1", "성사율을 높이는 또 하나의 옵션", "기존 플랫폼과 병행 할수있어 임대인과 임차인에 선택지가 넓어집니다."],
  ["AUTO", "산출 정산 기록 모두 자동", "번거로운 문의 대신, 데이터에 기반해 자동화 시스템이 처리합니다."],
  ["ONLY", "차별화된 서비스 선점", "매출연동 방식의 새로운 플랫폼으로 한 발 앞서 제안하세요."],
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