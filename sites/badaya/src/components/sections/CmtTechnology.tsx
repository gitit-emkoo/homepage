import Image from "next/image";
import type { CSSProperties } from "react";

const BADGES = [
  { key: "c", letter: "C", en: "Criteria", ko: "자격요건", beat: "10s" },
  { key: "m", letter: "M", en: "Materials", ko: "필요서류", beat: "11s" },
  { key: "t", letter: "T", en: "Template", ko: "작성양식", beat: "9s" },
];

export default function CmtTechnology() {
  return (
    <section className="cmt">
      <div className="container">
        <p className="cmt__eyebrow">바다야 의 압도적 차이</p>
        <h2 className="cmt__title">
          단순 추천이 아닌 선별과 신청 과정을
          <br />
          실전 구조로 바꾸는 <em>C.M.T 기술</em>
        </h2>

        <div className="cmt__stage">
          <div className="cmt__shadow" />
          <Image className="cmt__bear" src="/images/cmt-bear.png" alt="CMT 칩을 든 바다야 곰 캐릭터" width={1920} height={1920} />
          {BADGES.map((badge) => (
            <div
              key={badge.key}
              className={`cmt__badge cmt__badge--${badge.key}`}
              style={{ "--beat-duration": badge.beat } as CSSProperties}
            >
              <span className="cmt__letter">{badge.letter}</span>
              <span className="cmt__en">{badge.en}</span>
              <span className="cmt__ko">{badge.ko}</span>
            </div>
          ))}
        </div>

        <p className="cmt__tagline">
          <span className="cmt__tagline-1">정확하고</span>
          <span className="cmt__tagline-2">편리하게</span>
          <span className="cmt__tagline-3">실전에 맞춘</span>
        </p>
      </div>
    </section>
  );
}
