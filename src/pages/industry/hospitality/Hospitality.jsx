import React from "react";
import HeroHospitality from "./HeroHospitality";
import WhatHospitalityRecruitment from "./WhatHospitalityRecruitment";
import HospitalityRoles from "./HospitalityRoles";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import HospitalityChallenges from "./HospitalityChallenges";
import PathAnimation from "../../home/PathAnimation";
import HospitalityRecruitmentProcess from "./HospitalityRecruitmentProcess";
import HospitalityWhyChooseUs from "./HospitalityWhyChooseUs";

const Hospitality = () => {
  return (
    <div>
      <HeroHospitality />
      <BothPathAnimation />
      <WhatHospitalityRecruitment />
      <HospitalityRoles />
      <PathAnimation />
      <HospitalityChallenges />
      <HospitalityRecruitmentProcess />
      <BothPathAnimation/>
      <HospitalityWhyChooseUs/>
    </div>
  );
};

export default Hospitality;
