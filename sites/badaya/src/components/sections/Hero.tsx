import Image from "next/image";
import AppDownloadButton from "@/components/AppDownloadButton";

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

        <div className="hero__visual">
          <Image src="/images/hero-bear.png" alt="지원금 돈다발을 든 바다야 곰 캐릭터" width={920} height={1152} preload />
        </div>

        <div className="hero__cta">
          <AppDownloadButton>가능한 지원금 바로보기</AppDownloadButton>
        </div>
      </div>
    </section>
  );
}
