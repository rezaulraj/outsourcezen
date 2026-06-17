import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
        },
      );

      gsap.utils.toArray(".page-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 80,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 45%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[var(--color-primary-bg)] opacity-0"
    >
      <section className="page-section">
        <HeroPage />
      </section>

      <section className="page-section">
        <PartnerMarque />
      </section>

      <section className="page-section">
        <OurGole />
      </section>

      <section className="page-section">
        <Cliend />
      </section>

      <section className="page-section">
        <Solutions />
      </section>

      <section className="page-section">
        <PathAnimation />
      </section>

      <section className="page-section">
        <TeamBuilding />
      </section>

      <section className="page-section">
        <PartnerMarque />
      </section>

      <section className="page-section">
        <WhyUs />
      </section>

      <section className="page-section">
        <SurgeProtect />
      </section>

      <section className="page-section">
        <CustomerReviews />
      </section>

      <section className="page-section">
        <ResourcesSection />
      </section>
    </main>
  );
};

export default Home;
