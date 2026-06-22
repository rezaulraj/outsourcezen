import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardList,
  FileCheck,
  Plane,
  SearchCheck,
  Sprout,
  Tractor,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement",
    text: "We understand farm type, worker quantity, season, location and accommodation needs.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Sourcing",
    text: "We source reliable workers for harvesting, greenhouse, livestock and farm operations.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Screening",
    text: "Candidates are checked for farm readiness, discipline, availability and reliability.",
    icon: SearchCheck,
  },
  {
    number: "04",
    title: "Selection",
    text: "Shortlisted workers are shared with employers for review and final approval.",
    icon: BadgeCheck,
  },
  {
    number: "05",
    title: "Documentation",
    text: "Required contracts, visa files and deployment documents are organized.",
    icon: FileCheck,
  },
  {
    number: "06",
    title: "Deployment",
    text: "Workers are prepared for travel, arrival and productive farm start.",
    icon: Plane,
  },
];

const AgricultureRecruitmentProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-process-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".agri-process-card", {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".agri-process-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left",
        duration: 1,
        delay: 0.45,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Simple",
              "steps",
              "from",
              "farm",
              "need",
              "to",
              "deployment",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="agri-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A clear agriculture hiring flow for seasonal teams, field workers,
            greenhouse staff, livestock support and rural deployment needs.
          </p>
        </div>

        <div className="relative">
          <div className="agri-process-line absolute left-0 top-[42px] hidden h-[2px] w-full bg-black/10 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map(({ icon: Icon, ...step }, index) => (
              <article
                key={step.number}
                className="agri-process-card relative rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
              >
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE994]">
                    <Icon size={23} strokeWidth={2.4} />
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                    Step {step.number}
                  </p>

                  <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/70">
                    {step.text}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute right-4 top-8 hidden text-black/25 lg:block">
                    <Sprout size={18} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="agri-process-card mt-10 flex flex-col items-center justify-center gap-4 rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC]">
            <Tractor size={24} strokeWidth={2.4} />
          </div>

          <p className="max-w-3xl text-sm leading-6 text-black/70">
            Our process is designed for farms that need practical, dependable
            and season-ready workers without unnecessary complexity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgricultureRecruitmentProcess;
