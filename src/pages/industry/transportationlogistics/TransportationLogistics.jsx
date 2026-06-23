import React from "react";
import HeroTransportationLogistics from "./HeroTransportationLogistics";
import WhatTransportationLogisticsRecruitment from "./WhatTransportationLogisticsRecruitment";
import TransportationLogisticsRoles from "./TransportationLogisticsRoles";
import PartnerMarque from "../../../components/common/PartnerMarque";
import LogisticsChallenges from "./LogisticsChallenges";
import BothPathAnimation from "../../../components/common/BothPathAnimation";

const TransportationLogistics = () => {
  return (
    <div>
      <HeroTransportationLogistics />
      <PartnerMarque />
      <WhatTransportationLogisticsRecruitment />
      <BothPathAnimation />
      <TransportationLogisticsRoles />
      <LogisticsChallenges />
    </div>
  );
};

export default TransportationLogistics;
