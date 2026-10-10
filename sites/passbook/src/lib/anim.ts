import type { CSSProperties } from "react";

export type AnimName = "fade-in" | "fade-in-up" | "slide-in-up" | "slide-in-left" | "zoom-in" | "heart-beat";

/** `.reveal` 요소에 붙일 애니메이션 속성. 실제 재생은 ScrollReveal 이 화면 진입 시 시작한다. */
export function reveal(name: AnimName, durationMs: number, options: { repeat?: number; style?: CSSProperties } = {}) {
  return {
    "data-anim": name,
    style: {
      ...options.style,
      "--anim-duration": `${durationMs}ms`,
      "--anim-repeat": options.repeat ?? 1,
    } as CSSProperties,
  };
}
