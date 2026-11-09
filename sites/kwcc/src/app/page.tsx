import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";

export default function HomePage() {
  return (
    <div className="page">
      <Hero />
      <main>
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
