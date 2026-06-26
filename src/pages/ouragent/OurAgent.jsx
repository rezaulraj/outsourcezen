import React from "react";
import HeroAgent from "./HeroAgent";
import PartnerMarque from "../../components/common/PartnerMarque";
import WhyOurAgentMatter from "./WhyOurAgentMatter";
import BothPathAnimation from "../../components/common/BothPathAnimation";
import LeadershipTeam from "./LeaderShipTeam";
import RegionalRecruitmentPartners from "./RegionalRecruitmentPartners";
import Industrys from "../../components/common/Industrys";
import PathAnimation from "../home/PathAnimation";
import Process from "./Process";
import AgentCertifications from "./AgentCertifications";

const OurAgent = () => {
  return (
    <div>
      <HeroAgent />
      <PartnerMarque />
      <WhyOurAgentMatter />
      <BothPathAnimation />
      <LeadershipTeam />
      <RegionalRecruitmentPartners />
      <PathAnimation />
      <Industrys />
      <Process />
      <BothPathAnimation />
      <AgentCertifications />
    </div>
  );
};

export default OurAgent;
