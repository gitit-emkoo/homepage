import { COMPANY } from "@/lib/site";

export default function About() {
  return (
    <section className="section section--night" id="about">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">02 — About</p>
          <h2 className="section__title">뫼비우스처럼 이어지는 제품</h2>
          <p className="section__lead">유리 ∞ 심볼처럼, 아이디어와 실행을 끊기지 않게 연결합니다.</p>
        </header>

        <div className="about-panel">
          <p>
            KWCC의 심볼은 뫼비우스의 띠 — 하늘 위 유리 조각처럼 가볍고, 끝없이 이어집니다.
            디지털 프로덕트를 기획하고 만들고 키우는 스튜디오로, MVP부터 브랜드 사이트·운영 도구까지
            작은 팀의 빠른 사이클을 돕습니다.
          </p>
          <dl className="about-meta">
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
    </section>
  );
}
