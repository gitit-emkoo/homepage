const ProblemSolutionSection = () => (
  <>
    <section className="problem section">
      <div className="content narrow center">
        <p className="eyebrow">일반적인 임차라면</p>
        <h2>
          “매출이 0원이어도,
          <br />
          월세 200만 원은 고스란히 빠져나갑니다.”
        </h2>
        <p className="body-copy">
          사업초기 예측할 수 없는 매출과 숨만 쉬어도 나가는 ‘고정 지출’.
          <br className="desktop" />
          {" “월세 부담을 낮춰 안전하게 시작하고, 성장에 맞춰 걱정없이 내고 싶다.”"}
          <br className="desktop" />
          {" 그 마음, 월세 스위치의 매출 연동 계약이면 해결됩니다."}
        </p>
      </div>
    </section>
    <section className="landlord-problem section">
      <div className="content narrow center">
        <p className="eyebrow">오래 비워둔 상가는</p>
        <h2>
          “공실이 길어지면 손해는 늘어나고,
          <br />
          가치는 하락합니다.”
        </h2>
        <p className="body-copy">
          “조금이라도 확실하고 안정적인 수익을 빨리 만들고, 성장의 가치까지 더해 받고 싶다.”
          <br className="desktop" />
          {" 그 마음, 월세스위치의 매출 연동 계약이면 해결됩니다."}
        </p>
      </div>
    </section>
    <section className="solution section">
      <div className="content">
        <div className="section-heading">
          <h2 className="how-it-works-title">임대인과 임차인의 고민을 스위치한 기술의 연결로 해결합니다.</h2>
        </div>
        <div className="solution-grid">
          <article className="solution-card">
            <div className="circle-icon">↘</div>
            <p className="card-kicker">매출이 적은 달에는</p>
            <h3>
              임대료가 낮아져
              <br />
              버티는 힘이 생깁니다.
            </h3>
            <p>고정 월세 부담을 낮춰, 운영 걱정이 작아집니다.</p>
          </article>
          <article className="solution-card dark">
            <div className="circle-icon">↗</div>
            <p className="card-kicker">사업이 성장해 매출이 안정되면</p>
            <h3>
              성장한 매출만큼
              <br />
              정직하게 계산합니다.
            </h3>
            <p>약정에 따라 협의된, 합리적인 임대료만 부담합니다.</p>
          </article>
        </div>
      </div>
    </section>
  </>
);
export default ProblemSolutionSection;