import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          <span className="site-header__mark" aria-hidden="true">
            ✓
          </span>
          바다야 <b>자가진단</b>
        </Link>
        <Link href="/#tests" className="site-header__link">
          전체 진단 보기
        </Link>
      </div>
    </header>
  );
}
