"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Feature = {
  title: string;
  body: string[];
  extra?: string;
  trust?: boolean;
  images: { src: string; width: number; height: number; alt: string }[];
};

const FEATURES: Feature[] = [
  {
    title: "매일 가볍게 데일리Pick !",
    body: ["매일의 선택이 쌓이면", "애니마코드가 탄생해요"],
    images: [{ src: "/images/screen-daily.jpg", width: 600, height: 1241, alt: "데일리Pick 질문 화면" }],
  },
  {
    title: "성향은, 언제든지 변해 가는 것!",
    body: ["선택 데이터에 따라 변화하는", "요즘 나의 성향을 공유해 보세요"],
    images: [
      { src: "/images/screen-animacode.jpg", width: 750, height: 990, alt: "나의 애니마코드와 성향 변화 화면" },
      { src: "/images/screen-share.jpg", width: 684, height: 445, alt: "요즘 나의 성향 공유하기 화면" },
    ],
  },
  {
    title: "지금 가장 뜨거운 LivePick +🔥",
    body: ["다른 사람들은 어떻게 생각할까?", "내 생각은 트렌드파 OR 반대파?"],
    images: [{ src: "/images/screen-livepick.jpg", width: 600, height: 1184, alt: "LivePick 투표 결과 화면" }],
  },
  {
    title: "질문을 만들어 반응을 이끌어 보세요",
    body: ["주간 Top Pick에 도전하고", "더 큰 보상을 획득하세요"],
    extra: "(주간 TopPick 5,000P 지급💵)",
    images: [{ src: "/images/screen-question.jpg", width: 600, height: 1174, alt: "질문 만들기 화면" }],
  },
  {
    title: "참여할수록 쌓여가는 포인트는 덤+",
    body: ["포인트 Shop에서 원하는 상품으로 교환"],
    images: [{ src: "/images/screen-shop.jpg", width: 600, height: 1238, alt: "포인트 샵 상품 교환 화면" }],
    trust: true,
  },
];

export default function FeatureCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
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
    <section className="features" aria-roledescription="carousel" aria-label="픽플레이 주요 기능">
      <div className="features__track" ref={trackRef} onScroll={handleScroll} tabIndex={0}>
        {FEATURES.map((feature, index) => (
          <article
            key={feature.title}
            className={`feature${index === active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${FEATURES.length}`}
          >
            <div className="feature__copy">
              <h2 className="feature__title">{feature.title}</h2>
              <p className="feature__body">
                {feature.body.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              {feature.extra && <p className="feature__extra">{feature.extra}</p>}
              {feature.trust && (
                <p className="feature__trust">
                  픽플레이는 <Link href="/trust">신뢰운영원칙</Link>을 준수합니다
                </p>
              )}
            </div>
            <div className={`feature__screen${feature.images.length > 1 ? " feature__screen--card" : ""}`}>
              {feature.images.map((image) => (
                <Image key={image.src} {...image} alt={image.alt} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="features__controls">
        <button
          type="button"
          className="features__arrow"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="이전 기능"
        >
          ‹
        </button>
        <div className="features__dots">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              className={`features__dot${index === active ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`${index + 1}번째 기능: ${feature.title}`}
              aria-current={index === active}
            />
          ))}
        </div>
        <button
          type="button"
          className="features__arrow"
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
