import React from "react";
import HeroTransportationLogistics from "./HeroTransportationLogistics";
import WhatTransportationLogisticsRecruitment from "./WhatTransportationLogisticsRecruitment";
import TransportationLogisticsRoles from "./TransportationLogisticsRoles";
import PartnerMarque from "../../../components/common/PartnerMarque";

const TransportationLogistics = () => {
  return (
    <div>
      <HeroTransportationLogistics />
      <PartnerMarque/>
      <WhatTransportationLogisticsRecruitment />
      <TransportationLogisticsRoles />
    </div>
  );
};

export default TransportationLogistics;
