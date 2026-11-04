import ChatTitle from "@/components/ChatTitle";
import Image from "next/image";

export default function Compare() {
  return (
    <section className="compare">
      <div className="container">
        <ChatTitle>
          <em>커피 값마저 아껴드릴게요</em>
          <br />
          첫 신청은 무료입니다
        </ChatTitle>
        <Image
          className="compare__image"
          src="/images/comparison.png"
          alt="웹 검색과 바다야 비교: 자동 매칭, 자동 체크리스트와 AI 초안, 스스로 반복 지원"
          width={1200}
          height={800}
        />
        <p className="compare__text">
          공짜니까, 일단 무조건 써보세요
          <br />
          버리면 손해잖아요
        </p>
      </div>
    </section>
  );
}
