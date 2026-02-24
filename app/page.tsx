import Hero from "@/components/Hero";
import TokenSection from "@/components/TokenSection";
import Community from "@/components/Community";
import FinalStatement from "@/components/FinalStatement";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";
import LiveTokenStats from "@/components/LiveTokenStats";
import TokenomicsSection from "@/components/TokenomicsSection";
import DexEmbed from "@/components/DexEmbed";
import ShareViralButtons from "@/components/ShareViralButtons";
import Disclaimer from "@/components/Disclaimer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <StorySection />
      <LiveTokenStats />
      <TokenomicsSection />
      <TokenSection />
      <DexEmbed />
      <ShareViralButtons />
      <Community />
      <FinalStatement />
      <Disclaimer />
      <Footer />
    </main>
  );
}
