import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  FileCheck2,
  Globe2,
  Handshake,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const trustItems = [
  {
    title: "Reliable worker sourcing",
    text: "We focus on finding dependable candidates who match the employer’s role, industry and workforce needs.",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    title: "Clear communication",
    text: "Our team keeps employers updated through each stage, from requirement discussion to candidate coordination.",
    icon: Handshake,
    color: "#CFF7BC",
  },
  {
    title: "Screening support",
    text: "Candidates are reviewed for readiness, experience, suitability and practical role requirements.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Documentation flow",
    text: "We support organized document coordination for smoother recruitment and overseas hiring processes.",
    icon: FileCheck2,
    color: "#FFF6C8",
  },
  {
    title: "Fast shortlisting",
    text: "Employers can receive suitable candidate profiles quickly when urgent workforce support is needed.",
    icon: Clock3,
    color: "#FFE994",
  },
  {
    title: "Global recruitment reach",
    text: "Our office and agent network supports recruitment across countries, industries and workforce categories.",
    icon: Globe2,
    color: "#CFF7BC",
  },
];

const proofStats = [
  { value: "10K+", label: "Successful Placements" },
  { value: "30+", label: "Countries Covered" },
  { value: "20+", label: "Industries Served" },
  { value: "96%", label: "Client Satisfaction" },
];

const WhyCompaniesTrustUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".trust-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".trust-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".trust-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="trust-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Companies Trust Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Built",
              "on",
              "reliability",
              "clarity",
              "and",
              "workforce",
              "results",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="trust-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Companies trust OutsourceZen because we combine practical
            recruitment support, global reach, candidate coordination and
            employer-focused communication.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="trust-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={24} strokeWidth={2.4} />
              </div>

              <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map((item) => (
            <article
              key={item.label}
              className="trust-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>

        <div className="trust-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <BadgeCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Practical recruitment support for real workforce needs
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  From urgent hiring to long-term workforce planning, we support
                  companies with sourcing, screening, documentation coordination
                  and deployment assistance.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Talk to Our Team
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="trust-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Employer focused",
            "Screening support",
            "Global network",
            "Documentation flow",
            "Clear communication",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCompaniesTrustUs;
