import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Factory,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";

const steps = [
  {
    title: "Requirement Analysis",
    desc: "We understand factory needs, workforce size, skills, shifts and production targets.",
    icon: Search,
    color: "#FFE994",
    tag: "Planning",
  },
  {
    title: "Candidate Sourcing",
    desc: "We source skilled and semi-skilled food processing workers from trusted talent pools.",
    icon: Users,
    color: "#CFF7BC",
    tag: "Sourcing",
  },
  {
    title: "Screening & Shortlisting",
    desc: "We filter candidates based on experience, hygiene awareness and job readiness.",
    icon: ClipboardCheck,
    color: "#A6E6EC",
    tag: "Screening",
  },
  {
    title: "Skill & Safety Check",
    desc: "We check machine handling, food safety awareness and factory compliance knowledge.",
    icon: ShieldCheck,
    color: "#FFF6C8",
    tag: "Safety",
  },
  {
    title: "Employer Interview",
    desc: "Shortlisted candidates are presented for employer interview and final approval.",
    icon: Handshake,
    color: "#FFE1A6",
    tag: "Interview",
  },
  {
    title: "Placement & Deployment",
    desc: "Selected workers are deployed to factories, production lines and warehouses.",
    icon: Factory,
    color: "#CFF7BC",
    tag: "Deployment",
  },
];

const progressItems = [
  { label: "Requirement", width: "95%" },
  { label: "Candidates", width: "88%" },
  { label: "Screening", width: "92%" },
  { label: "Deployment", width: "84%" },
];

const OurRecruitmentProcess = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

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

      gsap.from(".food-process-reveal", {
        y: 35,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-process-card", {
        y: 45,
        opacity: 1,
        scale: 0.94,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".food-process-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        delay: 0.55,
        ease: "power3.out",
      });

      gsap.to(".food-process-glow", {
        xPercent: 900,
        duration: 6,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".food-process-float", {
        y: -12,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });

      gsap.to(".food-process-progress-fill", {
        scaleX: 1,
        duration: 1.8,
        stagger: 0.12,
        delay: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-44 w-44 rounded-full bg-[#CFF7BC]/35 blur-3xl" />
        <div className="absolute right-[6%] top-[24%] h-52 w-52 rounded-full bg-[#FFE994]/45 blur-3xl" />
        <div className="absolute bottom-[12%] left-[28%] h-48 w-48 rounded-full bg-[#A6E6EC]/30 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="food-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "factory", "need", "to", "workforce", "deployment"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-process-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/70">
            A smooth food processing recruitment journey designed for safe, fast
            and reliable factory hiring.
          </p>
        </div>

        <div className="food-process-reveal relative mx-auto mb-12 max-w-6xl overflow-hidden rounded-[38px] border border-black/10 bg-[#FFF9E6] p-5 sm:p-7">
          <div className="relative hidden h-24 items-center md:flex">
            <div className="food-process-line absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-black/10" />
            <div className="food-process-glow absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#67D946] shadow-[0_0_25px_rgba(103,217,70,0.9)]" />

            <div className="relative z-10 grid w-full grid-cols-6 gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = active === index;

                return (
                  <button
                    key={step.title}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div
                      className={`food-process-float flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-black shadow-lg"
                          : "border-black/10"
                      }`}
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon size={24} strokeWidth={2.4} />
                    </div>

                    <p className="text-center text-xs font-bold leading-4 text-black/65">
                      {step.tag}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:hidden">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <button
                  key={step.title}
                  onClick={() => setActive(index)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left ${
                    active === index
                      ? "border-black bg-white/60"
                      : "border-black/10"
                  }`}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: step.color }}
                  >
                    <Icon size={21} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{step.title}</p>
                    <p className="text-xs text-black/55">{step.tag}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="food-process-reveal sticky top-24 hidden overflow-hidden rounded-[38px] border border-black/10 bg-[#FFF9E6] p-8 lg:block">
            <div className="relative h-[520px] overflow-hidden rounded-[30px] bg-black">
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />
              </div>

              <div className="absolute left-8 right-8 top-8 rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Live Hiring Flow
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-white">
                  {steps[active].title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {steps[active].desc}
                </p>
              </div>

              <div className="absolute left-8 right-8 top-[230px]">
                <div className="grid grid-cols-3 gap-4">
                  {["Source", "Screen", "Deploy"].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md"
                    >
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#67D946]">
                        <BadgeCheck size={18} />
                      </div>
                      <p className="text-xs font-bold text-white/75">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                    <Factory size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Production Ready
                    </p>
                    <p className="text-xs text-white/55">
                      Factory team deployment flow
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {progressItems.map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-xs font-bold text-white/60">
                        <span>{item.label}</span>
                        <span>{item.width}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/15">
                        <div
                          className="food-process-progress-fill h-full origin-left scale-x-0 rounded-full bg-[#67D946]"
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -right-20 bottom-20 h-52 w-52 rounded-full bg-[#67D946]/20 blur-3xl" />
            </div>
          </div>

          <div className="grid gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;

              return (
                <article
                  key={step.title}
                  onMouseEnter={() => setActive(index)}
                  className={`food-process-card group relative overflow-hidden rounded-[30px] border bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 ${
                    isActive
                      ? "border-black shadow-xl"
                      : "border-black/10 shadow-sm"
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1.5 transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? step.color : "transparent",
                    }}
                  />

                  <div className="flex gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon size={27} strokeWidth={2.4} />
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/55">
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold tracking-[-0.035em] text-black">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                        {step.desc}
                      </p>
                    </div>

                    <div
                      className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full md:flex ${
                        isActive ? "bg-[#67D946]" : "bg-black/[0.05]"
                      }`}
                    >
                      <BadgeCheck size={18} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* <div className="food-process-reveal mt-12 rounded-[36px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <UserCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Fast and reliable food factory hiring process
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We ensure quick screening, safe selection and smooth
                  deployment so your production never stops.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              Start Hiring
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="food-process-reveal mt-6 flex flex-wrap justify-center gap-3">
          {[
            "Factory requirement",
            "Candidate sourcing",
            "Safety check",
            "Employer interview",
            "Deployment",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default OurRecruitmentProcess;
