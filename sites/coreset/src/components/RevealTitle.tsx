"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  lines: ReactNode[];
  as?: "h2" | "h1" | "p";
};

export default function RevealTitle({ className = "", lines, as: Tag = "h2" }: Props) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`reveal-title ${className}`.trim()}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-title__line" style={{ ["--i" as string]: i }}>
          <span className="reveal-title__inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
