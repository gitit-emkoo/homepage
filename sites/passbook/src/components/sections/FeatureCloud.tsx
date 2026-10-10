import { reveal } from "@/lib/anim";

/** 원본 360px 화면 기준 좌표(x는 글자 가운데, y는 위쪽)와 글자 크기. CSS 에서 화면 폭에 맞춰 비율로 늘어난다. */
const WORDS = [
  { text: "제품 거래처 등록", x: 261.8, y: 23, size: 16, color: "#b2b2b2", duration: 1650 },
  { text: "담당자별 집계", x: 110.4, y: 27, size: 17, color: "#d8d8d8", duration: 2600 },
  { text: "제품판매 자동문자", x: 63.6, y: 47, size: 15, color: "#858585", duration: 3850 },
  { text: "직원관리 기능", x: 207, y: 48, size: 16, color: "#cfcfcf", duration: 2880 },
  { text: "경비지출관리", x: 262, y: 73, size: 18, color: "#858585", duration: 3600 },
  { text: "고객별 제품결제", x: 145.3, y: 76, size: 15, color: "#afafaf", duration: 2800 },
  { text: "인센티브 기능", x: 44.2, y: 96, size: 16, color: "#636363", duration: 2400 },
  { text: "직원 휴가 설정", x: 149, y: 96, size: 17, color: "#858585", duration: 3950 },
  { text: "제품 미지급금 정산", x: 303, y: 96, size: 16, color: "#c3c3c3", duration: 2000 },
  { text: "고객 등급 설정", x: 125.1, y: 124, size: 17, color: "#b5b5b5", duration: 3650 },
  { text: "특정 플랫폼 예약막기", x: 260.8, y: 125, size: 16, color: "#858585", duration: 1900 },
  { text: "고객 상담 관리", x: 81.4, y: 152.8, size: 15, color: "#5c5c5c", duration: 4400 },
  { text: "휴무설정", x: 193.6, y: 153.8, size: 12, color: "#4f4f4f", duration: 4500 },
];

const DOTS = [
  { opacity: 1, duration: 5000 },
  { opacity: 0.7, duration: 6000 },
  { opacity: 0.3, duration: 7000 },
];

export default function FeatureCloud() {
  return (
    <section className="cloud">
      <div className="cloud__words" aria-hidden="true">
        {WORDS.map((word) => (
          <span
            key={word.text}
            className="cloud__word reveal"
            {...reveal("fade-in", word.duration, {
              style: {
                left: `${(word.x / 360) * 100}%`,
                top: `${(word.y / 200) * 100}%`,
                color: word.color,
                ["--size" as string]: word.size,
              },
            })}
          >
            {word.text}
          </span>
        ))}
      </div>
      <div className="cloud__dots" aria-hidden="true">
        {DOTS.map((dot) => (
          <span
            key={dot.duration}
            className="cloud__dot reveal"
            {...reveal("fade-in", dot.duration, { style: { background: `rgba(255, 255, 255, ${dot.opacity})` } })}
          />
        ))}
      </div>
      <p className="cloud__text">
        비싼 사용료가 아깝지 않을 정도로
        <br />
        복잡한 기능들을 모두 사용할 필요가 있는
        <br />
        경우만 아니라면
      </p>
    </section>
  );
}
