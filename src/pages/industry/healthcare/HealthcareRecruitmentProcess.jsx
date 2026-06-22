import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardCheck,
  FileCheck,
  Plane,
  SearchCheck,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Requirement Analysis",
    text: "We understand care setting, required roles, experience level, shift coverage and compliance needs.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Candidate Sourcing",
    text: "We source healthcare professionals for hospitals, clinics, care homes and support services.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Credential Review",
    text: "Licenses, training, experience and required documents are reviewed carefully.",
    icon: FileCheck,
  },
  {
    number: "04",
    title: "Clinical Screening",
    text: "Candidates are checked for role knowledge, communication, discipline and care mindset.",
    icon: Stethoscope,
  },
  {
    number: "05",
    title: "Employer Interview",
    text: "Shortlisted candidates are shared with employers for interview and final selection.",
    icon: SearchCheck,
  },
  {
    number: "06",
    title: "Compliance Check",
    text: "We support screening with patient safety, ethics and healthcare workplace standards in mind.",
    icon: ShieldCheck,
  },
  {
    number: "07",
    title: "Final Approval",
    text: "Selected candidates are confirmed and prepared for documentation and deployment.",
    icon: BadgeCheck,
  },
  {
    number: "08",
    title: "Deployment",
    text: "Workers are prepared for travel, arrival, onboarding and healthcare workplace start.",
    icon: Plane,
  },
];

const HealthcareRecruitmentProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-process-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".health-process-card", {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".health-process-line", {
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
      <div className="absolute inset-0 bg-[#CFF7BC]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Simple", "steps", "to", "care-ready", "professionals"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="health-process-word inline-block">
                    {word}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A clear healthcare hiring flow from requirement analysis to
            credential review, clinical screening, compliance checks and
            deployment.
          </p>
        </div>

        <div className="relative">
          <div className="health-process-line absolute left-0 top-[42px] hidden h-[2px] w-full bg-black/10 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, ...step }, index) => (
              <article
                key={step.number}
                className="health-process-card relative rounded-[28px] border border-black/10 bg-[#CFF7BC]/90 p-5"
              >
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#a1fc76]">
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
                  <div className="absolute right-4 top-8 hidden h-3 w-3 rounded-full bg-[#67D946] lg:block" />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareRecruitmentProcess;
