"use client";

import { openApply } from "@/lib/applicant";
import { trackCta } from "@/lib/analytics";

const OwnersSection = () => (
  <section className="section owners" id="owners">
    <div className="section-heading centered">
      <span className="kicker">OWNERS & DEVELOPERS</span>
      <h2>임대인·시행사도 바로 상담할 수 있습니다.</h2>
    </div>
    <div className="owners-grid">
      <article className="owner-card">
        <h3>공실 상가 임대인</h3>
        <p>오래 비어 있는 상가가 있으신가요? 렌트프리 대신 매출연동 조건으로 등록해 보세요. 가까운 파트너 중개사와 연결해 드립니다.</p>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            trackCta("owner_consult");
            openApply("owner");
          }}
        >
          매물 등록 상담 <span>→</span>
        </button>
      </article>
      <article className="owner-card">
        <h3>시행사·분양대행사</h3>
        <p>공실 호실이 여러 개라면 단지 단위로 매출연동 조건을 설계해 드립니다.</p>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            trackCta("developer_consult");
            openApply("developer");
          }}
        >
          단지 단위 상담 <span>→</span>
        </button>
      </article>
    </div>
  </section>
);

export default OwnersSection;
