"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FLOW_STEPS = [
  { label: "바다야가 알아서 찾고", src: "/images/step-1-search.png", alt: "검색하는 바다야 캐릭터" },
  { label: "정리도 하고", src: "/images/step-2-analyze.png", alt: "정리하는 바다야 캐릭터" },
  { label: "작성도 해서", src: "/images/step-3-write.png", alt: "대화하며 작성하는 바다야와 사장님" },
  { label: "딱 준비해 드릴게요!", src: "/images/step-4-deliver.png", alt: "준비된 서류를 전달하는 바다야" },
] as const;

export default function FlowProcess() {
  const [active, setActive] = useState(0);
  const step = FLOW_STEPS[active];
  const progress = FLOW_STEPS.length <= 1 ? 0 : active / (FLOW_STEPS.length - 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div className="flow-process">
      <div className="flow-process__rail" aria-hidden="true">
        <div className="flow-process__rail-track">
          <span className="flow-process__rail-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flow-process__rail-dots">
          {FLOW_STEPS.map((item, index) => (
            <i key={item.label} className={index <= active ? "is-on" : undefined} />
          ))}
        </div>
      </div>

      <div className="flow-process__nav" role="tablist" aria-label="바다야 진행 단계">
        {FLOW_STEPS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Step ${String(index + 1).padStart(2, "0")} ${item.label}`}
            className={`flow-process__tab${active === index ? " is-active" : ""}`}
            onClick={() => setActive(index)}
          >
            Step {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <div className="flow-process__panel" role="tabpanel">
        <div className="flow-process__copy">
          <p className="flow-process__step">Step {String(active + 1).padStart(2, "0")}</p>
          <h4 className="flow-process__label">{step.label}</h4>
        </div>
        <div className="flow-process__visual">
          <Image
            key={step.src}
            className="flow-process__image"
            src={step.src}
            alt={step.alt}
            width={920}
            height={1150}
            priority={active === 0}
          />
        </div>
      </div>
    </div>
  );
}
