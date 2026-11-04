"use client";

import { useEffect, useRef, useState } from "react";

const PHASES = [
  {
    id: "meet",
    title: "접수 & 미팅",
    summary: "아이디어와 목적을 확인하고 방향을 잡습니다.",
    heading: (
      <>
        처음부터 검증 목표를 <span>함께 정합니다</span>
      </>
    ),
    body: "문의 접수 후 유선 또는 대면 미팅으로 의도·목적·주요 기능을 확인합니다. 작은 프로젝트일수록 방향 설정이 중요하기 때문에 초기 미팅을 꼼꼼히 진행합니다.",
    points: ["문의 접수", "유선 또는 대면 미팅", "핵심 기능과 동작 확인"],
  },
  {
    id: "scope",
    title: "범위 & 계약",
    summary: "꼭 필요한 범위와 합리적인 견적을 제안합니다.",
    heading: (
      <>
        오버스펙 없이, 검증에 필요한 <span>범위만</span>
      </>
    ),
    body: "핵심 기능 중심으로 현실적인 범위를 제시하고 견적을 제안합니다. 계약 사항을 꼼꼼히 체크한 뒤 착수 전 동작 흐름을 재점검합니다.",
    points: ["적정 범위 및 견적 제안", "계약 및 대면 미팅", "착수 전 재점검"],
  },
  {
    id: "build",
    title: "개발 & 소통",
    summary: "합의된 범위를 기준으로 실시간 소통하며 만듭니다.",
    heading: (
      <>
        합의된 범위 안에서 <span>빠르게 구현합니다</span>
      </>
    ),
    body: "소통 채널을 열고 합의된 범위를 기준으로 개발합니다. 진행 현황을 공유하며 방향이 흔들리지 않게 맞춥니다.",
    points: ["소통 채널 개설", "범위 기준 개발", "진행 현황 공유"],
  },
  {
    id: "handoff",
    title: "검수 & 인계",
    summary: "교차 테스트 후 안전하게 전달하고 운영을 안내합니다.",
    heading: (
      <>
        결과물을 안전하게 넘기고 <span>운영까지 안내합니다</span>
      </>
    ),
    body: "교차 테스트와 수정을 반영한 뒤 클로징 미팅으로 인계합니다. MVP 기준 완료 후 3개월 무상 A/S를 계약서에 명시합니다.",
    points: ["검수 및 수정", "인계 · 클로징 미팅", "운영 · A/S 안내"],
  },
];

function wavePath(t: number) {
  const y0 = 36 + Math.sin(t * 0.85) * 8;
  const c1y = 28 + Math.sin(t * 0.85 + 0.6) * 12;
  const c2y = 170 + Math.sin(t * 0.85 + 1.4) * 16;
  const midY = 128 + Math.sin(t * 0.85 + 2.2) * 14;
  const c3y = 48 + Math.sin(t * 0.85 + 3.1) * 12;
  const endY = 96 + Math.sin(t * 0.85 + 3.9) * 10;
  return `M28 ${y0.toFixed(2)} C120 ${c1y.toFixed(2)} 150 ${c2y.toFixed(2)} 260 ${midY.toFixed(2)} S430 ${c3y.toFixed(2)} 532 ${endY.toFixed(2)}`;
}

export default function ProcessTabs() {
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  const phase = PHASES[active];
  const progress = PHASES.length <= 1 ? 0 : active / (PHASES.length - 1);

  useEffect(() => {
    setDrawn(false);
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, [active]);

  useEffect(() => {
    const path = pathRef.current;
    const pulse = pulseRef.current;
    if (!path || !pulse) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const still = wavePath(0);
      path.setAttribute("d", still);
      pulse.setAttribute("d", still);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const d = wavePath(t);
      path.setAttribute("d", d);
      pulse.setAttribute("d", d);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="process-tabs">
      <div className="process-tabs__rail" aria-hidden="true">
        <div className="process-tabs__rail-track">
          <span className="process-tabs__rail-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="process-tabs__rail-dots">
          {PHASES.map((item, i) => (
            <i key={item.id} className={i <= active ? "is-on" : undefined} />
          ))}
        </div>
      </div>

      <div className="process-tabs__nav" role="tablist" aria-label="진행 절차">
        {PHASES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`process-tabs__tab${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <strong>{item.title}</strong>
            <span>{item.summary}</span>
          </button>
        ))}
      </div>

      <div className="process-tabs__panel" role="tabpanel">
        <svg className="process-tabs__stroke" viewBox="0 0 560 220" aria-hidden="true">
          <path
            ref={pathRef}
            className={`process-tabs__stroke-path${drawn ? " is-drawn" : ""}`}
            d={wavePath(0)}
            fill="none"
            pathLength={1}
          />
          <path
            ref={pulseRef}
            className={`process-tabs__stroke-pulse${drawn ? " is-drawn" : ""}`}
            d={wavePath(0)}
            fill="none"
            pathLength={1}
          />
        </svg>

        <div className="process-tabs__copy">
          <p className="process-tabs__step">Step {String(active + 1).padStart(2, "0")}</p>
          <h3>{phase.heading}</h3>
          <p>{phase.body}</p>
          <ul>
            {phase.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="process-tabs__visual" aria-hidden="true">
          <div className="process-tabs__card process-tabs__card--main">
            <p>진행 체크</p>
            {phase.points.map((point, i) => (
              <div key={point} className={i === 0 ? "is-on" : undefined}>
                <i />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className="process-tabs__card process-tabs__card--note">
            <p>코어셋 메모</p>
            <strong>{phase.title}</strong>
            <span>{phase.summary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
