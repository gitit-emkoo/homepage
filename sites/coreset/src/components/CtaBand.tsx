import type { ReactNode } from "react";
import ContactButton from "@/components/ContactButton";

type Props = {
  title: ReactNode;
  body?: ReactNode;
  action?: string;
};

export default function CtaBand({ title, body, action = "문의하기" }: Props) {
  return (
    <section className="cta">
      <div className="cta__rays" aria-hidden="true" />
      <div className="wrap cta__inner">
        <h2 className="cta__title">{title}</h2>
        <div className="cta__side">
          {body && <p className="cta__body">{body}</p>}
          <ContactButton className="btn btn--accent">
            {action}
            <span aria-hidden="true">→</span>
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
