import type { ReactNode } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

function StoreButton({ href, children }: { href: string; children: ReactNode }) {
  if (!href) {
    return (
      <span className="store-btn is-soon">
        {children}
        <em className="store-soon">출시 예정</em>
      </span>
    );
  }
  return (
    <a className="store-btn" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function StoreButtons({ light = false }: { light?: boolean }) {
  return (
    <div className={`store-buttons ${light ? "light" : ""}`}>
      <StoreButton href={PLAY_STORE_URL}>
        <span className="store-mark">▶</span>
        <span>
          <small>GET IT ON</small>Google Play
        </span>
      </StoreButton>
      <StoreButton href={APP_STORE_URL}>
        <span className="store-mark apple">●</span>
        <span>
          <small>Download on the</small>App Store
        </span>
      </StoreButton>
    </div>
  );
}
