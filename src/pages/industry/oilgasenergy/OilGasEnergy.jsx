import React from "react";
import HeroOilGasEnergy from "./HeroOilGasEnergy";
import WhatIsOilGasEnergyRecruitment from "./WhatIsOilGasEnergyRecruitment";
import RolesWeRecruit from "./RolesWeRecruit";
import EnergyChallengesWeSolve from "./EnergyChallengesWeSolve";
import PartnerMarque from "../../../components/common/PartnerMarque";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import OurRecruitmentProcess from "./OurRecruitmentProcess";
import WhyEmployersChooseUs from "./WhyEmployersChooseUs";
import PathAnimation from "../../home/PathAnimation";
import EnergyWorkforceStatistics from "./EnergyWorkforceStatistics";
import SuccessStories from "./SuccessStories";

const OilGasEnergy = () => {
  return (
    <div>
      <HeroOilGasEnergy />
      <PartnerMarque />
      <WhatIsOilGasEnergyRecruitment />
      <BothPathAnimation />
      <RolesWeRecruit />
      <PathAnimation />
      <EnergyChallengesWeSolve />
      <OurRecruitmentProcess />
      <WhyEmployersChooseUs />
      <EnergyWorkforceStatistics />
      <SuccessStories />
    </div>
  );
};

export default OilGasEnergy;
