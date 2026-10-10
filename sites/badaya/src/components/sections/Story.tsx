import Image from "next/image";

export default function Story() {
  return (
    <>
      <section className="question">
        <div className="container">
          <p className="question__text">
            혹시 컨설팅 인가요?
            <br />
            수수료? 보험 가입? 해야 하다던데...
          </p>
        </div>
      </section>

      <section className="origin">
        <div className="origin__grid">
          <Image
            className="origin__image"
            src="/images/worried-couple.png"
            alt="노트북 앞에서 고민하는 두 사람"
            width={1536}
            height={1024}
          />
          <div className="origin__text">
            <p className="origin__lead">
              연락처 남기고 부담스러운 전화 상담&nbsp;
              <br />
              수수료, 보험 가입 이런 일 없이
            </p>
            <p className="origin__message">
              누구든 <em className="origin__em">스스로 쉽게 신청할 수 있게</em> 만드는 것
              <br />
              <em className="origin__em">바다야가 탄생한 이유입니다</em>
            </p>
          </div>
        </div>
      </section>

      <section className="unclaimed">
        <div className="container unclaimed__grid">
          <Image
            className="unclaimed__image"
            src="/images/documents.png"
            alt="초기창업패키지 사업계획서 예시"
            width={1200}
            height={800}
          />
          <p className="unclaimed__text">
            나는 해당이 안되겠지? 뭘 귀찮게..
            <br />
            이렇게 놓치는 주인 없는 돈이
            <br />
            매년 약 1,000억 규모
          </p>
        </div>
      </section>

      <section className="loss">
        <div className="container">
          <p className="loss__text">
            주인 없는 돈
            <br />
            가만 있으면 무조건 손해잖아요
          </p>
        </div>
      </section>
    </>
  );
}
