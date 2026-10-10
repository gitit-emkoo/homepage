import Link from "next/link";
import { COMPANY } from "@/lib/site";

const LINKS = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/trust", label: "신뢰운영원칙" },
  { href: "/support", label: "고객센터" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <address className="footer__info">
          {COMPANY.name}
          <br />
          대표 : {COMPANY.ceo}
          <br />
          {COMPANY.address}
          <br />
          전화번호 : {COMPANY.phone} | 이메일 : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <br />
          사업자등록번호 {COMPANY.bizNumber}
          <br />
          통신판매업신고 : {COMPANY.mailOrder}
        </address>
        <nav className="footer__links" aria-label="정책 및 고객센터">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="footer__copy">© Copyright 2025 Made by PickPlay</p>
      </div>
    </footer>
  );
}
