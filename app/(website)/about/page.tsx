import AboutHero from "../../components/about/AboutHero";
import CoreValues from "../../components/about/CoreValues";
import MissionVision from "../../components/about/MissionVision";
import AboutCTA from "../../components/about/AboutCTA";
import Team from "../../components/about/Team";
import AboutIntro from "../../components/about/AboutIntro";
import Chairman from "../../components/about/Chairman";
import CEO from "../../components/about/CEO";

const page = () => {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <Chairman />
      <CoreValues />
      <CEO />
      <MissionVision />
      <Team />
      <AboutCTA />
    </>
  );
};

export default page;
