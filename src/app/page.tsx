import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import KeyNumbers from "@/components/KeyNumbers";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <KeyNumbers />
        <Tokenomics />
        <Roadmap />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
