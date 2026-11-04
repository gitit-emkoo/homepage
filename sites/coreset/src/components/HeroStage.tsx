"use client";

import ContactButton from "@/components/ContactButton";

const ORBITS = [
  {
    key: "app",
    label: "앱",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-app" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3ec8d6" />
            <stop offset="100%" stopColor="#1a8a9a" />
          </linearGradient>
        </defs>
        <rect x="7" y="3" width="10" height="18" rx="2.5" fill="none" stroke="url(#g-app)" strokeWidth="1.8" />
        <path d="M10 18.5h4" stroke="url(#g-app)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "web",
    label: "웹",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-web" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65a5e1" />
            <stop offset="100%" stopColor="#3f6fd0" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="8.2" fill="none" stroke="url(#g-web)" strokeWidth="1.8" />
        <path
          d="M4 12h16M12 4c2.4 2.4 3.6 5.1 3.6 8s-1.2 5.6-3.6 8c-2.4-2.4-3.6-5.1-3.6-8s1.2-5.6 3.6-8z"
          fill="none"
          stroke="url(#g-web)"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    key: "ads",
    label: "광고",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-ads" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#837ee5" />
            <stop offset="100%" stopColor="#5b52d4" />
          </linearGradient>
        </defs>
        <path
          d="M4 10v4h3l5 3.5V6.5L7 10H4z"
          fill="none"
          stroke="url(#g-ads)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M16 9.2a3.2 3.2 0 0 1 0 5.6M17.8 7a5.4 5.4 0 0 1 0 10"
          fill="none"
          stroke="url(#g-ads)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "ai",
    label: "AI",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-ai" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b24ad8" />
            <stop offset="100%" stopColor="#9b5de5" />
          </linearGradient>
        </defs>
        <path
          d="M12 3.5l1.4 4.2L18 9l-4.6 1.3L12 14.5l-1.4-4.2L6 9l4.6-1.3L12 3.5z"
          fill="none"
          stroke="url(#g-ai)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" fill="url(#g-ai)" />
      </svg>
    ),
  },
  {
    key: "video",
    label: "영상",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-video" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e05ad0" />
            <stop offset="100%" stopColor="#d831d8" />
          </linearGradient>
        </defs>
        <rect x="3.5" y="6.5" width="12" height="11" rx="2" fill="none" stroke="url(#g-video)" strokeWidth="1.8" />
        <path
          d="M15.5 10.5 20 8v8l-4.5-2.5z"
          fill="none"
          stroke="url(#g-video)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "brand",
    label: "브랜딩",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="g-brand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3ec8d6" />
            <stop offset="100%" stopColor="#0f7f80" />
          </linearGradient>
        </defs>
        <path
          d="M5 18.5 14.5 5.8a2 2 0 0 1 3 0L19 7.2a2 2 0 0 1 0 3L9.5 18.5H5z"
          fill="none"
          stroke="url(#g-brand)"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12.5 8.2 16 11.7" stroke="url(#g-brand)" strokeWidth="1.6" />
      </svg>
    ),
  },
] as const;

const CHIPS = [
  { title: "앱 · 웹", desc: "MVP · 홈페이지" },
  { title: "마케팅", desc: "영상 · 광고" },
  { title: "AI", desc: "이미지 · 영상" },
] as const;

export default function HeroStage() {
  return (
    <div className="hero-stage">
      <div className="hero-stage__panel">
        <p className="hero-stage__ask">무엇을 만들까요?</p>
        <div className="hero-stage__chips" aria-hidden="true">
          {CHIPS.map((chip) => (
            <span key={chip.title}>
              <strong>{chip.title}</strong>
              <em>{chip.desc}</em>
            </span>
          ))}
        </div>
        <ContactButton className="hero-stage__input">
          <span>아이디어 한 줄이면 충분합니다</span>
          <em>문의 →</em>
        </ContactButton>
      </div>
      {ORBITS.map((item, i) => (
        <span
          key={item.key}
          className={`hero-stage__orbit hero-stage__orbit--${i + 1} hero-stage__orbit--${item.key}`}
          title={item.label}
          aria-hidden="true"
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
