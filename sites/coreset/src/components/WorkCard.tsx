import Image from "next/image";
import type { Work } from "@/lib/work";

type Props = {
  work: Work;
  detailed?: boolean;
};

export default function WorkCard({ work, detailed = false }: Props) {
  return (
    <article className="work">
      <div className="work__shot">
        <Image
          src={`/images/work/${work.slug}.png`}
          alt={`${work.name} 화면`}
          width={1920}
          height={1080}
          sizes="(min-width: 1080px) 560px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="work__head">
        <Image className="work__icon" src={`/images/icons/${work.slug}.png`} alt="" width={160} height={160} />
        <div>
          <h3 className="work__name">
            {work.name}
            {work.inProgress && <span className="work__badge">개발 중</span>}
          </h3>
          <p className="work__category">{work.category}</p>
        </div>
      </div>
      {detailed ? (
        <dl className="work__specs">
          <div>
            <dt>개발 유형</dt>
            <dd>{work.type}</dd>
          </div>
          <div>
            <dt>주요 기능</dt>
            <dd>{work.features}</dd>
          </div>
          <div>
            <dt>기술 스택</dt>
            <dd>{work.stack}</dd>
          </div>
          <div>
            <dt>개발 기간</dt>
            <dd>{work.period}</dd>
          </div>
          <div>
            <dt>확장 내용</dt>
            <dd>{work.extension}</dd>
          </div>
        </dl>
      ) : (
        <p className="work__meta">
          <span>{work.period}</span>
          <span>{work.stack}</span>
        </p>
      )}
    </article>
  );
}
