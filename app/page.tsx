import { FadeIn } from "@/components/ui/amination";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import JustCards from "@/components/ui/justcard";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
          <FadeIn delay={0.2}>
            <HeroSection />
          </FadeIn>
          <FadeIn delay={0.6}>
            <JustCards />
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
