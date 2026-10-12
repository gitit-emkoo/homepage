import Image from "next/image";
import { STORE_LINKS } from "@/lib/site";

const BADGES = [
  { key: "google", src: "/images/badge-google.png", alt: "Google Play에서 받기" },
  { key: "apple", src: "/images/badge-apple.png", alt: "App Store에서 다운로드" },
] as const;

export default function StoreBadges() {
  return (
    <div className="stores">
      {BADGES.map((badge) => {
        const image = <Image src={badge.src} alt={badge.alt} width={1215} height={360} />;
        const href = STORE_LINKS[badge.key];
        return href ? (
          <a key={badge.key} className="stores__badge" href={href} target="_blank" rel="noopener noreferrer">
            {image}
          </a>
        ) : (
          <span key={badge.key} className="stores__badge is-soon">
            {image}
            <em className="stores__soon">출시 예정</em>
          </span>
        );
      })}
    </div>
  );
}
