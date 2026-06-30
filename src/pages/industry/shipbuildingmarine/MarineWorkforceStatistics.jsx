import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Anchor,
  BadgeCheck,
  BarChart3,
  Clock3,
  Globe2,
  HardHat,
  ShieldCheck,
  Ship,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

const stats = [
  {
    value: "2200+",
    label: "Marine Workers",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: "120+",
    label: "Shipyard Projects",
    icon: Ship,
    color: "#CFF7BC",
  },
  {
    value: "30+",
    label: "Countries Supported",
    icon: Globe2,
    color: "#A6E6EC",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    value: "48h",
    label: "Initial Shortlist",
    icon: Clock3,
    color: "#FFE1A6",
  },
  {
    value: "24/7",
    label: "Marine Recruitment Support",
    icon: Anchor,
    color: "#CFF7BC",
  },
];

const insights = [
  {
    title: "Skilled trade demand",
    text: "Shipyards need continuous access to welders, pipe fitters, ship fitters, riggers and fabricators.",
    icon: Wrench,
    color: "#FFE994",
  },
  {
    title: "Safety-critical hiring",
    text: "Marine projects require candidates with strong PPE awareness, HSE readiness and site discipline.",
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
  {
    title: "Fast mobilization",
    text: "Dry dock, vessel repair and offshore support often require rapid workforce deployment.",
    icon: HardHat,
    color: "#A6E6EC",
  },
  {
    title: "Global workforce supply",
    text: "International marine employers need reliable recruitment across countries and project locations.",
    icon: Globe2,
    color: "#FFF6C8",
  },
];

const MarineWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-stat-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".marine-stat-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.07,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".marine-stat-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
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
        <div className="marine-stat-reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2">
            <BarChart3 size={16} />
            <span className="text-sm font-semibold text-black">
              Marine Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "behind", "strong", "marine", "workforces"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="marine-stat-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Practical workforce results across shipbuilding, dry dock, offshore,
            vessel repair and marine technical recruitment.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(({ icon: Icon, ...item }) => (
            <article
              key={item.label}
              className="marine-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
            >
              <div
                className="absolute left-0 top-0 h-1.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: item.color }}
              />

              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={28} strokeWidth={2.4} />
              </div>

              <h3 className="mt-8 text-5xl font-normal tracking-[-0.06em] text-black sm:text-6xl">
                {item.value}
              </h3>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-black/55">
                {item.label}
              </p>

              <div className="mt-7 flex items-center gap-2">
                <BadgeCheck
                  size={16}
                  className="text-black/40 transition-all duration-300 group-hover:text-black"
                />
                <span className="text-xs font-medium text-black/50 transition-all duration-300 group-hover:text-black/70">
                  Marine workforce support
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="marine-stat-reveal mt-12 rounded-[36px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Ship size={28} strokeWidth={2.4} />
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.05em] text-black sm:text-4xl">
                Workforce data for safety-critical marine projects
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/70">
                From shipyard trades to offshore crew and marine technical
                workers, our recruitment support is built around speed, safety,
                certification readiness and project delivery.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {insights.map(({ icon: Icon, ...item }) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-black/10 bg-white/55 p-5"
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={20} strokeWidth={2.4} />
                  </div>

                  <h4 className="text-base font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-5 text-black/65">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="marine-stat-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Shipyard trades",
            "Offshore crew",
            "Certified workers",
            "Dry dock support",
            "Marine engineers",
            "HSE recruitment",
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

export default MarineWorkforceStatistics;
