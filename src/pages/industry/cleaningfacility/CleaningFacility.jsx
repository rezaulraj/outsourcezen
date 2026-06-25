import React from "react";
import HeroCleaningFacility from "./HeroCleaningFacility";
import WhatCleaningFacilityRecruitment from "./WhatCleaningFacilityRecruitment";
import CleaningFacilityRoles from "./CleaningFacilityRoles";
import PartnerMarque from "../../../components/common/PartnerMarque";
import CleaningFacilityChallenges from "./CleaningFacilityChallenges";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import CleaningFacilityWhyChooseUs from "./CleaningFacilityRecruitmentProcess";
import CleaningFacilitySuccessStories from "./CleaningFacilitySuccessStories";

const CleaningFacility = () => {
  return (
    <div>
      <HeroCleaningFacility />
      <PartnerMarque />
      <WhatCleaningFacilityRecruitment />
      <CleaningFacilityRoles />
      <CleaningFacilityChallenges />
      <BothPathAnimation />
      <CleaningFacilityWhyChooseUs />
      <CleaningFacilitySuccessStories />
    </div>
  );
};

export default CleaningFacility;
