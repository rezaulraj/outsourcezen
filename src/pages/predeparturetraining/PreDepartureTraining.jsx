import React from "react";
import HeroPreDepartureTraining from "./HeroPreDepartureTraining";
import WhatPreDepartureTraining from "./WhatPreDepartureTraining";
import WhyItMatters from "./WhyItMatters";
import BothPathAnimation from "../../components/common/BothPathAnimation";
import WhatWorkersLearn from "./WhatWorkersLearn";
import TrainingProcess from "./TrainingProcess";
import BenefitsForEmployers from "./BenefitsForEmployers";
import PathAnimation from "../home/PathAnimation";
import Countrys from "../workforce-sourceing/Countrys";
import Resources from "../../components/common/Resources";

const PreDepartureTraining = () => {
  return (
    <div>
      <HeroPreDepartureTraining />
      <WhatPreDepartureTraining />
      <WhyItMatters />
      <BothPathAnimation />
      <WhatWorkersLearn />
      <TrainingProcess />
      <PathAnimation />
      <BenefitsForEmployers />
      <Countrys />
      <Resources />
    </div>
  );
};

export default PreDepartureTraining;
