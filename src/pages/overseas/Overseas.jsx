import React from "react";
import HeroOverseas from "./HeroOverseas";
import SourceFrom from "../workforce-sourceing/SourceFrom";
import PartnerMarque from "../../components/common/PartnerMarque";
import Solutions from "../home/Solutions";
import Industrys from "../../components/common/Industrys";
import Process from "../workforce-sourceing/Process";
import WhyChoseClient from "../workforce-sourceing/WhyChoseClient";
import Countrys from "../workforce-sourceing/Countrys";
import Resources from "../../components/common/Resources";
import FAQs from "../../components/common/FAQs";

const Overseas = () => {
  return (
    <div>
      <HeroOverseas />
      <PartnerMarque />
      <SourceFrom />
      <Solutions />
      <Industrys />
      <Process />
      <WhyChoseClient />
      <Countrys />
      <Resources />
      <FAQs />
    </div>
  );
};

export default Overseas;
