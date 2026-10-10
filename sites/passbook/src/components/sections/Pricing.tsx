import Image from "next/image";
import { reveal } from "@/lib/anim";

export default function Pricing() {
  return (
    <section className="pricing">
      <div className="container">
        <h2 className="pricing__title">
          <span className="pricing__accent">소규모 운영에</span>
          <br />
          <span className="highlight">가장 똑똑한 선택은</span> <span className="pricing__accent">Passbook 입니다.</span>
        </h2>
        <p className="pricing__question">
          사용도 하지 않는 기능들
          <br />
          <strong>비싸고 복잡하게</strong> 쓸 필요 있을까요?
        </p>
        <p className="pricing__daily">
          <span className="pricing__accent">하루</span>
          <strong className="pricing__won reveal" {...reveal("heart-beat", 1000, { repeat: 6 })}>
            130원
          </strong>
          으로 충분
        </p>

        <div className="pricing__cards">
          <div className="price-card">
            <p className="price-card__name">T 사</p>
            <p className="price-card__price">월 19,800원</p>
            <p className="price-card__sms">SMS 발송료 별도</p>
          </div>
          <div className="price-card price-card--ours">
            <Image className="price-card__logo" src="/images/logo-psb.png" alt="PassBook" width={1024} height={1024} />
            <p className="price-card__price">월 3,900원</p>
            <p className="price-card__sms">SMS 발송료 포함</p>
          </div>
          <div className="price-card reveal" {...reveal("fade-in-up", 500)}>
            <p className="price-card__name">C 사</p>
            <p className="price-card__price">월 25,000원</p>
            <p className="price-card__sms">SMS 발송료 별도</p>
          </div>
        </div>
      </div>
    </section>
  );
}
