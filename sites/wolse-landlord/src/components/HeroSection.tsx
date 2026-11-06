"use client";

import Image from "next/image";
import { trackCta } from "@/lib/analytics";

const HeroSection = () => (
  <section className="hero" id="top">
    <div className="hero-inner">
      <h1>
        안 나가던 공실 매물,
        <br />
        <span className="hero-accent">성사시킬 카드</span>가 하나 더 생깁니다.
      </h1>
      <p className="hero-copy">
        렌트프리로 깎아주는 대신, 매출연동으로 제안하세요. 임대인은 기본료라는 바닥을 지키고, 임차인은 초기 부담을 낮춥니다.
      </p>
      <p className="hero-note">대형 쇼핑몰의 매출연동 방식을 소형 상가에 맞게 설계한 하이브리드 임대차</p>
      <div className="hero-actions">
        <a className="btn btn-dark" href="#apply" onClick={() => trackCta("hero_apply")}>
          {"초기 파트너 신청 "}
          <span>→</span>
        </a>
        <a className="text-link" href="#benefits" onClick={() => trackCta("hero_benefits")}>
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
