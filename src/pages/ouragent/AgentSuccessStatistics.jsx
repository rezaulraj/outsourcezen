import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Globe2,
  Handshake,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    value: 40,
    suffix: "+",
    label: "Recruitment Agents",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: 30,
    suffix: "+",
    label: "Countries Covered",
    icon: Globe2,
    color: "#CFF7BC",
  },
  {
    value: 20,
    suffix: "+",
    label: "Industries Served",
    icon: BriefcaseBusiness,
    color: "#A6E6EC",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Successful Placements",
    icon: Handshake,
    color: "#FFF6C8",
  },
];

const AgentSuccessStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agent-stat-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".agent-stat-card", {
        y: 40,
        opacity: 0,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "back.out(1.5)",
      });

      gsap.from(".agent-stat-strip", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.55,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#FFF9E6] px-5 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFF7BC]">
              <Star size={18} strokeWidth={2.4} />
            </div>

            <span className="text-sm font-semibold text-black">
              Agent Success Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "that", "show", "agent", "performance"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="agent-stat-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/70">
            Our recruitment agents support employers and candidates across
            countries, industries and workforce categories with fast, dependable
            placement assistance.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatisticCard key={item.label} item={item} />
          ))}
        </div>

        <div className="agent-stat-strip mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <BadgeCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Trusted by employers for practical recruitment support
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  From first inquiry to placement coordination, our agents help
                  employers move faster with clear communication, candidate
                  guidance and reliable workforce support.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Contact an Agent
              <Clock3 size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatisticCard = ({ item }) => {
  const valueRef = useRef(null);
  const Icon = item.icon;

  useEffect(() => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: item.value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (!valueRef.current) return;

        valueRef.current.textContent =
          Math.floor(counter.value).toLocaleString() + item.suffix;
      },
    });
  }, [item]);

  return (
    <article className="agent-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/20">
      <div
        className="absolute left-0 top-0 h-1.5 w-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{
          backgroundColor: item.color,
          transformOrigin: "left",
        }}
      />

      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: item.color }}
      >
        <Icon size={28} strokeWidth={2.4} />
      </div>

      <div className="mt-8">
        <h3
          ref={valueRef}
          className="text-5xl font-normal tracking-[-0.06em] text-black sm:text-6xl"
        >
          0
        </h3>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-black/55">
          {item.label}
        </p>
      </div>

      <div className="mt-7 flex items-center gap-2">
        <ShieldCheck
          size={16}
          className="text-black/40 transition-all duration-300 group-hover:text-black"
        />

        <span className="text-xs font-medium text-black/50 transition-all duration-300 group-hover:text-black/70">
          Agent-led support
        </span>
      </div>
    </article>
  );
};

export default AgentSuccessStatistics;
