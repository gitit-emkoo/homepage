import Image from "next/image";
import AppDownloadButton from "@/components/AppDownloadButton";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <h1 className="hero__title">
          그동안 놓쳐왔던 <em>지원금!</em>
          <br />
          차곡차곡 <em>챙겨드려요</em>
        </h1>

        <div className="hero__visual">
          <Image src="/images/hero-bear.png" alt="지원금 돈다발을 든 바다야 곰 캐릭터" width={920} height={1152} preload />
        </div>

        <div className="hero__cta">
          <AppDownloadButton>내가 받을 지원금 확인하기</AppDownloadButton>
        </div>

        <div className="hero__stats">
          <p className="hero__stat hero__stat--beta">베타 출시 2개월</p>
          <p className="hero__stat hero__stat--downloads">앱다운 3000+</p>
          <p className="hero__stat hero__stat--amount">
            평균지원금
            <br />
            280만원+
          </p>
        </div>
      </div>

      <div className="container store-reviews">
        <h2 className="store-reviews__title">리뷰 400+</h2>
        <div className="store-reviews__shots">
          <Image
            className="store-reviews__summary"
            src="/images/review-summary.jpg"
            alt="구글 플레이 바다야 앱 평점 5.0, 리뷰 400개"
            width={804}
            height={890}
          />
          <Image
            className="store-reviews__list"
            src="/images/review-list.jpg"
            alt="구글 플레이 바다야 앱 사용자 리뷰"
            width={484}
            height={938}
          />
        </div>
      </div>
    </section>
  );
}
