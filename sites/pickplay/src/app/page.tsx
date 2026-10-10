import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StoreButtons from "@/components/StoreButtons";
import { YOUTUBE_ID } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FEATURES = [
  {
    title: "매일 가볍게 데일리Pick !",
    body: ["매일의 선택이 쌓이면", "애니마코드가 탄생해요"],
    images: [{ src: "/images/screen-daily.jpg", width: 600, height: 1241, alt: "데일리Pick 질문 화면" }],
  },
  {
    title: "성향은, 언제든지 변해 가는 것!",
    body: ["선택 데이터에 따라 변화하는", "요즘 나의 성향을 공유해 보세요"],
    images: [
      { src: "/images/screen-animacode.jpg", width: 750, height: 990, alt: "나의 애니마코드와 성향 변화 화면" },
      { src: "/images/screen-share.jpg", width: 684, height: 445, alt: "요즘 나의 성향 공유하기 화면" },
    ],
  },
  {
    title: "지금 가장 뜨거운 LivePick +🔥",
    body: ["다른 사람들은 어떻게 생각할까?", "내 생각은 트렌드파 OR 반대파?"],
    images: [{ src: "/images/screen-livepick.jpg", width: 600, height: 1184, alt: "LivePick 투표 결과 화면" }],
  },
  {
    title: "질문을 만들어 반응을 이끌어 보세요",
    body: ["주간 Top Pick에 도전하고", "더 큰 보상을 획득하세요"],
    extra: "(주간 TopPick 5,000P 지급💵)",
    images: [{ src: "/images/screen-question.jpg", width: 600, height: 1174, alt: "질문 만들기 화면" }],
  },
  {
    title: "참여할수록 쌓여가는 포인트는 덤+",
    body: ["포인트 Shop에서 원하는 상품으로 교환"],
    images: [{ src: "/images/screen-shop.jpg", width: 600, height: 1238, alt: "포인트 샵 상품 교환 화면" }],
    trust: true,
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">
            나를 탐구하는 <span className="blue">Pick!</span>
          </h1>
          <p className="hero__sub">
            <span className="blue">선택으로 성향을</span> 발견하고
            <br />
            세상과 연결되는 플레이
          </p>
          <div className="hero__visual">
            <Image
              src="/images/hero.png"
              alt="픽플레이 앱 화면을 들고 웃는 사람과 포인트 코인"
              width={1080}
              height={1080}
              preload
            />
          </div>
          <p className="hero__quote">
            <strong>&quot; 선택만으로 진짜 나의 본능을 깨우다 &quot;</strong>
            <br />
            나의 내면 캐릭터를 깨우고
            <br />
            포인트까지 챙기는 새로운 루틴.
          </p>
          <div className="hero__start">
            <p className="hero__note">로그인 없이 간편하게 시작해요</p>
            <StoreButtons />
          </div>
        </div>
      </section>

      <section className="anima" aria-labelledby="anima-title">
        <h2 id="anima-title" className="anima__bar">
          AC 18-144&apos;s&nbsp; Animacode
        </h2>
        <div className="anima__inner">
          <div className="anima__video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
              title="픽플레이 애니마코드 소개 영상"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="anima__copy">
            <p className="anima__lead">
              애니마코드는 내 선택 데이터로
              <br />
              완성되는 <strong className="blue-bright">나의 동물적 성향!</strong>
              <br />
              고정된 결과가 아니라, 선택할수록 달라지는
              <br />
              요즘의 나를 보여주는 살아있는 취향코드
            </p>
            <Image
              className="anima__intro"
              src="/images/animacode-intro.png"
              alt="제 ANIMA CODE는 예민한 감각과 조용한 판단력의 사슴입니다만, 당신의 ANIMA CODE는요?"
              width={900}
              height={500}
            />
            <p className="anima__make">
              나만의 <span className="blue-deep">애니마 코드</span> 만들기!
            </p>
            <StoreButtons />
          </div>
        </div>
      </section>

      <div className="features">
        {FEATURES.map((feature) => (
          <section key={feature.title} className="feature">
            <div className="feature__copy">
              <h2 className="feature__title">{feature.title}</h2>
              <p className="feature__body">
                {feature.body.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
              {feature.extra && <p className="feature__extra">{feature.extra}</p>}
              {feature.trust && (
                <p className="feature__trust">
                  픽플레이는 <Link href="/trust">신뢰운영원칙</Link>을 준수합니다
                </p>
              )}
            </div>
            <div className={`feature__screen${feature.images.length > 1 ? " feature__screen--card" : ""}`}>
              {feature.images.map((image) => (
                <Image key={image.src} {...image} alt={image.alt} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="cta">
        <p className="cta__text">
          선택이 가치로 바뀌는 즐거운 플레이
          <br />
          <strong>지금 PickPlay를 시작해 보세요</strong>
        </p>
        <StoreButtons variant="cta" />
      </section>
    </>
  );
}
