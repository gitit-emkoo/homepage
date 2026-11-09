"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ModalPanel from "@/components/ModalPanel";
import Portfolio from "@/components/Portfolio";
import { COMPANY, SITE_NAME } from "@/lib/site";

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

type PanelId = (typeof HOTSPOTS)[number]["id"];

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [active, setActive] = useState<PanelId | null>(null);
  const year = new Date().getFullYear();

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("lock-scroll");
    document.body.classList.add("lock-scroll");
    return () => {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  const activeMeta = HOTSPOTS.find((item) => item.id === active);

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
                className={`hotspot${active === item.id ? " hotspot--active" : ""}`}
                onClick={() => setActive(item.id)}
                aria-expanded={active === item.id}
              >
                <span className="hotspot__index">{item.index}</span>
                <span className="hotspot__label">{item.label}</span>
                <span className="hotspot__hint">{item.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero__footer">
          <a className="hero__footer-link" href="https://kwcc.pages.dev/">
            https://kwcc.pages.dev/
          </a>
          <span className="hero__footer-copy">
            © {year} {SITE_NAME} · {COMPANY.name}
          </span>
        </div>
      </div>

      <ModalPanel
        open={active !== null}
        index={activeMeta?.index ?? ""}
        title={activeMeta?.label ?? ""}
        onClose={close}
      >
        {active === "portfolio" && <Portfolio />}
        {active === "about" && <About />}
        {active === "contact" && <Contact />}
      </ModalPanel>
    </header>
  );
}
