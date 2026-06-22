import React from "react";
import HeroAgricultureFarming from "./HeroAgricultureFarming";
import WhatAgricultureFarmingRecruitment from "./WhatAgricultureFarmingRecruitment";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import AgricultureRoles from "./AgricultureRoles";
import PathAnimation from "../../home/PathAnimation";
import AgricultureChallenges from "./AgricultureChallenges";
import AgricultureRecruitmentProcess from "./AgricultureRecruitmentProcess";
import AgricultureWhyChooseUs from "./AgricultureWhyChooseUs";
import AgricultureWorkforceStatistics from "./AgricultureWorkforceStatistics";
import AgricultureSuccessStories from "./AgricultureSuccessStories";

const AgricultureFarming = () => {
  return (
    <div>
      <HeroAgricultureFarming />
      <BothPathAnimation />
      <WhatAgricultureFarmingRecruitment />
      <AgricultureRoles />
      <PathAnimation />
      <AgricultureChallenges />
      <PathAnimation />
      <AgricultureRecruitmentProcess />
      <AgricultureWhyChooseUs />
      <AgricultureWorkforceStatistics />
      <BothPathAnimation />
      <AgricultureSuccessStories />
    </div>
  );
};

export default AgricultureFarming;
