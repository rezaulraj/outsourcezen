import React from "react";
import HeroSecurityServices from "./HeroSecurityServices";
import PartnerMarque from "../../../components/common/PartnerMarque";
import WhatIsSecurityServicesRecruitment from "./WhatIsSecurityServicesRecruitment";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import RolesWeRecruit from "./RolesWeRecruit";
import SecurityChallengesWeSolve from "./SecurityChallengesWeSolve";
import PathAnimation from "../../home/PathAnimation";
import OurRecruitmentProcess from "./OurRecruitmentProcess";
import WhyEmployersChooseUs from "./WhyEmployersChooseUs";
import SecurityWorkforceStatistics from "./SecurityWorkforceStatistics";
import SuccessStories from "./SuccessStories";

const SecurityServices = () => {
  return (
    <div>
      <HeroSecurityServices />
      <PartnerMarque />
      <WhatIsSecurityServicesRecruitment />
      <BothPathAnimation />
      <RolesWeRecruit />
      <SecurityChallengesWeSolve />
      <PathAnimation />
      <OurRecruitmentProcess />
      <WhyEmployersChooseUs />
      <BothPathAnimation />
      <SecurityWorkforceStatistics />
      <SuccessStories/>
    </div>
  );
};

export default SecurityServices;
