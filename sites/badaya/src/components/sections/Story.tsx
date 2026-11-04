import ChatTitle from "@/components/ChatTitle";
import Image from "next/image";

const CONSULT_POINTS = [
  {
    label: "대면 부담이 없어요",
    body: "원하는 시간 언제든 앱만 켜세요",
  },
  {
    label: "비용 부담이 없어요",
    body: "커피 정도면 충분해요",
  },
  {
    label: "사업 이해도가 높아요",
    body: "내 사업을 나보다 더 잘 알고 깊게 이해해요",
  },
];

export default function Story() {
  return (
    <section className="consult">
      <div className="container">
        <ChatTitle>
          비용은 <em>1%</em>, 전문성은 <em>101%</em>
        </ChatTitle>
        <p className="consult__lead">
          컨설팅은 대면과 높은 비용이 부담되고
          <br />
          일회성으로 사업이해는 떨어집니다.
        </p>

        <div className="consult__scene" aria-label="부담스러운 컨설팅과 바다야의 편한 대화 비교">
          <div className="consult__plate consult__plate--old">
            <Image
              className="consult__art consult__art--old"
              src="/images/consulting-cutout.png"
              alt="복잡한 서류와 컨설팅에 헷갈려하는 사장님"
              width={1738}
              height={1105}
              sizes="(max-width: 768px) 45vw, 280px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="consult__plate consult__plate--new">
            <Image
              className="consult__art consult__art--new"
              src="/images/consulting-badaya.png"
              alt="바다야가 사장님에게 속삭이며 도와주는 모습"
              width={318}
              height={357}
              sizes="(max-width: 768px) 65vw, 400px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        <ChatTitle as="p" className="consult__ask">
          바다야는 어떨까요?
        </ChatTitle>

        <ul className="consult__points">
          {CONSULT_POINTS.map((point) => (
            <li key={point.label} className="consult__point">
              <strong>{point.label}</strong>
              <span>{point.body}</span>
            </li>
          ))}
        </ul>

        <ChatTitle as="p" className="consult__close">
          이보다 편한 방법은 아직 없어요.
          <br />
          <em>커피 값으로, 모든 혜택을 챙기세요.</em>
        </ChatTitle>
      </div>
    </section>
  );
}
