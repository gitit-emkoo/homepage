import Image from "next/image";
import StoreLink from "@/components/StoreLink";
import { reveal } from "@/lib/anim";

export default function Trust() {
  return (
    <>
      <section className="band">
        <p className="band__text reveal" {...reveal("fade-in-up", 1000)}>
          설명할 필요 없는
          <br />
          증명되는 기록으로 분쟁 걱정이 없어져요
        </p>
      </section>

      <section className="trust">
        <div className="container trust__grid">
          <Image
            className="trust__photo"
            src="/images/trust-photo.png"
            alt="태블릿으로 기록을 함께 확인하는 원장님과 고객"
            width={628}
            height={573}
          />
          <div className="trust__copy">
            <p className="trust__text">
              말이 아닌 시스템으로 공유한 기록
              <br />
              고객 신뢰로 재 방문이 늘어나요!
            </p>
            <StoreLink className="btn trust__btn">패스북 사용해 보기</StoreLink>
          </div>
        </div>
      </section>
    </>
  );
}
