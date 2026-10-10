import Image from "next/image";

const HeroSection = () => (
  <section className="hero" id="top">
    <div className="hero-inner">
      <h1>
        매출연동 임대차
        <br />
        {"또 하나의 "}
        <span className="hero-accent">중개 옵션이</span>
        {" 추가 됩니다."}
      </h1>
      <p className="hero-copy">
        대형 쇼핑몰 계약 방식에 소형 상가 특성을 더해 더 합리적인 하이브리드 임대차 거래
        <br />{" "}
      </p>
      <div className="hero-actions">
        <a className="btn btn-dark" href="#apply">
          {"초기 파트너 신청 "}
          <span>→</span>
        </a>
        <a className="text-link" href="#benefits">
          {"중개사님 혜택 보기 "}
          <span>↓</span>
        </a>
      </div>
      <div className="hero-product">
        <Image
          src="/images/hero-product.png"
          alt="매출연동 임대차의 자동 정산 및 계약 관리 플랫폼 화면"
          width={1536}
          height={1024}
          sizes="(max-width: 1104px) 100vw, 1056px"
          preload
        />
      </div>
    </div>
  </section>
);
export default HeroSection;