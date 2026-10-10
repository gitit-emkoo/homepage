import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

type Props = {
  /** badge: 검은 공식 배지, cta: 하단 파란 띠에 놓이는 흰색 버튼 */
  variant?: "badge" | "cta";
};

export default function StoreButtons({ variant = "badge" }: Props) {
  if (variant === "cta") {
    return (
      <div className="store store--cta">
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
          <Image src="/images/cta-google.jpg" alt="플레이스토어 시작하기" width={320} height={132} />
        </a>
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          <Image src="/images/cta-apple.jpg" alt="앱스토어 시작하기" width={320} height={129} />
        </a>
      </div>
    );
  }

  return (
    <div className="store">
      <a className="store__badge" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Image src="/images/badge-google.jpg" alt="Google Play에서 받기" width={1092} height={288} />
      </a>
      <a className="store__badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Image src="/images/badge-apple.jpg" alt="App Store에서 다운로드" width={1075} height={294} />
      </a>
    </div>
  );
}
