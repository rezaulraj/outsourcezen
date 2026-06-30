import React from "react";
import HeroShipbuildingMarine from "./HeroShipbuildingMarine";
import PartnerMarque from "../../../components/common/PartnerMarque";
import WhatIsShipbuildingMarineRecruitment from "./WhatIsShipbuildingMarineRecruitment";
import RolesWeRecruit from "./RolesWeRecruit";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import MarineChallengesWeSolve from "./MarineChallengesWeSolve";
import OurRecruitmentProcess from "./OurRecruitmentProcess";
import PathAnimation from "../../home/PathAnimation";
import WhyEmployersChooseUs from "./WhyEmployersChooseUs";
import MarineWorkforceStatistics from "./MarineWorkforceStatistics";
import SuccessStories from "./SuccessStories";

const ShipbuildingMarine = () => {
  return (
    <div>
      <HeroShipbuildingMarine />
      <PartnerMarque />
      <WhatIsShipbuildingMarineRecruitment />
      <RolesWeRecruit />
      <BothPathAnimation />
      <MarineChallengesWeSolve />
      <OurRecruitmentProcess />
      <PathAnimation />
      <WhyEmployersChooseUs />
      <MarineWorkforceStatistics />
      <SuccessStories />
    </div>
  );
};

export default ShipbuildingMarine;
