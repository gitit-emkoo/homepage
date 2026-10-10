const flow = [
  {
    number: "01",
    icon: "▦",
    title: "매출 집계",
    period: "매달 1일~말일 기준",
    description: "계약서 임대 시작일과 상관없이, 매출은 매월 1일부터 말일 기준으로 집계합니다.",
  },
  {
    number: "02",
    icon: "◫",
    title: "계산서 발행",
    period: "매월 10일",
    description: "정확한 매출자료 (국세청·카드사)확인을 후 산출된 금액으로 세금계산서를 발행합니다.",
  },
  {
    number: "03",
    icon: "₩",
    title: "입금",
    period: "협의된 날짜",
    description: "계산서발행일(매월10일)이후, 계약서에 명시한 날짜에 입금이 이뤄집니다.",
  },
  {
    number: "04",
    icon: "↻",
    title: "다음 달도 동일하게 반복",
    period: "매월",
    description: "정해진 기준과 일정에 따라 다음 달에도 같은 방식으로 정확하고 투명하게 정산됩니다.",
  },
];
const RentCalculationSection = () => (
  <section className="rent-calculation" aria-labelledby="rent-calculation-title">
    <div className="rent-calculation-inner">
      <div className="rent-calculation-heading">
        <span className="rent-calculation-kicker">MONTHLY RENT GUIDE</span>
        <h2 id="rent-calculation-title">
          월세
          <br />
          어떻게 계산되나요?
        </h2>
        <p>계약 시점과 상관없이 모두 같은 통일된 방식으로, 계산됩니다.</p>
      </div>
      <div className="rent-flow-grid">
        {flow.map((item) => (
          <article key={item.number} className="rent-flow-card">
            <div className="rent-flow-top">
              <span className="rent-flow-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="rent-flow-number">{item.number}</span>
            </div>
            <h3>{item.title}</h3>
            <strong>{item.period}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <div className="rent-case">
        <div className="rent-case-title">
          <span>실제 예시</span>
          <h3>8월 20일에 계약한 경우</h3>
        </div>
        <div className="rent-case-table-wrap">
          <table className="rent-case-table">
            <tbody>
              <tr>
                <th>매출 산정 기간</th>
                <td>
                  {"8월 1일~31일 "}
                  <small>계약 전 매출발생 불가해 영향없음.</small>
                </td>
              </tr>
              <tr>
                <th>기본월세</th>
                <td>계약일(8/20) 기준 일할 계산 → 8/20~31일, 12일치만 청구</td>
              </tr>
              <tr>
                <th>계산서 발행</th>
                <td>9월 10일</td>
              </tr>
              <tr>
                <th>입금일</th>
                <td>
                  {"계약서에 정한 날짜 "}
                  <small>예: 9월 15일</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="rent-case-notice">첫 달 기본월세는 사용일만 일할 계산됩니다.</p>
      </div>
      <div className="rent-faq">
        <h3>자주 묻는 질문</h3>
        <div className="rent-faq-grid">
          <article>
            <strong>Q. 왜 계약한 달의 월세를 다음 달에 내나요?</strong>
            <p>
              정확한 매출을 반영해 계산하다 보니, 국세청 자료가 나오는 시점인 매월 10일 이후에 정산이 이뤄집니다. 그래서
              항상 지난달 정산분을 이번 달에 받는 구조예요.
            </p>
          </article>
          <article>
            <strong>Q. 계약 전 기간 매출까지 임대료에 포함되나요?</strong>
            <p>
              아니에요. 계약일 이전은 매출이 발생할 수 없는 기간이라 실제 영향이 없어요. 고정비인 기본월세도 계약일
              기준으로 일할 계산해, 사용하지 않은 기간만큼 정확히 제외합니다.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
);
export default RentCalculationSection;