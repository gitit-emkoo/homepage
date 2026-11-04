"use client";

import Link from "next/link";
import { INSTAGRAM_EMBED_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export default function InstagramFeed() {
  if (!INSTAGRAM_EMBED_URL) {
    return (
      <div className="ig-feed ig-feed--placeholder">
        <p>
          Instagram <strong>@{INSTAGRAM_HANDLE}</strong> 피드를 곧 연결합니다.
        </p>
        <p className="ig-feed__hint">
          SnapWidget에서 위젯을 만든 뒤 <code>INSTAGRAM_EMBED_URL</code>에 embed URL을 넣으면 여기에 표시됩니다.
        </p>
        <Link href={INSTAGRAM_URL} className="btn btn--ink" target="_blank" rel="noopener noreferrer">
          @{INSTAGRAM_HANDLE} 보러 가기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="ig-feed">
      <iframe
        className="ig-feed__frame snapwidget-widget"
        src={INSTAGRAM_EMBED_URL}
        title={`@${INSTAGRAM_HANDLE} Instagram 피드`}
        loading="lazy"
        style={{ width: "100%", maxWidth: 765, height: 510, margin: "0 auto" }}
      />
      <p className="ig-feed__more">
        <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-arrow">
          인스타그램에서 더 보기 <span aria-hidden="true">→</span>
        </Link>
      </p>
    </div>
  );
}
