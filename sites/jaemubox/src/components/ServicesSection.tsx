const services = [
  ["원천세", "급여 확인", "신고값 생성", "홈택스 입력"],
  ["부가세", "증빙 자동 정리", "신고값 생성", "홈택스 입력"],
  ["지급명세서", "자료 자동 집계", "신고 준비", ""],
  ["보수총액신고", "자료 자동 집계", "신고 준비", ""],
  ["범위 내 결산", "장부가 쌓이면", "자동으로 이어짐", ""],
];
const ServicesSection = () => (
  <section className="section services" id="services">
    <div className="container">
      <div className="center-head">
        <p className="kicker">READY TO FILE</p>
        <h2>어떤 신고가 가능한가요?</h2>
        <p>거래를 차곡차곡 쌓아 두면, 필요한 순간 신고할 수 있게 준비됩니다.</p>
      </div>
      <div className="service-grid">
        {services.map((s, i) => (
          <article key={s[0]} className={`service-card service-${i}`}>
            <span className="service-no">0{i + 1}</span>
            <h3>{s[0]}</h3>
            <div className="service-steps">
              <p>{s[1]}</p>
              <i>↓</i>
              <p>{s[2]}</p>
              {s[3] && (
                <>
                  <i>↓</i>
                  <p>{s[3]}</p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
export default ServicesSection;