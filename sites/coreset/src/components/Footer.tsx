import Image from "next/image";
import Link from "next/link";
import { COMPANY, INSTAGRAM_URL, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Image src="/images/logo.png" alt="코어셋 CoreSet" width={640} height={129} />
          <p>기획·제작부터 마케팅·AI 크리에이티브까지</p>
        </div>
        <nav className="footer__nav" aria-label="하단 메뉴">
          <Link href="/">홈</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>
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
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </dd>
          </div>
        </dl>
        <p className="footer__copy">© {COMPANY.name}</p>
      </div>
    </footer>
  );
}
