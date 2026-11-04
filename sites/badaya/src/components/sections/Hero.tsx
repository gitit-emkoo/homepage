import AppDownloadButton from "@/components/AppDownloadButton";
import HeroVisual from "@/components/HeroVisual";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <h1 className="hero__title">
          몰라서, 바빠서 놓친 <em>돈</em>
          <br />
          먼저 <em>챙겨</em>드릴게요
        </h1>

        <p className="hero__lead">초 간편하게 대화로 끝나요</p>

        <HeroVisual />

        <div className="hero__cta">
          <AppDownloadButton>가능한 지원금 바로보기</AppDownloadButton>
        </div>
      </div>
    </section>
  );
}
