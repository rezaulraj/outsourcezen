import React from "react";
import HeroCandidateScreening from "./HeroCandidateScreening";
import WhatCandidateScreening from "./WhatCandidateScreening";
import ScreeningChallenges from "./ScreeningChallenges";
import PathAnimation from "../home/PathAnimation";
import ScreeningProcess from "./ScreeningProcess";
import WeCheck from "./WeCheck";
import Industrys from "../../components/common/Industrys";
import WhyChooseScreening from "./WhyChooseScreening";
import Countrys from "../workforce-sourceing/Countrys";
import Resources from "../../components/common/Resources";

const CandidateScreening = () => {
  return (
    <div>
      <HeroCandidateScreening />
      <PathAnimation />
      <WhatCandidateScreening />
      <ScreeningChallenges />
      <ScreeningProcess />
      <WeCheck />
      <Industrys />
      <WhyChooseScreening />
      <Countrys />
      <Resources />
    </div>
  );
};

export default CandidateScreening;
