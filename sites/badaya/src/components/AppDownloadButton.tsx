"use client";

import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function goToAppStore() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("android")) {
    window.location.href = PLAY_STORE_URL;
  } else if (/iphone|ipad|ipod/.test(ua)) {
    window.location.href = APP_STORE_URL;
  } else {
    alert("바다야 앱은 모바일 기기에서 다운로드 가능합니다.");
  }
}

export default function AppDownloadButton({ children, className = "" }: Props) {
  return (
    <button type="button" className={`btn btn--primary ${className}`.trim()} onClick={goToAppStore}>
      {children}
    </button>
  );
}
