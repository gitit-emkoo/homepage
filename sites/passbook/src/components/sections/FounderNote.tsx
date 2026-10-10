import Image from "next/image";

export default function FounderNote() {
  return (
    <section className="founder">
      <div className="container founder__inner">
        <div className="founder__profile">
          <Image
            className="founder__photo"
            src="/images/profile-cto.jpeg"
            alt="PassBook CTO 소소"
            width={357}
            height={468}
          />
          <p className="founder__name">
            PassBook Team
            <br />
            CTO 소소 입니다.
          </p>
        </div>
        <p className="founder__text">
          기능이 많아질수록 당연히
          <br />
          비용이 함께 높아질 수밖에 없어요!
          <br />
          <br />
          <strong>Passbook은 다른 선택을 했습니다.</strong>
          <br />
          <strong>필요 없는 기능을 줄이면 사용도 비용도 단순해지고</strong>
          <br />
          소규모 매장에 더욱 친화적이며 꼭 필요한 관리 포인트만
          <br />
          집중할 수 있는 구조를 만들 수 있기 때문입니다.
          <br />
          <br />
          <strong className="founder__accent">
            그렇게 가성비는 더 높아지고
            <br />
            신뢰는 더 분명해지도록 설계했습니다.
          </strong>
        </p>
      </div>
    </section>
  );
}
