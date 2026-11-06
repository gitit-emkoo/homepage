"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "중개수수료는 어떻게 되나요?",
    a: "기존과 동일합니다. 법정 중개보수는 100% 중개사님 몫이며, 월세스위치는 계약 건별 수수료를 받지 않습니다.",
  },
  {
    q: "구독료는 언제부터 내나요?",
    a: "초기 파트너 30곳은 2년간 0원이며, 이후에도 평생 월 2.5만 원(정가의 절반)입니다.",
  },
  {
    q: "임차인이 매출 공개를 꺼리면요?",
    a: "임대인에게는 상세 매출 내역이 아니라 최종 정산 금액만 전달됩니다.",
  },
  {
    q: "기존 방식과 같이 써도 되나요?",
    a: "네. 같은 매물을 일반 조건과 매출연동 조건으로 함께 제안할 수 있습니다.",
  },
  {
    q: "계약서는 법적으로 안전한가요?",
    a: "표준 계약서와 특약은 임대차 전문 변호사 검토를 거쳐 제공될 예정입니다.",
  },
];

const BrokerFaq = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="section broker-faq" id="broker-faq">
      <div className="section-heading centered">
        <span className="kicker">BROKER FAQ</span>
        <h2>중개사님이 자주 묻는 질문</h2>
      </div>
      <div className="broker-faq-list">
        {FAQS.map((item, index) => {
          const expanded = open === index;
          return (
            <article key={item.q} className={expanded ? "is-open" : ""}>
              <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}>
                <strong>Q. {item.q}</strong>
                <span aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              {expanded && <p>{item.a}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BrokerFaq;
