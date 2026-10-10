import FlowSection from "@/components/FlowSection";
import HeroSection from "@/components/HeroSection";
import Logo from "@/components/Logo";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ServicesSection from "@/components/ServicesSection";
import TrustCtaSection from "@/components/TrustCtaSection";

export default function Home() {
  return (
    <>
      <header className="hero">
        <nav className="container nav">
          <Logo />
          <div className="nav-links">
            <a href="#how">서비스 소개</a>
            <a href="#services">신고 준비</a>
            <a href="#difference">차별점</a>
            <a href="#why">고민 해결</a>
          </div>
          <a href="#top" className="mini-cta">
            무료로 시작하기
          </a>
        </nav>
        <HeroSection />
      </header>
      <main>
        <ProblemSolutionSection />
        <FlowSection />
        <ServicesSection />
        <TrustCtaSection />
      </main>
    </>
  );
}
