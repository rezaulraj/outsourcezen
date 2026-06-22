import React from "react";
import HeroHealthcare from "./HeroHealthcare";
import WhatHealthcareRecruitment from "./WhatHealthcareRecruitment";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import HealthcareRoles from "./HealthcareRoles";
import HealthcareChallenges from "./HealthcareChallenges";
import HealthcareRecruitmentProcess from "./HealthcareRecruitmentProcess";
import HealthcareWhyChooseUs from "./HealthcareWhyChooseUs";
import HealthcareWorkforceStatistics from "./HealthcareWorkforceStatistics";
import PathAnimation from "../../home/PathAnimation";
import HealthcareSuccessStories from "./HealthcareSuccessStories";
const Healthcare = () => {
  return (
    <div>
      <HeroHealthcare />
      <WhatHealthcareRecruitment />
      {/* <BothPathAnimation /> */}
      <HealthcareRoles />
      <BothPathAnimation />
      <HealthcareChallenges />
      <HealthcareRecruitmentProcess />
      <BothPathAnimation />
      <HealthcareWhyChooseUs />
      {/* <PathAnimation /> */}
      <HealthcareWorkforceStatistics />
      <HealthcareSuccessStories />
    </div>
  );
};

export default Healthcare;
