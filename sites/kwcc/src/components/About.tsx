import { COMPANY } from "@/lib/site";

export default function About() {
  return (
    <div className="modal-content">
      <p className="modal-content__lead">유리 ∞ 심볼처럼, 아이디어와 실행을 끊기지 않게 연결합니다.</p>
      <div className="about-panel about-panel--glass">
        <p>
          KWCC의 심볼은 뫼비우스의 띠 — 하늘 위 유리 조각처럼 가볍고, 끝없이 이어집니다. 디지털
          프로덕트를 기획하고 만들고 키우는 스튜디오로, MVP부터 브랜드 사이트·운영 도구까지 작은
          팀의 빠른 사이클을 돕습니다.
        </p>
        <dl className="about-meta about-meta--glass">
          <div>
            <dt>Company</dt>
            <dd>{COMPANY.name}</dd>
          </div>
          <div>
            <dt>Biz No.</dt>
            <dd>{COMPANY.bizNumber}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
