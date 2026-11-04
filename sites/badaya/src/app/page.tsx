import FloatingCta from "@/components/FloatingCta";
import ScrollReveal from "@/components/ScrollReveal";
import BusinessAI from "@/components/sections/BusinessAI";
import Compare from "@/components/sections/Compare";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import LaunchEvent from "@/components/sections/LaunchEvent";
import PainPoints from "@/components/sections/PainPoints";
import Partners from "@/components/sections/Partners";
import Solution from "@/components/sections/Solution";
import StoreReviews from "@/components/sections/StoreReviews";
import Story from "@/components/sections/Story";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Features />
        <Story />
        <Compare />
        <BusinessAI />
        <Testimonials />
        <StoreReviews />
        <LaunchEvent />
        <Partners />
      </main>
      <Footer />
      <FloatingCta />
      <ScrollReveal />
    </>
  );
}
