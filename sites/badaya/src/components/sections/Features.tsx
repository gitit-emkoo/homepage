"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

type PhoneSize = "default" | "wide" | "large" | "short";

type Feature = {
  tone: "blue" | "light";
  step: string;
  title: string;
  desc: [string, string];
  descBlack?: boolean;
  phone: { src: string; alt: string; size: PhoneSize };
  extra?: "doc-cards" | "apply-buttons";
};

const FEATURES: Feature[] = [
  {
    tone: "blue",
    step: "01",
    title: "내 사업전용 바다야 탄생",
    desc: ["바다야에게 대표님 사업을 알려주면", "지원금 전용 AI가 탄생해요"],
    phone: { src: "/images/phone-1-match.png", alt: "바다야와 만나요 화면", size: "wide" },
  },
  {
    tone: "light",
    step: "02",
    title: "알아서 찾고 분석해요",
    desc: ["조건에 딱 맞는 가능성 높은 공고만", "정확하게 찾고, 정리해요"],
    phone: { src: "/images/phone-2-documents.png", alt: "공고 검색·분석 화면", size: "default" },
  },
  {
    tone: "blue",
    step: "03",
    title: "작성해야 할 문서는 대화로 끝나요",
    desc: ["작성에 필요한 질문도 알아서 하고", "대답을 분석하며 문서로 완성해요"],
    descBlack: true,
    phone: { src: "/images/phone-3-template.png", alt: "문서 작성 화면", size: "default" },
  },
  {
    tone: "light",
    step: "04",
    title: "실전에 필요한 문서 그대로 준비해요",
    desc: ["완성된 문서는 바로 제출할 수 있게", "실전 양식으로 준비해 드려요"],
    phone: { src: "/images/phone-4-ai.png", alt: "실전 양식 문서 화면", size: "large" },
    extra: "doc-cards",
  },
  {
    tone: "blue",
    step: "05",
    title: "신청 방법도 더 쉽게 안내해요",
    desc: ["챙겨야 할 서류도, 제출 방법도", "한 번 더 안내해요"],
    phone: { src: "/images/phone-5-apply.png", alt: "신청 안내 화면", size: "large" },
    extra: "apply-buttons",
  },
  {
    tone: "light",
    step: "06",
    title: "나만의 바다야 학습시키기",
    desc: ["평소 언제든 편할때 간단히 답 해놓으면", "신청할 때 더 편해져요"],
    phone: { src: "/images/phone-6-deadline.png", alt: "나만의 AI 학습 화면", size: "short" },
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
    <section className="features" aria-roledescription="carousel" aria-label="바다야 사용 플로우">
      <ol className="features__track" ref={trackRef} onScroll={handleScroll} tabIndex={0}>
        {FEATURES.map((feature, index) => (
          <li
            key={feature.step}
            className={`feature feature--${feature.tone}${index === active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${FEATURES.length}`}
          >
            <div className="feature__text">
              <p className="feature__step">{feature.step}</p>
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
          aria-label="이전 단계"
        >
          ‹
        </button>
        <div className="features__dots">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.step}
              type="button"
              className={`features__dot${index === active ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`${index + 1}번째 단계: ${feature.title}`}
              aria-current={index === active}
            />
          ))}
        </div>
        <button
          type="button"
          className="features__arrow"
          onClick={() => goTo(active + 1)}
          disabled={active === FEATURES.length - 1}
          aria-label="다음 단계"
        >
          ›
        </button>
      </div>
    </section>
  );
}
