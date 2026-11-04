"use client";

import { useEffect, useRef } from "react";

export default function HeroVisual() {
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
        /* 자동재생이 막힌 환경에서는 포스터처럼 첫 프레임만 둔다 */
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
    <div className="hero__visual">
      <video
        ref={videoRef}
        className="hero__video"
        src="/videos/video_hero_badaya.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
