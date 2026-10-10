import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Enough from "@/components/sections/Enough";
import FeatureCloud from "@/components/sections/FeatureCloud";
import FounderNote from "@/components/sections/FounderNote";
import FreeTrial from "@/components/sections/FreeTrial";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Points from "@/components/sections/Points";
import Pricing from "@/components/sections/Pricing";
import Promo from "@/components/sections/Promo";
import Steps from "@/components/sections/Steps";
import Trust from "@/components/sections/Trust";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Promo />
        <Trust />
        <Steps />
        <Points />
        <FeatureCloud />
        <Enough />
        <Pricing />
        <FreeTrial />
        <Industries />
        <FounderNote />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
