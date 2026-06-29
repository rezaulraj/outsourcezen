import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Search,
  ClipboardCheck,
  UserCheck,
  ShieldCheck,
  Factory,
  BadgeCheck,
  ArrowRight,
  Users,
} from "lucide-react";

const steps = [
  {
    title: "Requirement Analysis",
    desc: "We understand factory needs, workforce size, skills, shift patterns and production targets.",
    icon: Search,
    color: "#FFE994",
  },
  {
    title: "Candidate Sourcing",
    desc: "We source skilled and semi-skilled food processing workers from trusted talent pools.",
    icon: Users,
    color: "#CFF7BC",
  },
  {
    title: "Screening & Shortlisting",
    desc: "We filter candidates based on experience, hygiene awareness and job readiness.",
    icon: ClipboardCheck,
    color: "#A6E6EC",
  },
  {
    title: "Skill & Safety Check",
    desc: "We ensure basic machine handling, food safety awareness and factory compliance knowledge.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Employer Interview",
    desc: "Shortlisted candidates are presented for final interview and approval by employers.",
    icon: UserCheck,
    color: "#FFE1A6",
  },
  {
    title: "Placement & Deployment",
    desc: "Selected workers are deployed quickly to factories, production lines and warehouses.",
    icon: Factory,
    color: "#CFF7BC",
  },
];

const OurRecruitmentProcess = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-process-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-process-card", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-process-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-primary-bg)] py-24 lg:py-32 font-arimo"
    >
      {/* CONTAINER FIXED */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Step-by-step", "food", "factory", "hiring", "process"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-process-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mt-4 text-sm leading-6 text-black/70">
            A structured recruitment flow that ensures fast, safe and reliable
            hiring for food manufacturing companies.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative grid gap-8 md:grid-cols-2">
          {/* CENTER LINE */}
          <div className="food-process-line absolute left-1/2 hidden h-full w-[2px] -translate-x-1/2 bg-black/10 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.title}
                className={`food-process-card flex ${
                  isLeft ? "md:justify-end" : "md:justify-start"
                }`}
              >
                <div className="w-full md:w-[88%]">
                  {/* CARD */}
                  <div className="group relative rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-black/25">
                    {/* STEP NUMBER */}
                    <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-md">
                      {index + 1}
                    </div>

                    <div className="flex gap-5">
                      {/* ICON */}
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: step.color }}
                      >
                        <Icon size={24} strokeWidth={2.4} />
                      </div>

                      {/* TEXT */}
                      <div>
                        <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-black/70">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* CENTER DOT */}
                    <div className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black md:block" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="food-process-card mt-16 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC] shadow-sm">
                <BadgeCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Fast & Reliable Food Factory Hiring
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We ensure quick screening, safe selection and smooth
                  deployment so your production never stops.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Start Hiring
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurRecruitmentProcess;
