import React from "react";
import HeroConstruction from "./HeroConstruction";
import WhatConstructionRecruitment from "./WhatConstructionRecruitment";
import RolesWeRecruit from "./RolesWeRecruit";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import ConstructionChallenges from "./ConstructionChallenges";
import ConstructionRecruitmentProcess from "./ConstructionRecruitmentProcess";
import PathAnimation from "../../home/PathAnimation";
import ConstructionWhyChooseUs from "./ConstructionWhyChooseUs";
import ConstructionStatistics from "./ConstructionStatistics";
import SourceFrom from "../../workforce-sourceing/SourceFrom";
import ConstructionProjects from "./ConstructionProjects";
import SuccessStories from "./SuccessStories";

const Construction = () => {
  return (
    <div>
      <HeroConstruction />
      <WhatConstructionRecruitment />
      <RolesWeRecruit />
      <BothPathAnimation />
      <ConstructionChallenges />
      <PathAnimation />
      <ConstructionRecruitmentProcess />
      <ConstructionWhyChooseUs />
      <ConstructionStatistics />
      <BothPathAnimation />
      <SourceFrom />
      {/* <ConstructionProjects /> */}
      <SuccessStories />
    </div>
  );
};

export default Construction;
