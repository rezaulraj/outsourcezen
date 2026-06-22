import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardList,
  FileCheck,
  Plane,
  SearchCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement Discussion",
    text: "We understand hotel type, roles, service standard, timeline and staffing volume.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Candidate Sourcing",
    text: "We source hospitality professionals for front office, F&B, culinary and housekeeping roles.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Service Screening",
    text: "Candidates are checked for grooming, communication, attitude and guest-service mindset.",
    icon: SearchCheck,
  },
  {
    number: "04",
    title: "Employer Approval",
    text: "Shortlisted profiles are shared for interview, review and final selection.",
    icon: BadgeCheck,
  },
  {
    number: "05",
    title: "Documentation",
    text: "Contracts, visa files and required deployment documents are prepared.",
    icon: FileCheck,
  },
  {
    number: "06",
    title: "Deployment",
    text: "Selected workers are prepared for travel, arrival and onboarding.",
    icon: Plane,
  },
];

const HospitalityRecruitmentProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hosp-process-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".hosp-process-card", {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".hosp-process-line", {
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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-2 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Simple", "steps", "to", "service-ready", "staff"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="hosp-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A clean hospitality hiring flow from requirement discussion to
            screening, approval, documentation and deployment.
          </p>
        </div>

        <div className="relative">
          <div className="hosp-process-line absolute left-0 top-[42px] hidden h-[2px] w-full bg-black/10 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ icon: Icon, ...step }, index) => (
              <article
                key={step.number}
                className="hosp-process-card relative rounded-[28px] border border-black/10 bg-[#FFF9E6]/50 p-5"
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
                    <Sparkles size={18} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalityRecruitmentProcess;
