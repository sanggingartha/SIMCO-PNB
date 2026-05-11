import DailyDataPage from "@/components/ui/daily-data";
import Footer from "@/components/ui/footer";

import Navbar from "@/components/ui/navbar";

export default function DailyData() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1">
        <div className="w-full px-4 md:px-6 lg:px-10">
          <DailyDataPage />
        </div>
      </main>

      <Footer />
    </div>
  );
}
