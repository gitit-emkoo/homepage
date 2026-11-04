"use client";

type Props = {
  ask: string;
  lines: string[];
};

export default function ClicheMarquee({ ask, lines }: Props) {
  const loop = [...lines, ...lines];

  return (
    <section className="cliche">
      <div className="wrap">
        <p className="cliche__ask">{ask}</p>
      </div>
      <div className="cliche__marquee" aria-label="흔히 보는 클리셰 문구">
        <div className="cliche__track">
          {loop.map((line, i) => (
            <span key={`${line}-${i}`} className="cliche__item">
              <s>{line}</s>
              <span className="cliche__sep" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
