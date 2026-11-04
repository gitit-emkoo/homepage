"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const FLOW_STEPS = [
  { label: "바다야가 알아서 찾고", src: "/images/step-1-search.png", alt: "검색하는 바다야 캐릭터" },
  { label: "정리도 하고", src: "/images/step-2-analyze.png", alt: "정리하는 바다야 캐릭터" },
  { label: "작성도 해서", src: "/images/step-3-write.png", alt: "대화하며 작성하는 바다야와 사장님" },
  { label: "딱 준비해 드릴게요!", src: "/images/step-4-deliver.png", alt: "준비된 서류를 전달하는 바다야" },
] as const;

export default function FlowProcess() {
  const [active, setActive] = useState(0);
  const dragRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const select = (index: number) => {
    setActive(Math.max(0, Math.min(FLOW_STEPS.length - 1, index)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: event.clientX, y: event.clientY, moved: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (Math.abs(event.clientX - drag.x) > 12 || Math.abs(event.clientY - drag.y) > 12) {
      drag.moved = true;
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || !drag.moved) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) select(active + 1);
    else select(active - 1);
  };

  return (
    <div className="flow-process">
      <div
        className="flow-process__tabs"
        role="tablist"
        aria-label="바다야 이용 과정"
      >
        {FLOW_STEPS.map((step, index) => (
          <button
            key={step.label}
            type="button"
            role="tab"
            id={`flow-tab-${index}`}
            className={`flow-process__tab${index === active ? " is-active" : ""}`}
            aria-label={`${String(index + 1).padStart(2, "0")}. ${step.label}`}
            aria-selected={index === active}
            aria-controls={`flow-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
          >
            <span className="flow-process__tab-num">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div
        className="flow-process__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
      >
        {FLOW_STEPS.map((step, index) => (
          <div
            key={step.src}
            id={`flow-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`flow-tab-${index}`}
            aria-hidden={index !== active}
            className={`flow-process__panel${index === active ? " is-active" : ""}`}
          >
            <div className="flow-process__copy">
              <p className="flow-process__step">Step {String(index + 1).padStart(2, "0")}</p>
              <h4 className="flow-process__label">{step.label}</h4>
            </div>
            <div className="flow-process__visual">
              <span className="flow-process__glow" aria-hidden="true" />
              <Image
                className="flow-process__image"
                src={step.src}
                alt={step.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1080px"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
