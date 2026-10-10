import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SubPage({ title, children }: Props) {
  return (
    <>
      <header className="subbar">
        <Link href="/" className="subbar__back">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">홈으로</span>
        </Link>
        <span className="subbar__title">{title}</span>
      </header>
      <article className="doc">{children}</article>
    </>
  );
}
