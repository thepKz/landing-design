import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/HeroSlider";
import Navbar from "@/components/layout/Navbar";
import LandingSections from "@/components/sections/LandingSections";

export default function Home() {
  return (
    <div className="bg-ivory min-h-[100dvh]">
      <Navbar />
      <HeroSlider />
      <LandingSections />
      <Footer />
    </div>
  );
}
