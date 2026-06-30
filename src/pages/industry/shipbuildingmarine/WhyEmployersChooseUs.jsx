import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Clock3,
  Globe2,
  HardHat,
  ShieldCheck,
  Ship,
  Sparkles,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

const benefits = [
  {
    title: "Marine industry expertise",
    text: "We understand shipyard work, dry dock operations, vessel repair, offshore support and technical marine hiring needs.",
    icon: Ship,
    color: "#FFE994",
  },
  {
    title: "Skilled trade network",
    text: "We source welders, pipe fitters, ship fitters, riggers, painters, blasters, electricians and mechanical workers.",
    icon: Wrench,
    color: "#CFF7BC",
  },
  {
    title: "Fast project support",
    text: "We support urgent manpower requests for tight shipbuilding timelines, maintenance windows and project mobilization.",
    icon: Clock3,
    color: "#A6E6EC",
  },
  {
    title: "Safety-focused hiring",
    text: "Candidates are reviewed with safety awareness, PPE readiness, HSE expectations and shipyard environment suitability.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Global marine workforce",
    text: "We support international recruitment and deployment for shipyards, marine contractors and offshore employers.",
    icon: Globe2,
    color: "#FFE1A6",
  },
  {
    title: "End-to-end coordination",
    text: "From sourcing to screening, certification review, employer selection and deployment, we manage the hiring flow smoothly.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "2200+", label: "Marine Workers" },
  { value: "120+", label: "Shipyard Projects" },
  { value: "30+", label: "Countries Supported" },
  { value: "98%", label: "Client Satisfaction" },
];

const WhyEmployersChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-why-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".marine-why-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".marine-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".marine-why-stat", {
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
        <div className="marine-why-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Trusted",
              "marine",
              "recruitment",
              "for",
              "critical",
              "projects",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="marine-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us because we help shipyards and marine contractors
            find skilled, safety-aware and project-ready workers quickly.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="marine-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
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
          {stats.map((item) => (
            <article
              key={item.label}
              className="marine-why-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="marine-why-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Anchor size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for shipyards, vessels and offshore projects
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support marine employers with skilled trade recruitment,
                  safety-focused screening, certification checks, fast
                  shortlisting and smooth workforce deployment.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Marine Staff
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="marine-why-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Skilled trades",
            "Safety focused",
            "Fast shortlisting",
            "Certified workers",
            "Global workforce",
            "Shipyard support",
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
