import Image from "next/image";
import StoreLink from "@/components/StoreLink";
import { reveal } from "@/lib/anim";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__logo">
            <Image src="/images/logo-passbook.png" alt="패스북" width={542} height={193} preload />
          </h1>
          <p className="hero__lead reveal" {...reveal("slide-in-up", 1000)}>
            몇회 남았죠? 부터 시작되는 찜찜함
          </p>
          <p className="hero__title reveal" {...reveal("slide-in-up", 1000)}>
            흩어진 메모, 설명 대신 고객이 서명한 기록
          </p>
        </div>

        <div className="hero__visual">
          <Image
            className="hero__phone reveal"
            {...reveal("fade-in-up", 1500)}
            src="/images/hero-phone.png"
            alt="패스북 앱 홈 화면"
            width={679}
            height={1350}
            preload
          />
          <Image
            className="hero__phone-sign reveal"
            {...reveal("slide-in-left", 1700)}
            src="/images/hero-phone-sign.png"
            alt="고객 서명 화면"
            width={1080}
            height={742}
            preload
          />
        </div>

        <div className="hero__cta">
          <StoreLink className="btn">패스북 무료 사용 해보기</StoreLink>
          <p className="hero__note">
            별도 회원 가입 절차 없이
            <br />
            인증으로 5초면 바로 시작
          </p>
          <div className="hero__stores">
            <a href={PLAY_STORE_URL}>
              <Image src="/images/badge-google-play.png" alt="Google Play에서 받기" width={714} height={213} />
            </a>
            <a href={APP_STORE_URL}>
              <Image src="/images/badge-app-store.png" alt="App Store에서 다운로드" width={719} height={212} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
