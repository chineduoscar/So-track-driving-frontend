import AboutHero from "../../components/about/AboutHero";
import CoreValues from "../../components/about/CoreValues";
import MissionVision from "../../components/about/MissionVision";
import AboutCTA from "../../components/about/AboutCTA";
import Team from "../../components/about/Team";
import AboutIntro from "../../components/about/AboutIntro";
import Leadership from "@/app/components/about/Leadership";

const page = () => {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <CoreValues />
      <MissionVision />
      <Leadership />
      <Team />
      <AboutCTA />
    </>
  );
};

export default page;
