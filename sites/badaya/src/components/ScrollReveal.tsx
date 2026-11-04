"use client";

import { useEffect } from "react";

/** 화면에 들어온 `.reveal`, `.cmt__stage` 요소에 `is-visible`을 붙여 CSS 애니메이션을 시작한다. */
export default function ScrollReveal() {
  useEffect(() => {
    const select = () => document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible), .cmt__stage:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      select().forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );

    const observeAll = () => {
      select().forEach((el) => observer.observe(el));
    };

    observeAll();
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
