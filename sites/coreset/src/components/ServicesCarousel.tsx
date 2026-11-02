"use client";

import { useRef, useState } from "react";

const SERVICES = [
  {
    key: "build",
    title: "앱 · 웹 제작",
    lead: "검증에 필요한 범위만 설계하는 MVP 앱·웹 개발",
    items: ["MVP 앱 (Android / iOS)", "웹 서비스 · 관리자", "소개형 홈페이지 · 쇼핑몰", "업무용 맞춤 툴"],
  },
  {
    key: "marketing",
    title: "마케팅 대행",
    lead: "이미지·영상을 만들고 온라인 광고까지 운영합니다",
    items: ["브랜드·프로모션 이미지", "숏폼 · 광고 영상", "메타 · 구글 등 온라인 광고", "성과 리포트 · 운영"],
  },
  {
    key: "ai",
    title: "AI 영상 · 이미지",
    lead: "AI로 빠르게 제작하고, 브랜드에 맞게 다듬습니다",
    items: ["AI 이미지 생성 · 보정", "AI 영상 · 모션", "콘셉트 보드 · 시안", "대량 · 반복 제작"],
  },
];

export default function ServicesCarousel() {
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
    <div className="svc-carousel">
      <div className="svc-carousel__controls">
        <button
          type="button"
          className="svc-carousel__nav"
          aria-label="이전 서비스"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          ←
        </button>
        <button
          type="button"
          className="svc-carousel__nav"
          aria-label="다음 서비스"
          disabled={active === SERVICES.length - 1}
          onClick={() => goTo(active + 1)}
        >
          →
        </button>
      </div>
      <div ref={trackRef} className="svc-carousel__track" onScroll={handleScroll}>
        {SERVICES.map((service) => (
          <article key={service.key} className="svc-carousel__slide">
            <p className="svc-carousel__key">{service.key}</p>
            <h3>{service.title}</h3>
            <p className="svc-carousel__lead">{service.lead}</p>
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="svc-carousel__dots" role="tablist" aria-label="서비스 슬라이드">
        {SERVICES.map((service, i) => (
          <button
            key={service.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`${service.title} 보기`}
            className={`svc-carousel__dot${active === i ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
