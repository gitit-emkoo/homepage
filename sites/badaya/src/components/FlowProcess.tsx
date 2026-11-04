"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FLOW_STEPS = [
  { label: "바다야가 알아서 찾고", src: "/images/step-1-search.png", alt: "검색하는 바다야 캐릭터" },
  { label: "정리도 하고", src: "/images/step-2-analyze.png", alt: "정리하는 바다야 캐릭터" },
  { label: "작성도 해서", src: "/images/step-3-write.png", alt: "대화하며 작성하는 바다야와 사장님" },
  { label: "딱 준비해 드릴게요!", src: "/images/step-4-deliver.png", alt: "준비된 서류를 전달하는 바다야" },
] as const;

export default function FlowProcess() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(0);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const total = Math.max(root.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const index = Math.min(
        FLOW_STEPS.length - 1,
        Math.floor(progress * FLOW_STEPS.length + 0.001),
      );
      setActive((prev) => (prev === index ? prev : index));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const progress = FLOW_STEPS.length <= 1 ? 0 : active / (FLOW_STEPS.length - 1);

  const goTo = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const total = Math.max(root.offsetHeight - window.innerHeight, 1);
    const target =
      window.scrollY +
      root.getBoundingClientRect().top +
      (index / FLOW_STEPS.length) * total +
      8;
    window.scrollTo({
      top: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <div className="flow-process" ref={rootRef}>
      <div className="flow-process__sticky">
        <div className="flow-process__stage">
          <div className="flow-process__copy">
            <p className="flow-process__step">Step {String(active + 1).padStart(2, "0")}</p>
            <div className="flow-process__labels" aria-live="polite">
              {FLOW_STEPS.map((step, index) => (
                <h4
                  key={step.label}
                  className={`flow-process__label${index === active ? " is-active" : ""}`}
                >
                  {step.label}
                </h4>
              ))}
            </div>

            <div className="flow-process__rail" aria-hidden="true">
              <div className="flow-process__rail-track">
                <span className="flow-process__rail-fill" style={{ width: `${progress * 100}%` }} />
              </div>
              <div className="flow-process__rail-dots">
                {FLOW_STEPS.map((step, index) => (
                  <i key={step.label} className={index <= active ? "is-on" : undefined} />
                ))}
              </div>
            </div>

            <ol className="flow-process__index">
              {FLOW_STEPS.map((step, index) => (
                <li key={step.label}>
                  <button
                    type="button"
                    className={`flow-process__index-btn${index === active ? " is-active" : ""}`}
                    aria-label={`Step ${String(index + 1).padStart(2, "0")} ${step.label}`}
                    aria-current={index === active}
                    onClick={() => goTo(index)}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flow-process__visual">
            {FLOW_STEPS.map((step, index) => (
              <Image
                key={step.src}
                className={`flow-process__image${index === active ? " is-active" : ""}`}
                src={step.src}
                alt={step.alt}
                width={920}
                height={1150}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
