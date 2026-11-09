import { PORTFOLIO } from "@/lib/site";

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">01 — Portfolio</p>
          <h2 className="section__title">우리가 만든 서비스</h2>
          <p className="section__lead">
            KWCC가 기획·제작·운영에 참여한 프로덕트입니다. 링크는 플레이스홀더로 연결해 두었습니다.
          </p>
        </header>

        <div className="portfolio-grid">
          {PORTFOLIO.map((item) => (
            <a
              key={item.name}
              className="portfolio-card"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio-card__name">{item.name}</p>
              <p className="portfolio-card__blurb">{item.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
