import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  BadgeCheck,
  Clock,
  Factory,
  Flame,
  PackageX,
  ShieldAlert,
  Snowflake,
  Truck,
  Users,
} from "lucide-react";

const challenges = [
  {
    title: "Labor Shortage",
    desc: "Difficulty finding skilled and reliable production workers during peak demand.",
    icon: Users,
    color: "#FFE994",
  },
  {
    title: "Seasonal Demand Pressure",
    desc: "Sudden workforce spikes during holidays, festivals, and production cycles.",
    icon: Clock,
    color: "#CFF7BC",
  },
  {
    title: "Food Safety Compliance",
    desc: "Strict hygiene and safety standards require trained and disciplined staff.",
    icon: ShieldAlert,
    color: "#A6E6EC",
  },
  {
    title: "High Turnover Rate",
    desc: "Factories often face frequent worker replacements and training delays.",
    icon: PackageX,
    color: "#FFF6C8",
  },
  {
    title: "Cold Chain Staffing",
    desc: "Cold storage and frozen production require specialized working conditions.",
    icon: Snowflake,
    color: "#CFF7BC",
  },
  {
    title: "Production Downtime",
    desc: "Unfilled roles can directly slow or stop production lines.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Shift Management Issues",
    desc: "Managing 24/7 shifts across multiple production lines is complex.",
    icon: Truck,
    color: "#A6E6EC",
  },
  {
    title: "Safety Risks",
    desc: "Industrial environments require careful handling and trained workers.",
    icon: AlertTriangle,
    color: "#FFE1A6",
  },
];

const FoodProcessingChallengesWeSolve = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-ch-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-ch-card", {
        y: 35,
        opacity: 1,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.06,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".food-ch-reveal", {
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
      className="bg-[var(--color-primary-bg)] py-24 lg:py-32 font-arimo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Food Processing Challenges We Solve
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Solving", "critical", "factory", "workforce", "challenges"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-ch-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="food-ch-reveal mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Food factories face workforce pressure, compliance issues and
            production delays. We solve these with fast, reliable recruitment
            solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {challenges.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="food-ch-card group rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={24} strokeWidth={2.4} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.03em] text-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/70">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-black/50">
                  <BadgeCheck size={14} />
                  Solved by our recruitment team
                </div>
              </article>
            );
          })}
        </div>

        <div className="food-ch-reveal mt-12 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Flame size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Reduce production downtime with faster hiring
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We help food processing companies quickly fill critical roles
                  so production lines stay active, safe and efficient.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Solve Staffing Issues
              <Truck size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodProcessingChallengesWeSolve;
