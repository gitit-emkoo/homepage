import { MARKET_RENT, RENT_PLANS, formatMan, formatPercent, planAmounts } from "@/lib/rent";

const SimulationSection = () => (
  <section className="section simulation" id="simulation">
    <div className="simulation-heading">
      <h2>월세 계산 테이블 (예시)</h2>
    </div>
    <div className="simulation-card">
      <p className="simulation-note">예시 기준: 주변 시세 월 {formatMan(MARKET_RENT)}</p>
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
            {RENT_PLANS.map((plan) => {
              const amounts = planAmounts(plan);
              return (
                <tr key={plan.id}>
                  <td>
                    {plan.id} ({plan.name})
                  </td>
                  <td>
                    {formatMan(amounts.base)} (시세 {Math.round(plan.baseRatio * 100)}%)
                  </td>
                  <td>{formatPercent(amounts.linkRate)}</td>
                  <td>{formatMan(amounts.floor)}</td>
                  <td>{formatMan(amounts.cap)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="simulation-cards">
        {RENT_PLANS.map((plan) => {
          const amounts = planAmounts(plan);
          return (
            <article key={plan.id} className="simulation-plan">
              <h3>
                {plan.id} ({plan.name})
              </h3>
              <p>
                <b>기본료</b>
                <span>
                  {formatMan(amounts.base)} (시세 {Math.round(plan.baseRatio * 100)}%)
                </span>
              </p>
              <p>
                <b>연동률</b>
                <span>{formatPercent(amounts.linkRate)}</span>
              </p>
              <p>
                <b>하한</b>
                <span>{formatMan(amounts.floor)}</span>
              </p>
              <p>
                <b>상한</b>
                <span>{formatMan(amounts.cap)}</span>
              </p>
            </article>
          );
        })}
      </div>
      <p className="simulation-deposit">보증금 : 일반 임대차 계약과 동일</p>
    </div>
  </section>
);
export default SimulationSection;
