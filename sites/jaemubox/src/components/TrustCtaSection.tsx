import Logo from "./Logo";
import StoreButtons from "./StoreButtons";

const fit = ["이제 막 설립했어요", "직원 1~5명 이하예요", "거래가 아직 많지 않아요", "세무사 비용이 부담돼요"];
const TrustCtaSection = () => (
  <>
    <section className="section fit">
      <div className="container fit-layout">
        <div>
          <p className="kicker">WHO IT’S FOR</p>
          <h2>재무박스가 필요한 곳?</h2>
        </div>
        <div className="fit-list">
          {fit.map((x) => (
            <p key={x}>
              <span>✓</span>
              {x}
            </p>
          ))}
        </div>
      </div>
    </section>
    <section className="advisor">
      <div className="container">
        <p className="kicker">GROW WITH CONFIDENCE</p>
        <h2>초기에는 직접, 성장하면 전문가와 함께</h2>
        <div className="advisor-savings">
          <strong>연간 평균 180만 원</strong>
          <span>2년이면 약 360만 원</span>
        </div>
        <p className="savings-emphasis">절감하세요</p>
        <div className="growth-flow">
          <b>초기 법인</b>
          <i>→</i>
          <b className="growth-active">재무박스</b>
          <i>→</i>
          <b>사업 성장</b>
          <i>→</i>
          <b>세무사</b>
        </div>
      </div>
    </section>
    <section className="final-cta">
      <div className="cta-orb orb-a" />
      <div className="cta-orb orb-b" />
      <div className="container">
        <p className="kicker">START TODAY</p>
        <h2>
          사업은 대표님이 키우세요.
          <br />
          세무는 재무박스가 함께 준비하겠습니다.
        </h2>
        <p>
          거래를 쌓으면 신고가 준비됩니다.
          <br />
          신고를 끝내면 결산까지 이어집니다.
        </p>
        <StoreButtons light={true} />
      </div>
    </section>
    <footer>
      <div className="container footer-inner">
        <Logo />
        <p>소형법인을 위한 셀프 세무 관리 서비스</p>
        <div>
          <a href="#how">서비스 소개</a>
          <a href="#services">신고 준비</a>
          <a href="#difference">재무박스 방식</a>
        </div>
        <small>© 2025 재무박스. All rights reserved.</small>
      </div>
    </footer>
  </>
);
export default TrustCtaSection;