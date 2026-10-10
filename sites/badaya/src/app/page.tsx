import ScrollReveal from "@/components/ScrollReveal";
import CmtTechnology from "@/components/sections/CmtTechnology";
import Compare from "@/components/sections/Compare";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import LaunchEvent from "@/components/sections/LaunchEvent";
import PainPoints from "@/components/sections/PainPoints";
import Partners from "@/components/sections/Partners";
import Plan from "@/components/sections/Plan";
import Story from "@/components/sections/Story";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <CmtTechnology />
        <Story />
        <Compare />
        <Plan />
        <Testimonials />
        <LaunchEvent />
        <Partners />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
