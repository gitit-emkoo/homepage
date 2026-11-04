"use client";

import { useEffect, useState } from "react";
import AppDownloadButton from "@/components/AppDownloadButton";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`floating-cta${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
      {...(!visible ? { inert: true } : {})}
    >
      <AppDownloadButton className="floating-cta__btn">
        가능한 지원금 바로보여주세요
      </AppDownloadButton>
    </div>
  );
}
