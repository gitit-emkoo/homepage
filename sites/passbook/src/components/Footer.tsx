import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Image className="footer__logo" src="/images/logo-footer.jpeg" alt="PassBook" width={308} height={109} />
        <address className="footer__info">
          {COMPANY_INFO.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
        <nav className="footer__links" aria-label="약관">
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </nav>
        <p className="footer__copyright">© Copyright 2026 Made by KWCC Co., Ltd.</p>
      </div>
    </footer>
  );
}
