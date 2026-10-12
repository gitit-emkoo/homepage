import Image from "next/image";
import Link from "next/link";
import { DIAGNOSIS_URL } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo" aria-label="리커넥트 홈">
          <Image src="/images/logo.png" alt="ReConnect" width={1400} height={300} preload />
        </Link>
        <a href={DIAGNOSIS_URL} className="header__cta">
          감정 진단
        </a>
      </div>
    </header>
  );
}
