import HeroSection from '@/components/sections/HeroSection/HeroSection';
import TrustBar from '@/components/sections/TrustBar/TrustBar';
import ServiceCategories from '@/components/sections/ServiceCategories/ServiceCategories';
import HowItWorks from '@/components/sections/HowItWorks/HowItWorks';
import CoverageArea from '@/components/sections/CoverageArea/CoverageArea';
import Testimonials from '@/components/sections/Testimonials/Testimonials';
import SustainabilityStats from '@/components/sections/SustainabilityStats/SustainabilityStats';
import FinalCTA from '@/components/sections/FinalCTA/FinalCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServiceCategories />
      <HowItWorks />
      <CoverageArea />
      <Testimonials />
      <SustainabilityStats />
      <FinalCTA />
    </>
  );
}
