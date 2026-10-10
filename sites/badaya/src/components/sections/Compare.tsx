import Image from "next/image";

export default function Compare() {
  return (
    <section className="compare">
      <div className="container">
        <h2 className="compare__title">
          BADAYA는&nbsp;
          <br />
          뭐가 다른 건가요?
        </h2>
        <Image
          className="compare__image"
          src="/images/comparison.png"
          alt="웹 검색과 바다야 비교: 자동 매칭, 자동 체크리스트와 AI 초안, 스스로 반복 지원"
          width={1200}
          height={800}
        />
        <p className="compare__text">
          노력과 비용은 100분의 1 이상으로 줄고
          <br />
          확인부터 신청까지 떠 먹여 주듯 편해져요
        </p>
      </div>
    </section>
  );
}
