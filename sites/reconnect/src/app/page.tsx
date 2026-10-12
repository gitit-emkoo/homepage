import Image from "next/image";
import type { CSSProperties } from "react";
import FeatureCarousel from "@/components/FeatureCarousel";
import StoreBadges from "@/components/StoreBadges";
import { DIAGNOSIS_URL } from "@/lib/site";

const VOICES = [
  ["같이 있어도", "늘 혼자인 것 같아..."],
  ["이혼생각은 없는데", "행복하지도 않아.."],
  ["대화는 줄고,", "말을 꺼내기는 어색해..."],
];

const RINGS = [
  { value: 78, label: "심리적", em: "안정감", rest: "이 생김" },
  { value: 85, label: "", em: "감정 표현", rest: "이 좀 더 편해짐" },
];

const REVIEWS = [
  { quote: "카톡으로 대화도 쉽지 않았어요. 리커넥트로 먼저 표현할 수 있었어요.", who: "결혼 5년차 조**" },
  { quote: "기록을 남기니 진짜 노력 중이란 걸 서로 느끼게 되더라고요. 그 자체로도 서운함이 줄었어요.", who: "결혼 11년차 이**" },
  { quote: "감정 카드 진짜 별것 아닌 거 같은데 싸움 횟수가 눈에 띄게 줄었어요.", who: "결혼 17년차 박**" },
];

const BENEFITS = [
  { icon: "🎫", text: "결혼생활 관계 진단 무료", note: "5만원 상당" },
  { icon: "💎", text: "리커넥트 케어 팩 2개월 무료" },
  { icon: "💝", text: "원 클릭 경품 이벤트" },
];

function DiagnosisButton() {
  return (
    <a href={DIAGNOSIS_URL} className="btn">
      EmoMap 감정 진단
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg className={`heart${filled ? " heart--on" : ""}`} viewBox="0 0 24 22" aria-hidden="true">
      <path d="M12 21.4 10.3 19.9C4.2 14.4 0 10.6 0 6.1 0 2.6 2.7 0 6.2 0c2 0 3.9.9 5.1 2.4h1.4C13.9.9 15.8 0 17.8 0 21.3 0 24 2.6 24 6.1c0 4.5-4.2 8.3-10.3 13.8L12 21.4Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <h1 className="hero__title">나의 결혼생활은,</h1>
            <ul className="hero__voices">
              {VOICES.map(([first, second]) => (
                <li key={first}>
                  {first}
                  <br />
                  {second}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__visual">
            <Image
              src="/images/hero-couple.png"
              alt="등을 맞대고 앉아 각자 휴대폰을 보는 부부"
              width={1080}
              height={854}
              preload
            />
          </div>
        </div>
      </section>

      <section className="check">
        <p className="check__text">
          요즘 지쳐있을지도 모를
          <br />
          나의 감정부터 돌아 볼까요?
        </p>
        <DiagnosisButton />
      </section>

      <section className="intro">
        <div className="intro__inner">
          <div className="intro__copy">
            <h2 className="intro__title">
              나의 감정을 돌보고
              <br />
              관계는 더 가깝게
              <br />
              만들어 주는 <em>따뜻한 공간</em>
            </h2>
            <p className="intro__desc">
              감정 분석부터 관계 회복 루틴까지
              <br />
              나, 그리고 우리를 읽어주는
              <br />
              AI 기반 정서 케어 공간입니다.
            </p>
            <StoreBadges />
          </div>
          <div className="intro__visual">
            <Image
              src="/images/app-home.png"
              alt="우리의 감정 온도와 파트너 연결, 감정 일기 달력이 보이는 리커넥트 홈 화면"
              width={1009}
              height={2000}
            />
          </div>
        </div>
      </section>

      <FeatureCarousel />

      <section className="beyond">
        <div className="section-head">
          <p className="eyebrow">Beyond Care</p>
          <h2 className="section-title">
            ReConnect는
            <br />
            케어에만 머무르지 않아요
          </h2>
        </div>
        <blockquote className="beyond__quote">
          <p>
            최선을 다한 정서적 해방과
            <br />
            그 노력들을 데이터로 쌓아갑니다.
          </p>
          <p>
            관계를 지켜가는 노력도
            <br />
            어쩔 수 없는 이별의 과정까지
            <br />
            감정과 현실 모두에
            <br />
            후회가 남지 않도록 돕습니다.
          </p>
        </blockquote>
      </section>

      <section className="results" aria-labelledby="results-title">
        <div className="section-head">
          <p className="eyebrow">Beta Test</p>
          <h2 id="results-title" className="section-title">
            사전 테스터 결과
          </h2>
          <p className="section-sub">30~50대 1,000커플 · 3개월 테스트</p>
        </div>

        <div className="results__grid">
          <div className="stat stat--bar">
            <div className="bar" role="img" aria-label="71%">
              <span className="bar__fill" style={{ width: "71%" }}>
                71%
              </span>
            </div>
            <p className="stat__label">
              리커넥트 사용 전보다 <em>관계 개선을 노력</em>해 보고 싶은 마음이 생김
            </p>
          </div>

          {RINGS.map((ring) => (
            <div key={ring.value} className="stat">
              <div className="ring" style={{ "--p": ring.value } as CSSProperties} role="img" aria-label={`${ring.value}%`}>
                <span>{ring.value}%</span>
              </div>
              <p className="stat__label">
                {ring.label && `${ring.label} `}
                <em>{ring.em}</em>
                {ring.rest}
              </p>
            </div>
          ))}

          <div className="stat stat--hearts">
            <div className="hearts" role="img" aria-label="10쌍 중 4쌍">
              {Array.from({ length: 10 }, (_, i) => (
                <Heart key={i} filled={i < 4} />
              ))}
            </div>
            <p className="stat__label">
              이혼을 고려하던 10쌍 중 4쌍은 리커넥트를 통해
              <br />
              <em>다시 한번 서로를 바라보게</em> 되었습니다
            </p>
          </div>
        </div>
      </section>

      <section className="reviews" aria-labelledby="reviews-title">
        <div className="section-head">
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-title" className="section-title">
            테스터들의 사용 후기
          </h2>
        </div>
        <ul className="reviews__list">
          {REVIEWS.map((review) => (
            <li key={review.who}>
              <figure className="review">
                <blockquote className="review__quote">{review.quote}</blockquote>
                <figcaption className="review__who">{review.who}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="benefit" aria-labelledby="benefit-title">
        <div className="benefit__inner">
          <h2 id="benefit-title" className="benefit__title">
            론칭 기념 가입 혜택 🎁
          </h2>
          <p className="benefit__limit">선착순 5,000명</p>
          <ul className="benefit__list">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text}>
                <span className="benefit__icon" aria-hidden="true">
                  {benefit.icon}
                </span>
                <span>
                  {benefit.text}
                  {benefit.note && <small> ({benefit.note})</small>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="founder">
        <div className="founder__inner">
          <Image
            className="founder__illust"
            src="/images/founder-illust.png"
            alt=""
            width={441}
            height={429}
          />
          <div className="founder__body">
            <blockquote className="founder__quote">
              <p>
                수많은 부부가 감정을 표현하지 못해
                <br />
                관계를 놓치는 모습을 보았습니다.
              </p>
              <p>
                그래서 감정을 기록하고, 이해하고,
                <br />
                증명할 수 있는 플랫폼을 만들었습니다.
              </p>
            </blockquote>
            <p className="founder__sign">
              16년차 이혼 전문 변호사가 설계한,
              <br />
              <strong>관계 회복을 위한 감정 기술</strong>
            </p>
            <DiagnosisButton />
          </div>
        </div>
      </section>
    </>
  );
}
