"use client";

const ORBITS = ["앱", "웹", "광고", "AI", "영상", "브랜딩"];
const CHIPS = ["MVP 앱", "홈페이지", "숏폼 영상", "온라인 광고", "AI 이미지"];

export default function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-stage__panel">
        <p className="hero-stage__ask">무엇을 만들까요?</p>
        <div className="hero-stage__chips">
          {CHIPS.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
        <div className="hero-stage__input">
          <span>아이디어 한 줄이면 충분합니다</span>
          <em>문의 →</em>
        </div>
      </div>
      {ORBITS.map((label, i) => (
        <span key={label} className={`hero-stage__orbit hero-stage__orbit--${i + 1}`}>
          {label}
        </span>
      ))}
    </div>
  );
}
