"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactButton from "@/components/ContactButton";
import { NAV_LINKS } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`header${open ? " is-open" : ""}`}>
      <div className="header__shell wrap">
        <div className="header__inner">
          <Link href="/" className="header__logo" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="코어셋 CoreSet" width={640} height={129} preload />
          </Link>
          <nav className="header__nav" id="site-nav" aria-label="주요 메뉴">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="header__link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <ContactButton className="btn btn--accent btn--sm header__cta">프로젝트 문의</ContactButton>
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
      </div>
    </header>
  );
}
