import Image from "next/image";

export default function Plan() {
  return (
    <section className="plan">
      <div className="container">
        <p className="plan__eyebrow">BADAYA PLAN</p>
        <h2 className="plan__title">
          대부분 확인조차 하지 않아요 <br />
          <em>확인하고 준비서류 챙기는건 평생 무료!</em>
        </h2>
        <Image
          className="plan__image"
          src="/images/plans.png"
          alt="확인플랜 평생무료, 실전플랜 월 구독형 24,900원, 년 구독형 228,000원"
          width={1388}
          height={776}
        />
      </div>
    </section>
  );
}
