import BenefitsSection from "@/components/BenefitsSection";
import BrandLogo from "@/components/BrandLogo";
import GuideSection from "@/components/GuideSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
        {" 선착순 30곳 한정 평생 혜택지급 "}
        <a href="#apply">문의 바로가기 →</a>
      </div>
      <Header />
      <main>
        <HeroSection />
        <div className="authority">
          <b>임차인의 초기 부담을 낮추고, 임대인의 공실 위험을 줄입니다.</b>
        </div>
        <BenefitsSection />
        <WorkflowSection />
        <GuideSection />
        <SimulationSection />
        <RentCalculationSection />
        <PartnerSection />
      </main>
      <footer>
        <div className="brand">
          <BrandLogo />
          <span>월세스위치</span>
        </div>
        <p />
        <div className="footer-links">
          <a href="#workflow">플랫폼 소개</a>
          <a href="#benefits">중개사 혜택</a>
          <a href="#apply">파트너 신청</a>
        </div>
        <small>© 2026 월세 스위치. All rights reserved.</small>
      </footer>
    </div>
  );
}
