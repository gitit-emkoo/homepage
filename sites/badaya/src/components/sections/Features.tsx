"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

type PhoneSize = "default" | "wide" | "large" | "short";

type Feature = {
  tone: "blue" | "light";
  title: string;
  desc: [string, string];
  descBlack?: boolean;
  phone: { src: string; alt: string; size: PhoneSize };
  extra?: "doc-cards" | "apply-buttons";
};

const FEATURES: Feature[] = [
  {
    tone: "blue",
    title: "사업 조건에 딱 맞는 공고들만 눈앞에",
    desc: ["번거롭게 찾고, 확인할 필요 없이 ", "조건에 맞춰 정확하게 선별해줘요"],
    phone: { src: "/images/phone-1-match.png", alt: "바다야 추천 맞춤 공고 화면", size: "wide" },
  },
  {
    tone: "light",
    title: "준비 서류는 확실하게",
    desc: ["공고별로 다른 제출서류 헷갈리지 않게", "실제 필요한 서류만 딱 정리해 드려요"],
    phone: { src: "/images/phone-2-documents.png", alt: "지원 서류 안내 화면", size: "default" },
    extra: "doc-cards",
  },
  {
    tone: "blue",
    title: "작성이 필요한 문서라면 실전 양식에 딱 맞춰",
    desc: ["사업계획서 뿐 아니라 신청서 까지", "실제 요구하는 양식에 맞춰 준비할 수 있어요"],
    descBlack: true,
    phone: { src: "/images/phone-3-template.png", alt: "실전 양식 문서 작성 화면", size: "default" },
  },
  {
    tone: "light",
    title: "나만의 AI로 서류는 더 쉽고 편하게",
    desc: ["내 사업을 더 잘 아는 나만의 AI가", "문서 초안을 공고 특성에 맞게 작성해 줘요"],
    phone: { src: "/images/phone-4-ai.png", alt: "AI 문서 초안 작성 화면", size: "large" },
  },
  {
    tone: "blue",
    title: "원하는 방법으로 신청까지 한번에",
    desc: ["가벼운 공고는 앱에서 끝내고", "내보내 PC에서 마무리할 수도 있어요"],
    phone: { src: "/images/phone-5-apply.png", alt: "신청 방법 선택 화면", size: "large" },
    extra: "apply-buttons",
  },
  {
    tone: "light",
    title: "몰라서 못 받는일 절대없도록",
    desc: ["놓치기 쉬운 혜택과 마감일\u00a0", "시작부터 끝까지 바다야 가 챙겨드려요"],
    phone: { src: "/images/phone-6-deadline.png", alt: "마감일 알림 화면", size: "short" },
  },
];

const PHONE_SOURCE = { width: 1080, height: 1350 };

function animDuration(ms: number) {
  return { "--anim-duration": `${ms}ms` } as CSSProperties;
}

function PhoneVisual({ phone, extra }: Pick<Feature, "phone" | "extra">) {
  const phoneClass = phone.size === "default" ? "phone" : `phone phone--${phone.size}`;
  const img = <Image className={phoneClass} src={phone.src} alt={phone.alt} {...PHONE_SOURCE} />;

  if (extra === "doc-cards") {
    return (
      <div className="phone-wrap">
        {img}
        <Image
          className="doc-card doc-card--write reveal"
          data-anim="fade-in-up"
          style={animDuration(1500)}
          src="/images/doc-card-write.jpg"
          alt="작성할 서류 목록"
          width={245}
          height={186}
        />
        <Image
          className="doc-card doc-card--submit reveal"
          data-anim="fade-in-up"
          style={animDuration(1000)}
          src="/images/doc-card-submit.jpg"
          alt="제출 서류 목록"
          width={235}
          height={306}
        />
      </div>
    );
  }

  if (extra === "apply-buttons") {
    return (
      <div className="phone-wrap">
        {img}
        <Image
          className="apply-buttons reveal"
          data-anim="zoom-in"
          style={animDuration(1000)}
          src="/images/apply-buttons.jpg"
          alt="바로 신청 또는 PC에서 마무리"
          width={544}
          height={130}
        />
      </div>
    );
  }

  return img;
}

export default function Features() {
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
    <section className="features" aria-roledescription="carousel" aria-label="바다야 주요 기능">
      <ol className="features__track" ref={trackRef} onScroll={handleScroll} tabIndex={0}>
        {FEATURES.map((feature, index) => (
          <li
            key={feature.title}
            className={`feature feature--${feature.tone}${index === active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${FEATURES.length}`}
          >
            <div className="feature__text">
              <h3 className="feature__title">{feature.title}</h3>
              <p className={`feature__desc${feature.descBlack ? " feature__desc--black" : ""}`}>
                {feature.desc[0]}
                <br />
                {feature.desc[1]}
              </p>
            </div>
            <div className="feature__visual">
              <PhoneVisual phone={feature.phone} extra={feature.extra} />
            </div>
          </li>
        ))}
      </ol>

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
