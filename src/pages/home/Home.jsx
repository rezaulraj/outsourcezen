import React from "react";
import HeroPage from "./HeroPage";
import PartnerMarque from "../../components/common/PartnerMarque";
import OurGole from "./OurGole";
import Cliend from "./Cliend";
import Solutions from "./Solutions";
import PathAnimation from "./PathAnimation";
import TeamBuilding from "./TeamBuilding";

const Home = () => {
  return (
    <div className="">
      <HeroPage />
      <PartnerMarque />
      <OurGole />
      <Cliend />
      <Solutions />
      <PathAnimation />
      <TeamBuilding />
      <PartnerMarque />
    </div>
  );
};

export default Home;
