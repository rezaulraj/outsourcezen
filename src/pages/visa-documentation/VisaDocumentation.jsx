import React from "react";
import HeroVisaDocumentation from "./HeroVisaDocumentation";
import WhatVisaDocumentation from "./WhatVisaDocumentation";
import DocumentsWeHandle from "./DocumentsWeHandle";
import DocumentationProblems from "./DocumentationProblems";
import PathAnimation from "../home/PathAnimation";
import VisaDocumentationProcess from "./VisaDocumentationProcess";
import BothPathAnimation from "../../components/common/BothPathAnimation";
import Countrys from "../workforce-sourceing/Countrys";
import WhyTrustDocumentation from "./WhyTrustDocumentation";
import VisaFAQ from "./VisaFAQ";

const VisaDocumentation = () => {
  return (
    <div>
      <HeroVisaDocumentation />
      <WhatVisaDocumentation />
      <DocumentsWeHandle />
      <PathAnimation />
      <DocumentationProblems />
      <BothPathAnimation />
      <VisaDocumentationProcess />
      <Countrys />
      <WhyTrustDocumentation />
      <VisaFAQ />
    </div>
  );
};

export default VisaDocumentation;
