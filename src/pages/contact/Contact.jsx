import React from "react";
import HeroContact from "./HeroContact";
import ContactInformation from "./ContactInformation";
import GetInTouchForm from "./GetInTouchForm";
import BothPathAnimation from "../../components/common/BothPathAnimation";
import GlobalOfficeLocations from "./GlobalOfficeLocations";
import PathAnimation from "../home/PathAnimation";
import WhyContactUs from "./WhyContactUs";
import RecruitmentSupportAreas from "./RecruitmentSupportAreas";
import ContactFAQ from "./ContactFAQ";
import SmoothScroll from "../../components/common/SmoothScroll";

const Contact = () => {
  return (
    <div>
      <SmoothScroll />
      <HeroContact />
      <ContactInformation />
      <BothPathAnimation />
      <GetInTouchForm />
      <GlobalOfficeLocations />
      <PathAnimation />
      <WhyContactUs />
      <RecruitmentSupportAreas />
      <ContactFAQ />
    </div>
  );
};

export default Contact;
