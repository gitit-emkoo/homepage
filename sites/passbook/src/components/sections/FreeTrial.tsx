import StoreLink from "@/components/StoreLink";
import { reveal } from "@/lib/anim";

export default function FreeTrial() {
  return (
    <section className="trial">
      <div className="container trial__inner">
        <h2 className="trial__title">패스북을 무료로 경험해 보세요</h2>
        <ul className="trial__list">
          <li className="trial__item">
            <span className="reveal" {...reveal("fade-in-up", 1200, { repeat: 2 })}>
              <strong className="trial__red">이용권 고객 3명 이하</strong>{" "}
              <strong className="trial__blue">평생 무료</strong>
            </span>
          </li>
          <li className="trial__item trial__item--plain">첫사용 ~ 2개월 + 1개월</li>
          <li className="trial__item trial__item--plain">
            <s>월 3,900원</s>
            <strong className="trial__zero reveal" {...reveal("fade-in-up", 1200, { repeat: 2 })}>
              0원
            </strong>
            <strong className="trial__red trial__max">최대90일 무료</strong>
          </li>
        </ul>
        <StoreLink className="btn trial__btn" newTab>
          패스북 사용해 보기
        </StoreLink>
        <p className="trial__note">
          <strong>패스북은 결제 수단을 등록 받지 않아요</strong>
          <br />
          부담없이 편하게 사용 해 보세요
        </p>
      </div>
    </section>
  );
}
