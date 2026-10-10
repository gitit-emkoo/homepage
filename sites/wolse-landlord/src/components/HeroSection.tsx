const heroImage = "/images/hero-bg.png";
const HeroSection = () => (
  <section
    className="hero"
    style={{
      backgroundImage: `linear-gradient(90deg, rgba(18,25,30,.84) 0%, rgba(18,25,30,.65) 46%, rgba(18,25,30,.15) 76%), url(${heroImage})`,
    }}
  >
    <div className="hero-inner">
      <div className="hero-copy">
        <p className="eyebrow light" style={{ fontSize: "18px", lineHeight: 1.35 }}>
          매출 연동 임대차 계약
        </p>
        <h1>
          매출이 적은 달엔
          <br />
          월세도 낮아집니다.
        </h1>
      </div>
      <aside className="trust-card" aria-label="거래 구조 안내">
        <span className="trust-mark">✓</span>
        <p className="tiny-label">PLATFORM PROTECTION</p>
        <strong>
          계약부터 정산 계산서 발행까지
          <br />
          플랫폼이 안전하게 보호합니다
        </strong>
        <p>매출 연동 방식으로 전환했을 때의 수익 구조를 함께 살펴보세요.</p>
        <div className="trust-line" />
      </aside>
    </div>
  </section>
);
export default HeroSection;