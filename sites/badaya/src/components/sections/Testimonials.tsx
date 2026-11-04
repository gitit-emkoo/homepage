import Image from "next/image";
import { Fragment } from "react";

const TESTIMONIALS = [
  {
    body: [
      "처음에 컨설팅 업체인줄 알았습니다 막상해보니",
      "혼자 신청할 수 있게 도와주는 앱이더라구요\u00a0",
      "습관처럼 받을수있는게 뭐있나~\u00a0 찾아보게돼요",
    ],
    name: "김** 님",
    business: "뷰티 매장운영",
    avatar: { src: "/images/small-business-2.png", width: 1000, height: 1000 },
  },
  {
    body: ["자영업 5년차인데 생각 했던 것보다 신청 가능한 공고가 꽤 많아서 놀랐습니다.\u00a0 알게 된것 만으로도 만족합니다."],
    name: "정** 님",
    business: "음식점 운영",
    avatar: { src: "/images/small-business-1.png", width: 1000, height: 1000 },
  },
  {
    body: [
      "신청서에 사업관련 내용을 작성하는 파트가 자동으로 작성되느게\u00a0 진짜 편하고 부담이 확줄어듬 앱 다운받고 ai인터뷰 답할게 많아서 좀 짜증났는데 신청서 써 준거보고 만족했음",
    ],
    name: "남** 님",
    business: "스타트업 대표님",
    avatar: { src: "/images/small-business-3.png", width: 1000, height: 1000 },
  },
  {
    body: [
      "온라인 쇼핑몰 운영 중인데 지원금은 나와 상관없다고 생각했어요",
      "바다야로 조건 맞는 공고를 찾고 신청 서류까지 준비하니",
      "혼자 하기엔 막막했던 부분이 훨씬 수월해졌습니다",
    ],
    name: "이** 님",
    business: "쇼핑몰 운영",
    avatar: { src: "/images/small-business-4.png", width: 1000, height: 1000 },
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonials__title reveal" data-anim="fade-in-down">
          <em>3,000명이 넘는 대표님들이 이미</em>
          <br />
          바다야를 경험하고 있습니다.
        </h2>
        <ul className="testimonials__list">
          {TESTIMONIALS.map((item) => (
            <li key={`${item.name}-${item.business}`} className="testimonial">
              <p className="testimonial__body">
                {item.body.map((line, i) => (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
              <p className="testimonial__author">
                {item.name}
                <br />
                {item.business}
              </p>
              <Image className="testimonial__avatar" alt="" {...item.avatar} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
