"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const STEPS = [
  {
    title: "이용권(계약)생성",
    desc: "고객 서명으로 확정 후 계약서 와 청구서 SMS발송",
    image: { src: "/images/step-1.png", width: 682 },
  },
  {
    title: "오늘 처리 예정인 이용권 확인",
    desc: "앱을 열고 오늘 방문 예정인 이용권 고객 바로 확인",
    image: { src: "/images/step-2.png", width: 679 },
  },
  {
    title: "사용 처리 시스템 기록 및 안내 발송",
    desc: "사용 처리 > 고객 서명 > 기록 > 안내 SMS발송",
    image: { src: "/images/step-3.png", width: 666 },
  },
  {
    title: "Scheduler (월 간 일정노트)",
    desc: "신경 쓰고 기억하지 않아도 전체 기록을 자동 정리",
    image: { src: "/images/step-4.png", width: 682 },
  },
  {
    title: "이용 권 통계",
    desc: "꼭 필요하고 중요한 숫자들만 심플하게 한눈에",
    image: { src: "/images/step-5.png", width: 650 },
  },
];

export default function Steps() {
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
    <section className="steps" aria-roledescription="carousel" aria-label="패스북 사용법">
      <div className="container">
        <Link href="/guide" className="steps__guide-link">
          패스북 사용법 영상으로 보기
        </Link>
      </div>

      <ol className="steps__track" ref={trackRef} onScroll={handleScroll} tabIndex={0}>
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className={`step${index === active ? " is-active" : ""}`}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${STEPS.length}`}
          >
            <span className="step__badge">STEP {index + 1}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__desc">{step.desc}</p>
            <Image
              className="step__phone"
              src={step.image.src}
              alt={`Step ${index + 1}. ${step.title} 화면`}
              width={step.image.width}
              height={1350}
            />
          </li>
        ))}
      </ol>

      <div className="steps__controls">
        <button
          type="button"
          className="steps__arrow"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="이전 단계"
        >
          ‹
        </button>
        <div className="steps__dots">
          {STEPS.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={`steps__dot${index === active ? " is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Step ${index + 1}. ${step.title}`}
              aria-current={index === active}
            />
          ))}
        </div>
        <button
          type="button"
          className="steps__arrow"
          onClick={() => goTo(active + 1)}
          disabled={active === STEPS.length - 1}
          aria-label="다음 단계"
        >
          ›
        </button>
      </div>
    </section>
  );
}
