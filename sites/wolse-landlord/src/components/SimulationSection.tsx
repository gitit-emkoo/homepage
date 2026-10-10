const SimulationSection = () => (
  <section className="section simulation" id="simulation">
    <div className="simulation-heading">
      <h2>
        {" "}
        <br />
        월세 계산 테이블 (예시)
      </h2>
    </div>
    <div className="simulation-card">
      <p className="simulation-note">예시 기준: 주변 시세 월 200만 원</p>
      <div className="simulation-table-wrap">
        <table className="simulation-table">
          <thead>
            <tr>
              <th>선택지</th>
              <th>기본료</th>
              <th>연동률</th>
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
      <p className="simulation-deposit">보증금 : 일반 임대차 계약과 동일</p>
    </div>
  </section>
);
export default SimulationSection;