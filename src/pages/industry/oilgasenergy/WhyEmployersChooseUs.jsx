import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Flame,
  Globe2,
  HardHat,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

const benefits = [
  {
    title: "Energy industry focus",
    text: "We understand oil, gas, EPC, refinery, power and renewable energy workforce requirements.",
    icon: Flame,
    color: "#FFE994",
  },
  {
    title: "Certified workforce support",
    text: "We help employers find candidates with technical readiness, HSE awareness and document preparation.",
    icon: BadgeCheck,
    color: "#CFF7BC",
  },
  {
    title: "Fast mobilization",
    text: "Our process supports urgent shortlisting for shutdowns, turnarounds and time-sensitive projects.",
    icon: Zap,
    color: "#A6E6EC",
  },
  {
    title: "HSE-focused recruitment",
    text: "Safety awareness and role suitability are considered throughout candidate screening and coordination.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Global talent network",
    text: "We support multi-country sourcing for offshore, onshore, plant, maintenance and renewable energy roles.",
    icon: Globe2,
    color: "#FFE994",
  },
  {
    title: "Technical role coverage",
    text: "From engineers to rig crew, welders, HSE officers, QA/QC and technicians, we cover key energy roles.",
    icon: Wrench,
    color: "#CFF7BC",
  },
];

const proofStats = [
  { value: "1500+", label: "Energy Professionals" },
  { value: "20+", label: "Energy Projects" },
  { value: "18+", label: "Countries Supported" },
  { value: "96%", label: "Client Satisfaction" },
];

const WhyEmployersChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-why-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".energy-why-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".energy-why-stat", {
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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24"
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
        <div className="energy-why-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Trusted",
              "energy",
              "recruitment",
              "for",
              "critical",
              "projects",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="energy-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us for energy recruitment because we focus on
            technical readiness, safety awareness, fast shortlisting and
            practical workforce coordination.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="energy-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
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
              className="energy-why-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="energy-why-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for safety-critical energy workforce needs
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support employers with project-based hiring, offshore
                  recruitment, shutdown staffing, certified technical roles and
                  renewable energy workforce needs.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Energy Staff
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="energy-why-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Industry specialists",
            "Fast mobilization",
            "HSE focused",
            "Certified profiles",
            "Global sourcing",
            "Project staffing",
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

export default WhyEmployersChooseUs;
