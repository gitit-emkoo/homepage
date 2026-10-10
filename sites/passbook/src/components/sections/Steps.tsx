import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    title: "Step 1. 이용권(계약)생성",
    desc: "고객 서명으로 확정 후 계약서 와 청구서 SMS발송",
    image: { src: "/images/step-1.png", width: 682 },
  },
  {
    title: "Step 2. 오늘 처리 예정인 이용권 확인",
    desc: "앱을 열고 오늘 방문 예정인 이용권 고객 바로 확인",
    image: { src: "/images/step-2.png", width: 679 },
  },
  {
    title: "Step 3. 사용 처리 시스템 기록 및 안내 발송",
    desc: "사용 처리 > 고객 서명 > 기록 > 안내 SMS발송",
    image: { src: "/images/step-3.png", width: 666 },
  },
  {
    title: "Step 4. Scheduler (월 간 일정노트)",
    desc: "신경 쓰고 기억하지 않아도 전체 기록을 자동 정리",
    image: { src: "/images/step-4.png", width: 682 },
  },
  {
    title: "Step 5. 이용 권 통계",
    desc: "꼭 필요하고 중요한 숫자들만 심플하게 한눈에",
    image: { src: "/images/step-5.png", width: 650 },
  },
];

export default function Steps() {
  return (
    <section className="steps">
      <div className="container">
        <Link href="/guide" className="steps__guide-link">
          패스북 사용법 영상으로 보기
        </Link>
        <ol className="steps__list">
          {STEPS.map((step) => (
            <li key={step.title} className="step">
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
              <Image
                className="step__phone"
                src={step.image.src}
                alt={`${step.title} 화면`}
                width={step.image.width}
                height={1350}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
