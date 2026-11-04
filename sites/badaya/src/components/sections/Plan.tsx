import Image from "next/image";

export default function Plan() {
  return (
    <section className="plan">
      <div className="container">
        <p className="plan__eyebrow">바다야 이용 안내</p>
        <h2 className="plan__title">
          무료로 시작하고 <em>필요한 만큼 사용하세요</em>
        </h2>
        <Image
          className="plan__image"
          src="/images/plans.png"
          alt="바다야 이용 안내 이미지"
          width={1388}
          height={776}
        />
      </div>
    </section>
  );
}
