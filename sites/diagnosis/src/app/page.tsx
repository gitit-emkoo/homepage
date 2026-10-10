import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, BADAYA_URL, PLAY_STORE_URL, TESTS } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="hub-hero">
        <div className="hub-hero__inner">
          <p className="hub-hero__kicker">바다야 사업자 자가진단 · 무료</p>
          <h1 className="hub-hero__title">
            내 사업, 지금
            <br />몇 점일까요?
          </h1>
          <p className="hub-hero__lead">
            1~3분이면 끝나는 4가지 진단으로 내 사업의 현재 상태와
            <br className="pc-only" /> 가장 먼저 챙길 것을 확인해 보세요. 회원가입 없이 바로 시작할 수 있어요.
          </p>
        </div>
      </section>

      <section id="tests" className="hub-tests" aria-label="진단 목록">
        <ul className="hub-tests__grid">
          {TESTS.map((test, index) => (
            <li key={test.slug}>
              <Link href={`/${test.slug}`} className="test-card">
                <div className="test-card__visual">
                  <Image
                    {...test.image}
                    alt={test.image.alt}
                    sizes="(min-width: 900px) 520px, 100vw"
                    preload={index < 2}
                  />
                </div>
                <div className="test-card__body">
                  <p className="test-card__meta">
                    <span>{test.title}</span>
                    <span>
                      {test.duration} · {test.format}
                    </span>
                  </p>
                  <h2 className="test-card__question">{test.question}</h2>
                  <p className="test-card__desc">{test.description}</p>
                  <span className="test-card__cta">진단 시작하기</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="hub-badaya">
        <div className="hub-badaya__inner">
          <div className="hub-badaya__copy">
            <p className="hub-badaya__kicker">진단 다음 단계</p>
            <h2 className="hub-badaya__title">
              몰라서 놓쳐왔던 지원혜택부터
              <br />꼭 챙기세요
            </h2>
            <p className="hub-badaya__desc">
              바다야는 내 사업조건에 맞는 지원사업을 찾아주고, 공고별 필요서류와 신청서 그리고 사업계획서 AI 작성까지
              모든 게 쉬워져요.
            </p>
            <div className="hub-badaya__actions">
              <a className="store-btn" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                Google Play
              </a>
              <a className="store-btn" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                App Store
              </a>
              <a className="text-link" href={BADAYA_URL}>
                바다야 알아보기
              </a>
            </div>
          </div>
          <Image
            className="hub-badaya__image"
            src="/images/badaya-gom.png"
            alt="바다야 곰 캐릭터와 사장님"
            width={1600}
            height={900}
            sizes="(min-width: 900px) 520px, 100vw"
          />
        </div>
      </section>
    </>
  );
}
