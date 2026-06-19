import React from "react";
import HeroWorkforceSourcing from "./HeroWorkforceSourceing";
import SourceFrom from "./SourceFrom";
import PartnerMarque from "../../components/common/PartnerMarque";
import WhyChoseClient from "./WhyChoseClient";
import Countrys from "./Countrys";
import Industrys from "../../components/common/Industrys";
import Process from "./Process";
import PathAnimation from "../home/PathAnimation";
import FAQs from "../../components/common/FAQs";
import Resources from "../../components/common/Resources";

const WorkforceSourceing = () => {
  return (
    <div>
      <HeroWorkforceSourcing />
      <PartnerMarque />
      <SourceFrom />
      <Countrys />
      <WhyChoseClient />
      <Industrys />
      <Process />
      <PathAnimation />
      <FAQs />
      <Resources />
    </div>
  );
};

export default WorkforceSourceing;
