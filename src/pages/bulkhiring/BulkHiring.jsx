import React from "react";
import HeroBulkHiring from "./HeroBulkHiring";
import PartnerMarque from "../../components/common/PartnerMarque";
import WhatBulkHiring from "./WhatBulkHiring";
import SourceFrom from "../workforce-sourceing/SourceFrom";
import Challenges from "./Challenges";
import Industrys from "../../components/common/Industrys";
import BulkProcess from "./BulkProcess";
import Countrys from "../workforce-sourceing/Countrys";
import DeploymentTimeline from "./DeploymentTimeline";

const BulkHiring = () => {
  return (
    <div>
      <HeroBulkHiring />
      <PartnerMarque />
      <WhatBulkHiring />
      <Challenges />
      <Industrys />
      <BulkProcess />
      <SourceFrom />
      <Countrys />
      <DeploymentTimeline />
    </div>
  );
};

export default BulkHiring;
