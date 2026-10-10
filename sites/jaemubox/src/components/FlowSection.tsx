const FlowSection = () => (
  <>
    <section className="section difference" id="difference">
      <div className="container">
        <div className="center-head">
          <p className="kicker">THE DIFFERENCE</p>
          <h2>
            세무사 대행 업무흐름
            <br />
            그대로 만들었습니다.
          </h2>
        </div>
        <div className="comparison">
          <article>
            <span className="compare-label">기존</span>
            <div className="vertical-flow">
              <b>증빙</b>
              <i>↓</i>
              <b>세무사</b>
              <i>↓</i>
              <b>장부</b>
              <i>↓</i>
              <b>신고</b>
            </div>
          </article>
          <article className="starttex-flow">
            <span className="compare-label">재무박스</span>
            <div className="vertical-flow">
              <b>증빙</b>
              <i>↓</i>
              <b>재무박스</b>
              <i>↓</i>
              <b>장부</b>
              <i>↓</i>
              <b>신고값</b>
              <i>↓</i>
              <b>대표 직접 제출</b>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section className="section accounting">
      <div className="container accounting-grid">
        <div>
          <p className="kicker">WHY IT WORKS</p>
          <h2>
            계산만 하는 앱이 아니라,
            <br />
            <em>실제 실무 흐름</em>을<br />
            이어 갑니다
          </h2>
          <p className="lead">
            대부분의 서비스가 기록과 계산에서 멈출 때, 재무박스는 신고까지 이어지는 구조를 만듭니다.
          </p>
        </div>
        <div className="ledger-card">
          <div className="ledger-top">
            <span>재무박스 LEDGER ENGINE</span>
            <strong>정상 반영 중</strong>
          </div>
          <div className="ledger-flow">
            <b>증빙</b>
            <i>→</i>
            <b>복식장부</b>
            <i>→</i>
            <b>미지급금</b>
            <i>→</i>
            <b>카드미지급</b>
            <i>→</i>
            <b>상계</b>
            <i>→</i>
            <b>장부</b>
            <i>→</i>
            <b className="accent-node">신고</b>
          </div>
          <p>실제 세무사와 같은 흐름으로 데이터를 쌓기 때문에, 신고 준비와 결산이 자연스럽게 이어집니다.</p>
        </div>
      </div>
    </section>
  </>
);
export default FlowSection;