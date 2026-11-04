import Image from "next/image";

export default function StoreReviews() {
  return (
    <section className="store-proof">
      <div className="container">
        <div className="store-reviews">
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
      </div>
    </section>
  );
}
