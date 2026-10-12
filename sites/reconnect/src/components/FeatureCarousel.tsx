"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const FEATURES = [
  {
    title: "감정 일기",
    body: ["간단하게 하루 감정만 남겨도", "AI가 감정 흐름과 패턴을 분석해", "나를 더 이해하고 돌볼 수 있게 해요"],
    screen: { src: "/images/screen-diary.png", width: 369, height: 777, alt: "오늘의 기분과 감정 요소를 고르는 감정 일기 화면" },
  },
  {
    title: "감정 카드",
    body: ["표현이 어려울 때 말 대신", "감정 카드로 파트너와", "정서적 거리를 더 가깝게 만들어요"],
    screen: { src: "/images/screen-card.png", width: 384, height: 728, alt: "파트너에게 받은 감정 카드 화면" },
  },
  {
    title: "주간 커플 챌린지",
    body: ["매주 새로운 챌린지를 함께 하며", "두 사람의 감정 온도를 조금씩", "따뜻하게 만들어 보세요"],
    screen: { src: "/images/screen-challenge.png", width: 381, height: 752, alt: "진행 중인 커플 챌린지 화면" },
  },
  {
    title: "부부 처방소",
    body: ["부부들의 리얼한 갈등 사연과", "전문가의 솔루션!", "그리고 내 고민에 대해 직접적인", "해답도 찾아볼 수 있어요"],
    screen: { src: "/images/screen-clinic.png", width: 385, height: 822, alt: "갈등 사연과 전문가 분석을 담은 부부 처방소 화면" },
  },
  {
    title: "리커넥트 인증 합의서",
    body: ["책임 있게 약속들을 인증하고", "언제든 확인할 수 있도록", "디지털 기술로 안전하게 보관해요"],
    screen: { src: "/images/screen-agreement.png", width: 377, height: 619, alt: "합의서 작성과 인증, 보관함 화면" },
  },
  {
    title: "전문가 솔루션",
    body: ["나에게 딱 맞고 꼭 필요한 케어", "관계의 따뜻함을 위한 솔루션", "현실적 선택을 돕는 법률 상담까지", "든든한 전문가를 만날 수 있어요"],
    screen: { src: "/images/screen-expert.png", width: 381, height: 614, alt: "자기이해 진단실, 감정심리 상담실, 법률 상담소 목록 화면" },
  },
];

export default function FeatureCarousel() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const slides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    slides().forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = slides()[index];
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="features" aria-labelledby="features-title">
      <div className="section-head">
        <p className="eyebrow">Features</p>
        <h2 id="features-title" className="section-title">
          리커넥트로
          <br />
          분명한 변화를 만듭니다
        </h2>
      </div>

      <ol
        className="features__track"
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="리커넥트 주요 기능"
      >
        {FEATURES.map((feature, index) => (
          <li
            key={feature.title}
            className={`feature${index === active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${FEATURES.length}`}
          >
            <div className="feature__copy">
              <span className="feature__num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__body">
                {feature.body.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="device">
              <Image {...feature.screen} alt={feature.screen.alt} />
            </div>
          </li>
        ))}
      </ol>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-controls__arrow"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="이전 기능"
        >
          ‹
        </button>
        <div className="carousel-controls__dots">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              className={`carousel-controls__dot${index === active ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`${index + 1}번째 기능: ${feature.title}`}
              aria-current={index === active}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-controls__arrow"
          onClick={() => goTo(active + 1)}
          disabled={active === FEATURES.length - 1}
          aria-label="다음 기능"
        >
          ›
        </button>
      </div>
    </section>
  );
}
