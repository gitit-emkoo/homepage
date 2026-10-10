import Image from "next/image";
import { reveal } from "@/lib/anim";

export default function Promo() {
  return (
    <section className="promo">
      <div className="container promo__grid">
        <Image
          className="promo__vs"
          src="/images/promo-vs.png"
          alt="설명 하는 곳 VS 확인 되는 곳"
          width={468}
          height={344}
        />
        <h2 className="promo__title reveal" {...reveal("fade-in-up", 1000)}>
          시간 지나면 서로의 기억은 다를 수 있어요
        </h2>
        <figure className="promo__scene">
          <Image
            src="/images/promo-women.png"
            alt="서로 다른 기억으로 곤란해하는 두 사람"
            width={1056}
            height={1008}
          />
          <div className="promo__bubble promo__bubble--left">
            <p className="reveal" {...reveal("zoom-in", 500)}>
              정확히 설명했는데
              <br />왜 찝찝할까
            </p>
          </div>
          <div className="promo__bubble promo__bubble--right">
            <p className="reveal" {...reveal("zoom-in", 500)}>
              아닌거 같은데
              <br />
              다시 묻는것도
              <br />좀 그렇고....
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
