import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

import HeroPage from "./HeroPage";
import PartnerMarque from "../../components/common/PartnerMarque";
import OurGole from "./OurGole";
import Cliend from "./Cliend";
import Solutions from "./Solutions";
import PathAnimation from "./PathAnimation";
import TeamBuilding from "./TeamBuilding";
import WhyUs from "./WhyUs";
import SurgeProtect from "./SurgeProtect";
import CustomerReviews from "./CustomerReviews";
import ResourcesSection from "./ResourcesSection";

const Home = () => {
  return (
    <main className="bg-[var(--color-primary-bg)]">
      <HeroPage />
      <PartnerMarque />
      <OurGole />
      <Cliend />
      <Solutions />
      <PathAnimation />
      <TeamBuilding />
      <PartnerMarque />
      <WhyUs />
      <SurgeProtect />
      <CustomerReviews />
      <ResourcesSection />
    </main>
  );
};

export default Home;
