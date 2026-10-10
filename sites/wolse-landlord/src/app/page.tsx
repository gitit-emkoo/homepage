import Image from "next/image";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import InterestFormSection from "@/components/InterestFormSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ProcessSection from "@/components/ProcessSection";
import SimulationSection from "@/components/SimulationSection";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="content nav">
          <a className="brand" href="#top" aria-label="월세 스위치 홈">
            <Image src="/images/logo.png" alt="월세 스위치 아이콘" width={1476} height={590} />{" "}
            <span>월세스위치</span>
          </a>
          <nav>
            <a href="#how">방식 소개</a>
            <a href="#simulation">예시 계산</a>
            <a href="#safe">안심 정산</a>
          </nav>
        </div>
      </header>
      <main id="top">
        <HeroSection />
        <div id="how">
          <ProblemSolutionSection />
        </div>
        <div id="simulation">
          <SimulationSection />
        </div>
        <div id="safe">
          <TrustSection />
        </div>
        <ProcessSection />
        <InterestFormSection />
      </main>
      <FooterSection />
    </div>
  );
}
