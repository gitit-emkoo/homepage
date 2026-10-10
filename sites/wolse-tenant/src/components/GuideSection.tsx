const GuideSection = () => (
  <section className="section guide" id="guide">
    <div className="section-heading centered">
      <span className="kicker">FIELD GUIDE</span>
      <h2>
        임대인에게
        <br />
        가볍게 제안해보세요.
      </h2>
    </div>
    <div className="guide-grid">
      <article className="quote-card">
        <blockquote>
          “기존 임대 방식과 병행해서
          <br />이 방식 으로도 같이 해볼까요?”
        </blockquote>
        <p>계산방식 설명과 함께 임대인의 이점을 명확하게 안내해 주세요.</p>
      </article>
      <article className="guide-list-card">
        <ol>
          <li>
            <span>01</span>
            <div>
              <b>임의 조작 불가능한 기준</b>
              <p>국세청 원천 데이터(카드매출·현금영수증)를 바탕으로 자동 계산합니다.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>예측 가능한 정산 범위</b>
              <p>상한선·하한선을 설정해 매출 변동에도 안전하게 관리합니다.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>세금계산서까지 자동</b>
              <p>매달 발행부터 내역 관리까지 빠짐없이 이어집니다.</p>
            </div>
          </li>
        </ol>
      </article>
    </div>
  </section>
);
export default GuideSection;