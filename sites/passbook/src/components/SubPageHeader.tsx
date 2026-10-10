import Image from "next/image";
import Link from "next/link";

export default function SubPageHeader() {
  return (
    <header className="subnav">
      <div className="subnav__inner">
        <Link href="/" className="subnav__back">
          <Image src="/images/icon-back.png" alt="" width={20} height={20} />
          메인으로
        </Link>
      </div>
    </header>
  );
}
