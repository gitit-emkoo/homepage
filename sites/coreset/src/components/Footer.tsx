import Image from "next/image";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Image src="/images/logo.png" alt="코어셋 CoreSet" width={640} height={129} />
          <p>사업화 가능한 기획 &amp; MVP 앱 개발</p>
        </div>
        <nav className="footer__nav" aria-label="하단 메뉴">
          <Link href="/">홈</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <dl className="footer__info">
          <div>
            <dt>사업자등록번호</dt>
            <dd>{COMPANY.bizNumber}</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>{COMPANY.address}</dd>
          </div>
        </dl>
        <p className="footer__copy">© {COMPANY.name}</p>
      </div>
    </footer>
  );
}
