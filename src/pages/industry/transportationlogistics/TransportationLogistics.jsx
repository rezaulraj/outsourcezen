import React from "react";
import HeroTransportationLogistics from "./HeroTransportationLogistics";
import WhatTransportationLogisticsRecruitment from "./WhatTransportationLogisticsRecruitment";
import TransportationLogisticsRoles from "./TransportationLogisticsRoles";
import PartnerMarque from "../../../components/common/PartnerMarque";
import LogisticsChallenges from "./LogisticsChallenges";
import BothPathAnimation from "../../../components/common/BothPathAnimation";
import LogisticsRecruitmentProcess from "./LogisticsRecruitmentProcess";
import LogisticsWhyChooseUs from "./LogisticsWhyChooseUs";
import LogisticsWorkforceStatistics from "./LogisticsWorkforceStatistics";
import PathAnimation from "../../home/PathAnimation";
import LogisticsSuccessStories from "./LogisticsSuccessStories";

const TransportationLogistics = () => {
  return (
    <div>
      <HeroTransportationLogistics />
      <PartnerMarque />
      <WhatTransportationLogisticsRecruitment />
      <BothPathAnimation />
      <TransportationLogisticsRoles />
      <LogisticsChallenges />
      <LogisticsRecruitmentProcess />
      <LogisticsWhyChooseUs />
      <PathAnimation />
      <LogisticsWorkforceStatistics />
      <LogisticsSuccessStories />
    </div>
  );
};

export default TransportationLogistics;
