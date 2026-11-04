import Image from "next/image";

export default function BusinessAI() {
  return (
    <section className="bizai">
      <div className="container">
        <p className="bizai__eyebrow">쓸수록 똑똑해지는 바다야</p>
        <h2 className="bizai__title">
          신청할때 나눈 대화도
          <br />
          평소 바다야의 질문에 대답한 짧은 기록도
          <br />
          모두 <em>내 사업의 데이터</em>로 쌓여요.
        </h2>

        <div className="bizai__visual">
          <Image
            src="/images/bizai-bear.png"
            alt="더 똑똑해지는 바다야 캐릭터"
            width={819}
            height={1024}
          />
        </div>

        <p className="bizai__quote">
          바다야와 자주 대화할수록,
          <br />
          <em>받을 확률도 높아지고 신청도 더 간단해집니다.</em>
        </p>
      </div>
    </section>
  );
}
