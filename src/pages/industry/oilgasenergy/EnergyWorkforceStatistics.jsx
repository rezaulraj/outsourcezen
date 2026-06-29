import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  BadgeCheck,
  ClipboardCheck,
  Flame,
  Globe2,
  HardHat,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

const stats = [
  {
    value: 1500,
    suffix: "+",
    label: "Energy Professionals",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: 20,
    suffix: "+",
    label: "Energy Projects",
    icon: Flame,
    color: "#CFF7BC",
  },
  {
    value: 18,
    suffix: "+",
    label: "Countries Supported",
    icon: Globe2,
    color: "#A6E6EC",
  },
  {
    value: 96,
    suffix: "%",
    label: "Client Satisfaction",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Recruitment Support",
    icon: AlarmClock,
    color: "#FFE994",
  },
  {
    value: 100,
    suffix: "%",
    label: "Documentation Support",
    icon: ClipboardCheck,
    color: "#CFF7BC",
  },
];

const EnergyWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-stat-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".energy-stat-card", {
        y: 40,
        opacity: 1,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "back.out(1.5)",
      });

      gsap.from(".energy-stat-strip", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        delay: 0.55,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#FFF9E6] px-5 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CFF7BC]">
              <Zap size={18} strokeWidth={2.4} />
            </div>

            <span className="text-sm font-semibold text-black">
              Energy Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Numbers",
              "behind",
              "safer",
              "energy",
              "workforce",
              "delivery",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="energy-stat-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/70">
            Our energy recruitment support helps employers source skilled,
            safety-focused and deployment-ready workers for oil, gas, EPC, power
            and renewable projects.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => (
            <StatisticCard key={item.label} item={item} />
          ))}
        </div>

        <div className="energy-stat-strip mt-10 rounded-[36px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.05em] text-black sm:text-4xl">
                Energy workforce support built for technical hiring
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/70">
                From engineers and HSE professionals to offshore crew,
                maintenance teams and renewable energy technicians, our
                recruitment process supports safety-critical hiring needs.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Offshore recruitment", "Rig crew and platform workers"],
                ["Shutdown staffing", "Fast mobilization support"],
                ["Renewable energy", "Wind and solar technicians"],
                ["Documentation flow", "Profile and file readiness"],
              ].map(([title, text], index) => (
                <div
                  key={title}
                  className="rounded-[26px] border border-black/10 bg-white/55 p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE994] text-sm font-bold text-black">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h4 className="text-base font-bold tracking-[-0.03em] text-black">
                    {title}
                  </h4>

                  <p className="mt-2 text-sm leading-5 text-black/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="energy-stat-strip mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Energy professionals",
            "HSE focused",
            "Global sourcing",
            "Fast shortlisting",
            "Project staffing",
            "Documentation support",
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
    <article className="energy-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/20">
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
        <BadgeCheck
          size={16}
          className="text-black/40 transition-all duration-300 group-hover:text-black"
        />

        <span className="text-xs font-medium text-black/50 transition-all duration-300 group-hover:text-black/70">
          Energy workforce support
        </span>
      </div>
    </article>
  );
};

export default EnergyWorkforceStatistics;
