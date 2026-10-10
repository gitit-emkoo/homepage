import Image from "next/image";
import StoreButtons from "./StoreButtons";

const HeroSection = () => (
  <>
    <section className="hero" id="top">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />
      <div className="container hero-inner">
        <h1>
          <span className="hero-accent">초기 소형법인</span>
          <span className="hero-main">셀프 재무관리 서비스</span>
        </h1>
        <p className="hero-copy">
          거래내역만 업로드하면 원천세, 부가세, 지급명세서, 보수총액신고,
          <br />
          범위 내 결산까지
          <br />
          직접 쉽게 할 수 있어요
        </p>
        <StoreButtons />
        <p className="small-note">앱을 설치하고 무료로 시작하세요</p>
        <div className="hero-media">
          <Image
            src="/images/hero-app.png"
            alt="재무박스 세무 관리 앱 화면"
            width={1536}
            height={1024}
            sizes="(max-width: 1180px) 100vw, 1180px"
            preload
          />
        </div>
      </div>
    </section>
    <section className="category-band">
      <p>
        초기 법인이라면 시작하세요.
        <br />
        사업이 성장하면 정리된 장부 그대로 전문가에게 이어갈 수 있습니다.
      </p>
      <div>
        <span>거래 정리</span>
        <i>+</i>
        <span>복식장부</span>
        <i>+</i>
        <span>신고 준비</span>
        <i>+</i>
        <span>결산</span>
      </div>
    </section>
  </>
);
export default HeroSection;