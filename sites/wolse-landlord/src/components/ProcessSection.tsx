const processSteps = [
  ["01", "AI 시세 산출", "주변 시세와 상권 데이터를 바탕으로 합리적인 기준을 제안합니다."],
  ["02", "계약 옵션 협의", "임대인과 임차인 상황에 맞게 임대차 조건 옵션을 협의합니다."],
  ["03", "임대차 계약체결", "협의 된 조건으로 임대차 계약을 체결합니다."],
  ["04", "월세 자동 산출", "매월 국세청 데이터를 수신해 월세가 자동으로 계산됩니다."],
  ["05", "세금계산서 자동 발행", "매월 정산 금액에 맞춰 전자세금계산서가 자동 발행됩니다."],
  ["06", "안전한 기록", "매월 정산 내역이 시스템에 안전하게 저장됩니다."],
];
const ProcessSection = () => (
  <section className="process-section section">
    <div className="content">
      <div className="section-heading center">
        <p className="eyebrow">월세 스위치 PROCESS</p>
        <h2>
          계약, 정산 , 계산서 발행까지
          <br />
          {" 편리하고 안전하게 이어집니다."}
        </h2>
      </div>
      <ol className="process-grid">
        {processSteps.map(([number, title, text]) => (
          <li key={number} className="process-card">
            <span className="process-number">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
export default ProcessSection;