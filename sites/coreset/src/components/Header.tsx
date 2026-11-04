"use client";

import { Glass } from "@samasante/liquid-glass";
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
        <Glass
          className="header__glass"
          radius={18}
          behind="#f4f6f5"
          style={{ background: "rgba(255, 255, 255, 0.18)" }}
          optics={{
            frost: 3,
            strength: 0.08,
            depth: 0.4,
            curvature: 0.2,
            bend: 0.18,
            bendWidth: 0.12,
            dispersion: 0.06,
            brightness: 0.04,
            sheen: 0.22,
            sheenWidth: 1.2,
            sheenFalloff: 1.6,
            sheenAngle: 120,
            sheenDark: false,
            glow: 0.06,
            glowSpread: 0.16,
            glowFalloff: 1.4,
            specular: 0.7,
            saturate: 1.05,
            softEdge: true,
            clipToShape: true,
            splay: 0.04,
            mapSize: 256,
          }}
        >
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
        </Glass>
      </div>
    </header>
  );
}
