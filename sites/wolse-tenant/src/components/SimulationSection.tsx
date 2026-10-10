const SimulationSection = () => (
  <section className="simulation section">
    <div className="content">
      <div className="section-heading center">
        <p className="eyebrow">월세 스위치는</p>
        <h2>{" 이렇게 달라져요"}</h2>
      </div>
      <div className="rate-table-wrap" aria-label="월세 스위치 계약 옵션 예시">
        <p className="rate-table-caption">예시 기준: 주변 시세 월 200만 원</p>
        <div className="rate-table-scroll">
          <table className="rate-table">
            <thead>
              <tr>
                <th>선택지</th>
                <th>기본료</th>
                <th>연동율</th>
                <th>하한</th>
                <th>상한</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A (안정형)</td>
                <td>140만 원 (시세 70%)</td>
                <td>5%</td>
                <td>140만 원</td>
                <td>260만 원</td>
              </tr>
              <tr>
                <td>B (균형형)</td>
                <td>100만 원 (시세 50%)</td>
                <td>7%</td>
                <td>100만 원</td>
                <td>300만 원</td>
              </tr>
              <tr>
                <td>C (성장형)</td>
                <td>60만 원 (시세 30%)</td>
                <td>11%</td>
                <td>60만 원</td>
                <td>340만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="simulation-box">
        <div className="condition">
          <span>📌 전용 15평 B급 상권기준</span>
          <strong>
            {"균형형 선택 예시 (기본월세 "}
            <b>100만 원</b>
            {" + 매출의 "}
            <b>7%</b>)
          </strong>
        </div>
        <div className="scenario-grid">
          <article className="scenario">
            <p className="scenario-label">EARLY STAGE</p>
            <h3>오픈 초기</h3>
            <p>매출 500만 원</p>
            <div className="price">
              <em>135</em>
              <span>만 원</span>
            </div>
            <small>
              {"주변 시세 대비 "}
              <b>65만 원 절감</b>
            </small>
          </article>
          <div className="connector">→</div>
          <article
            className="scenario accent"
            style={{ borderColor: "#2F6BFF", boxShadow: "0 18px 36px rgba(47, 107, 255, 0.14)" }}
          >
            <p className="scenario-label" style={{ color: "#2F6BFF" }}>
              AFTER GROWTH
            </p>
            <h3>자리 잡은 후</h3>
            <p>매출 1,500만 원</p>
            <div className="price">
              <em>205</em>
              <span>만 원</span>
            </div>
            <small>주변 시세 대비 5만원 더 부담</small>
          </article>
        </div>
      </div>
      <p className="simulation-quote">“임차인과 임대인이 리스크도 이익도 합리적으로 공유하는 착한거래.”</p>
      <p className="sim-note">관심 등록 후, 희망 지역과 업종에 맞춘 시뮬레이션을 보내드립니다.</p>
    </div>
  </section>
);
export default SimulationSection;