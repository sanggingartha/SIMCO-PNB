import Footer from "@/components/ui/footer";
import HeroSection from "@/components/ui/hero-section";
import JustCards from "@/components/ui/justcard";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E4E0CF]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
          <HeroSection />
          <JustCards />
        </div>
      </main>

      <Footer />
    </div>
  );
}
