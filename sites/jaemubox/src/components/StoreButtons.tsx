import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export default function StoreButtons({ light = false }: { light?: boolean }) {
  return (
    <div className={`store-buttons ${light ? "light" : ""}`}>
      <a className="store-btn" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
        <span className="store-mark">▶</span>
        <span>
          <small>GET IT ON</small>Google Play
        </span>
      </a>
      <a className="store-btn" href={APP_STORE_URL} target="_blank" rel="noreferrer">
        <span className="store-mark apple">●</span>
        <span>
          <small>Download on the</small>App Store
        </span>
      </a>
    </div>
  );
}
