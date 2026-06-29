import React from "react";
import HeroFoodProcessing from "./HeroFoodProcessing";
import PartnerMarque from "../../../components/common/PartnerMarque";
import WhatIsFoodProcessingRecruitment from "./WhatIsFoodProcessingRecruitment";
import RolesWeRecruit from "./RolesWeRecruit";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import FoodProcessingChallengesWeSolve from "./FoodProcessingChallengesWeSolve";
import OurRecruitmentProcess from "./OurRecruitmentProcess";
import WhyEmployersChooseUs from "./WhyEmployersChooseUs";
import FoodWorkforceStatistics from "./FoodWorkforceStatistics";
import SuccessStories from "./SuccessStories";

const FoodProcessing = () => {
  return (
    <div>
      <HeroFoodProcessing />
      <PartnerMarque />
      <WhatIsFoodProcessingRecruitment />
      <RolesWeRecruit />
      <BothPathAnimation />
      <FoodProcessingChallengesWeSolve />
      <OurRecruitmentProcess />
      <WhyEmployersChooseUs />
      <FoodWorkforceStatistics />
      <SuccessStories />
    </div>
  );
};

export default FoodProcessing;
