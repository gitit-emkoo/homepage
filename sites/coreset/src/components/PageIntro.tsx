import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  children?: ReactNode;
};

export default function PageIntro({ label, title, children }: Props) {
  return (
    <section className="intro">
      <div className="wrap">
        <p className="label">{label}</p>
        <h1 className="intro__title">{title}</h1>
        {children && <div className="intro__body">{children}</div>}
      </div>
    </section>
  );
}
