import React from "react";
import HeroAbout from "./HeroAbout";
import WhoWeAre from "./WhoWeAre";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import MissionVision from "./MissionVision";
import WhatWeDo from "./WhatWeDo";
import Industrys from "../../../components/common/Industrys";
import SourceFrom from "../../workforce-sourceing/SourceFrom";
import OurGlobalPresence from "./OurGlobalPresence";
import WhyCompaniesTrustUs from "./WhyCompaniesTrustUs";
import PathAnimation from "../../home/PathAnimation";
import OurValues from "./OurValues";
import LeaderShipTeam from "../../ouragent/LeaderShipTeam";
import CompanyStatsCTA from "./CompanyStatsCTA";

const About = () => {
  return (
    <div>
      <HeroAbout />
      <WhoWeAre />
      <BothPathAnimation />
      <MissionVision />
      <PathAnimation />
      <WhatWeDo />
      <Industrys />
      <OurGlobalPresence />
      <SourceFrom />
      <WhyCompaniesTrustUs />
      <BothPathAnimation />
      <OurValues />
      <LeaderShipTeam />
      <CompanyStatsCTA />
    </div>
  );
};

export default About;
