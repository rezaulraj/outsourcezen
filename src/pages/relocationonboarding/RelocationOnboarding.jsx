import React from "react";
import HeroRelocationOnboarding from "./HeroRelocationOnboarding";
import WhatRelocationOnboarding from "./WhatRelocationOnboarding";
import RelocationChallenges from "./RelocationChallenges";
import BothPathAnimation from "../../components/common/BothPathAnimation";
import RelocationProcess from "./RelocationProcess";
import PathAnimation from "../home/PathAnimation";
import OnboardingSupport from "./OnboardingSupport";
import RelocationBenefitsForEmployers from "./RelocationBenefitsForEmployers";
import WorkerArrivalChecklist from "./WorkerArrivalChecklist";
import Cliend from "../home/Cliend";
import RelocationFAQ from "./RelocationFAQ";
import PartnerMarque from "../../components/common/PartnerMarque";

const RelocationOnboarding = () => {
  return (
    <div>
      <HeroRelocationOnboarding />
      <PartnerMarque />
      <WhatRelocationOnboarding />
      <BothPathAnimation />
      <RelocationChallenges />
      <PathAnimation />
      <RelocationProcess />
      <OnboardingSupport />
      <RelocationBenefitsForEmployers />
      <WorkerArrivalChecklist />
      <Cliend />
      <RelocationFAQ />
    </div>
  );
};

export default RelocationOnboarding;
