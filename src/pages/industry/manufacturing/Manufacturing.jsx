import React from "react";
import HeroManufacturing from "./HeroManufacturing";
import WhatManufacturingRecruitment from "./WhatManufacturingRecruitment";
import ManufacturingRoles from "./ManufacturingRoles";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import ManufacturingChallenges from "./ManufacturingChallenges";
import ManufacturingRecruitmentProcess from "./ManufacturingRecruitmentProcess";
import ManufacturingWhyChooseUs from "./ManufacturingWhyChooseUs";
import ManufacturingWorkforceStatistics from "./ManufacturingWorkforceStatistics";
import ManufacturingSuccessStories from "./ManufacturingSuccessStories";
import SourceFrom from "../../workforce-sourceing/SourceFrom";

const Manufacturing = () => {
  return (
    <div>
      <HeroManufacturing />
      <WhatManufacturingRecruitment />
      <BothPathAnimation />
      <ManufacturingRoles />
      <ManufacturingChallenges />
      <ManufacturingRecruitmentProcess />
      <ManufacturingWhyChooseUs />
      <ManufacturingWorkforceStatistics />
      <SourceFrom />
      <ManufacturingSuccessStories />
    </div>
  );
};

export default Manufacturing;
