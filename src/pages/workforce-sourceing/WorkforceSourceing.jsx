import React from "react";
import HeroWorkforceSourcing from "./HeroWorkforceSourceing";
import SourceFrom from "./SourceFrom";
import PartnerMarque from "../../components/common/PartnerMarque";
import WhyChoseClient from "./WhyChoseClient";
import Countrys from "./Countrys";

const WorkforceSourceing = () => {
  return (
    <div>
      <HeroWorkforceSourcing />
      <PartnerMarque />
      <SourceFrom />
      <Countrys />
      <WhyChoseClient />
      <div className="min-h-[50vh]"></div>
    </div>
  );
};

export default WorkforceSourceing;
