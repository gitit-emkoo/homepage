import FlowProcess from "@/components/FlowProcess";
import type { CSSProperties, ReactNode } from "react";

type PainPoint = {
  text: string;
  icon: ReactNode;
  delay: string;
};

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconConfused() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.6 9.4a2.4 2.4 0 0 1 4.6.8c0 1.5-2.3 2-2.3 3.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4.5h5.2L17.5 9v10.5H8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13.2 4.5V9H17.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10.2 12.5h5.2M10.2 15.5h3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconLater() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="6" width="15" height="13.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 4.5v3M16 4.5v3M4.5 10.5h15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 14.5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const PAIN_POINTS: PainPoint[] = [
  {
    text: "바쁘고 신경 쓸 시간도 없고",
    icon: <IconClock />,
    delay: "0ms",
  },
  {
    text: "공고가 나한테 맞는지도 헷갈리고",
    icon: <IconConfused />,
    delay: "80ms",
  },
  {
    text: "챙겨야 할 서류에, 작성할 문서에 복잡하고",
    icon: <IconDocs />,
    delay: "160ms",
  },
  {
    text: "결국 나중에... 미루고 잊게 됩니다.",
    icon: <IconLater />,
    delay: "240ms",
  },
];

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="container">
        <h2 className="pain__title reveal" data-anim="fade-in-up">
          평균 <em>280만원</em> 혜택을 왜 못받을까?
        </h2>
        <hr className="pain__divider" />

        <ul className="pain__list">
          {PAIN_POINTS.map((item) => (
            <li
              key={item.text}
              className="pain__item reveal"
              data-anim="pain-rise"
              style={{ "--anim-delay": item.delay } as CSSProperties}
            >
              <span className="pain__icon">{item.icon}</span>
              <span className="pain__text">{item.text}</span>
            </li>
          ))}
        </ul>

        <p
          className="pain__answer reveal"
          data-anim="fade-in-up"
          style={{ "--anim-delay": "320ms" } as CSSProperties}
        >
          기회는 점점 더 많아지는데
          <br />
          <span>챙길 여유는 더 없어지는 대표님!</span>
        </p>

        <h3
          className="pain__flow-title reveal"
          data-anim="fade-in-up"
          style={{ "--anim-delay": "120ms" } as CSSProperties}
        >
          대화하고 제출만 하세요
        </h3>

        <FlowProcess />
      </div>
    </section>
  );
}
