import ChatTitle from "@/components/ChatTitle";
import Image from "next/image";

export default function BusinessAI() {
  return (
    <section className="bizai">
      <div className="container">
        <p className="bizai__eyebrow">쓸수록 똑똑해지는 바다야</p>
        <ChatTitle className="bizai__title">
          신청할때 나눈 대화도
          <br />
          평소 바다야의 질문에 대답한 짧은 기록도
          <br />
          <em>내 사업의 데이터</em>로 쌓여요.
        </ChatTitle>

        <div className="bizai__visual" aria-hidden="false">
          <div className="bizai__stage">
            <span className="bizai__glow" />
            <span className="bizai__ring bizai__ring--a" />
            <span className="bizai__ring bizai__ring--b" />
            <span className="bizai__ring bizai__ring--c" />
            <span className="bizai__orbit">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="bizai__bits" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <Image
              className="bizai__bear"
              src="/images/bizai-bear.png"
              alt="더 똑똑해지는 바다야 캐릭터"
              width={2000}
              height={2000}
              sizes="(max-width: 768px) 40vw, 240px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
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
