"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

const LogoStage = dynamic(() => import("@/components/LogoStage"), {
  ssr: false,
  loading: () => (
    <div className="hero__fallback" aria-hidden="true">
      <img src="/kwcc_3d_logo.png" alt="" />
    </div>
  ),
});

const HOTSPOTS = [
  {
    id: "portfolio",
    index: "01",
    label: "Portfolio",
    hint: "우리가 만든 서비스",
  },
  {
    id: "about",
    index: "02",
    label: "About",
    hint: "뫼비우스처럼 이어지는 팀",
  },
  {
    id: "contact",
    index: "03",
    label: "Contact",
    hint: "프로젝트 문의",
  },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero__stage3d" aria-hidden={reduceMotion ? undefined : true}>
        {reduceMotion ? (
          <div className="hero__fallback">
            <img src="/kwcc_3d_logo.png" alt="KWCC 유리 뫼비우스 로고" />
          </div>
        ) : (
          <LogoStage className="hero__canvas-wrap" />
        )}
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__shell">
        <nav className="topbar" aria-label="주요 메뉴">
          <ul className="topbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="topbar__brand" href="#top" aria-label="KWCC 홈">
            <img src="/kwcc_logo.png" alt="" className="topbar__mark" />
            <span>KWCC</span>
          </a>
          <span className="topbar__meta">Glass · Möbius</span>
        </nav>

        <div className="hero__stage">
          <div className="hero__copy">
            <p className="hero__eyebrow">Digital Product Studio</p>
            <h1 className="hero__title">KWCC</h1>
            <p className="hero__lead">
              하늘 위 유리 뫼비우스처럼, 기획과 실행이 끊기지 않고 이어집니다.
            </p>
          </div>

          <div className="hotspots" role="navigation" aria-label="섹션 바로가기">
            {HOTSPOTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="hotspot"
                onClick={() => scrollToId(item.id)}
              >
                <span className="hotspot__index">{item.index}</span>
                <span className="hotspot__label">{item.label}</span>
                <span className="hotspot__hint">{item.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero__footer">
          <span>www.kwcc.im</span>
          <span className="scroll-cue">Scroll</span>
        </div>
      </div>
    </header>
  );
}
