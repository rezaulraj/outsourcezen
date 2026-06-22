import React from "react";
import HeroAgricultureFarming from "./HeroAgricultureFarming";
import WhatAgricultureFarmingRecruitment from "./WhatAgricultureFarmingRecruitment";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import AgricultureRoles from "./AgricultureRoles";
import PathAnimation from "../../home/PathAnimation";
import AgricultureChallenges from "./AgricultureChallenges";

const AgricultureFarming = () => {
  return (
    <div>
      <HeroAgricultureFarming />
      <BothPathAnimation />
      <WhatAgricultureFarmingRecruitment />
      <AgricultureRoles />
      <PathAnimation />
      <AgricultureChallenges />
    </div>
  );
};

export default AgricultureFarming;
