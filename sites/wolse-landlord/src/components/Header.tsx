"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";

const LINKS = [
  ["#benefits", "중개사 혜택"],
  ["#compare", "렌트프리 비교"],
  ["#simulation", "계산 방식"],
  ["#owners", "임대인·시행사"],
  ["#apply", "파트너 신청"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="brand" href="#top">
        <BrandLogo />
        <span>월세 스위치</span>
      </a>
      <nav className={open ? "nav open" : "nav"}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#apply">
        파트너 문의
      </a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>
        ☰
      </button>
    </header>
  );
}
