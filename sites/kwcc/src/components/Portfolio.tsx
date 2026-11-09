import { PORTFOLIO } from "@/lib/site";

export default function Portfolio() {
  return (
    <div className="modal-content">
      <p className="modal-content__lead">
        KWCC가 기획·제작·운영에 참여한 프로덕트입니다. 링크는 플레이스홀더로 연결해 두었습니다.
      </p>
      <div className="portfolio-grid portfolio-grid--glass">
        {PORTFOLIO.map((item) => (
          <a
            key={item.name}
            className="portfolio-card portfolio-card--glass"
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
  );
}
