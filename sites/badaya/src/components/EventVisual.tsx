"use client";

import { useEffect, useRef } from "react";

export default function EventVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const tryPlay = () => {
      video.play().catch(() => {
        /* 자동재생이 막힌 환경에서는 첫 프레임만 둔다 */
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    tryPlay();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="event__visual">
      <video
        ref={videoRef}
        className="event__video"
        src="/videos/spoon.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="받을 수 있는 혜택을 떠먹여 주는 바다야"
      />
    </div>
  );
}
