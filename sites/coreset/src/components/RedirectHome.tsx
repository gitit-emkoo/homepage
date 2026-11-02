"use client";

import { useEffect } from "react";

type Props = {
  hash?: string;
};

export default function RedirectHome({ hash }: Props) {
  useEffect(() => {
    const target = hash ? `/#${hash}` : "/";
    window.location.replace(target);
  }, [hash]);

  return (
    <section className="section">
      <div className="wrap">
        <p>
          <a href={hash ? `/#${hash}` : "/"}>홈으로 이동</a>합니다…
        </p>
      </div>
    </section>
  );
}
