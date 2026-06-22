import React from "react";
import HeroHealthcare from "./HeroHealthcare";
import WhatHealthcareRecruitment from "./WhatHealthcareRecruitment";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import HealthcareRoles from "./HealthcareRoles";
import HealthcareChallenges from "./HealthcareChallenges";
import HealthcareRecruitmentProcess from "./HealthcareRecruitmentProcess";
import HealthcareWhyChooseUs from "./HealthcareWhyChooseUs";

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
    </div>
  );
};

export default Healthcare;
