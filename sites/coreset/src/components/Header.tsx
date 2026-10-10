"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={`header${open ? " is-open" : ""}`}>
      <div className="header__inner wrap">
        <Link href="/" className="header__logo" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="코어셋 CoreSet" width={640} height={129} preload />
        </Link>
        <nav className="header__nav" id="site-nav" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="header__link"
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn--ink btn--sm header__cta" onClick={() => setOpen(false)}>
            프로젝트 문의
          </Link>
        </nav>
        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
