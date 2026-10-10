import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  body?: ReactNode;
  action?: string;
};

export default function CtaBand({ title, body, action = "문의하기" }: Props) {
  return (
    <section className="cta">
      <div className="wrap cta__inner">
        <h2 className="cta__title">{title}</h2>
        <div className="cta__side">
          {body && <p className="cta__body">{body}</p>}
          <Link href="/contact" className="btn btn--teal">
            {action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
