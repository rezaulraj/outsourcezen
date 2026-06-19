import React from "react";
import HeroExecutiveSearch from "./HeroExecutiveSearch";
import PartnerMarque from "../../components/common/PartnerMarque";
import WhatExcuitveSearch from "./WhatExcuitveSearch";
import RoleRecruit from "./RoleRecruit";
import SearchProcess from "./SearchProcess";
import Industrys from "../../components/common/Industrys";
import Cliend from "../home/Cliend";
import WhyChoseClient from "../workforce-sourceing/WhyChoseClient";
import PathAnimation from "../home/PathAnimation";

const ExecutiveSearch = () => {
  return (
    <div>
      <HeroExecutiveSearch />
      <PartnerMarque />
      <PathAnimation />
      <WhatExcuitveSearch />
      <RoleRecruit />
      <SearchProcess />
      <Industrys />
      <Cliend />
      <WhyChoseClient />
    </div>
  );
};

export default ExecutiveSearch;
