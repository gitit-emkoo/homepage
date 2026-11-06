import BenefitsSection from "@/components/BenefitsSection";
import BrandLogo from "@/components/BrandLogo";
import CompareSection from "@/components/CompareSection";
import GuideSection from "@/components/GuideSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OwnersSection from "@/components/OwnersSection";
import PartnerSection from "@/components/PartnerSection";
import RentCalculationSection from "@/components/RentCalculationSection";
import SimulationSection from "@/components/SimulationSection";
import WorkflowSection from "@/components/WorkflowSection";

export default function Home() {
  return (
    <div className="site-shell">
      <div className="notice">
        {"파트너 모집 중 "}
        <span>·</span>
        {" 선착순 30곳 한정 평생 혜택 "}
        <a href="#apply">문의 바로가기 →</a>
      </div>
      <Header />
      <main>
        <HeroSection />
        <div className="authority">
          <b>임차인의 초기 부담을 낮추고, 임대인의 공실 위험을 줄입니다.</b>
        </div>
        <BenefitsSection />
        <CompareSection />
        <WorkflowSection />
        <GuideSection />
        <SimulationSection />
        <RentCalculationSection />
        <OwnersSection />
        <PartnerSection />
      </main>
      <footer>
        <div className="brand">
          <BrandLogo />
          <span>월세스위치</span>
        </div>
        {/* TODO: 사업자 정보 확정 후 placeholder 교체 */}
        <p className="footer-biz">
          상호: [상호] | 대표자: [대표자명] | 사업자등록번호: [000-00-00000]
          <br />
          주소: [주소] | 이메일: [이메일] | 전화: [전화번호]
        </p>
        <div className="footer-links">
          <a href="#benefits">중개사 혜택</a>
          <a href="#compare">렌트프리 비교</a>
          <a href="#simulation">계산 방식</a>
          <a href="#owners">임대인·시행사</a>
          <a href="#apply">파트너 신청</a>
          <a href="/privacy">개인정보처리방침</a>
        </div>
        <small>© 2026 월세 스위치. All rights reserved.</small>
      </footer>
    </div>
  );
}
