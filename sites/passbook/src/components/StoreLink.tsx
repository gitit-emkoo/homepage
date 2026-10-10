"use client";

import type { MouseEvent, ReactNode } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

type Props = {
  children: ReactNode;
  className?: string;
  newTab?: boolean;
};

/** 기본은 플레이스토어로 가고, 아이폰·아이패드에서는 앱스토어로 보낸다. */
export default function StoreLink({ children, className, newTab = false }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      event.preventDefault();
      window.open(APP_STORE_URL, newTab ? "_blank" : "_self", "noopener");
    }
  };

  return (
    <a
      href={PLAY_STORE_URL}
      className={className}
      onClick={handleClick}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
