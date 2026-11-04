import AppDownloadButton from "@/components/AppDownloadButton";
import HeroVisual from "@/components/HeroVisual";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-line">
              몰라서, 바빠서 놓친 <em className="hero__title-money">돈</em>
            </span>
            <span className="hero__title-line">
              먼저 <em>챙겨</em>드릴게요
            </span>
          </h1>
          <p className="hero__lead">초 간편하게 대화로 끝나요</p>
        </div>

        <HeroVisual />

        <div className="hero__cta">
          <AppDownloadButton className="hero__download">가능한 지원금 바로보기</AppDownloadButton>
        </div>
      </div>
    </section>
  );
}
