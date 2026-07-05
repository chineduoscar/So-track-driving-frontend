import Hero from "./components/home/Hero";
import Reviews from "./components/home/Reviews";
import About from "./components/home/About";
import FindZone from "./components/home/FindZone";
import TrainingVehicles from "./components/home/TrainingVehicles";
import Services from "./components/home/Services";
import HowItWorks from "./components/home/HowItWorks";
import FAQ from "./components/home/FAQ";
import CTA from "./components/home/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <FindZone />
      <TrainingVehicles />
      <About />
      <Services />
      <Reviews />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
}
