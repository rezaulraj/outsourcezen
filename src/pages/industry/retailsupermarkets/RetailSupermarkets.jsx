import React from "react";
import HeroRetailSupermarkets from "./HeroRetailSupermarkets";
import WhatIsRetailSupermarketRecruitment from "./WhatIsRetailSupermarketRecruitment";
import PartnerMarque from "../../../components/common/PartnerMarque";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import RolesWeRecruit from "./RolesWeRecruit";
import RetailChallengesWeSolve from "./RetailChallengesWeSolve";
import PathAnimation from "../../home/PathAnimation";
import OurRecruitmentProcess from "./OurRecruitmentProcess";
import WhyEmployersChooseUs from "./WhyEmployersChooseUs";
import RetailWorkforceStatistics from "./RetailWorkforceStatistics";
import SuccessStories from "./SuccessStories";

const RetailSupermarkets = () => {
  return (
    <div>
      <HeroRetailSupermarkets />
      <PartnerMarque />
      <WhatIsRetailSupermarketRecruitment />
      <BothPathAnimation />
      <RolesWeRecruit />
      <RetailChallengesWeSolve />
      <PathAnimation />
      <OurRecruitmentProcess />
      <WhyEmployersChooseUs />
      <BothPathAnimation />
      <RetailWorkforceStatistics />
      <SuccessStories />
    </div>
  );
};

export default RetailSupermarkets;
