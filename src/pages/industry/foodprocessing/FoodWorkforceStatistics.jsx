import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BarChart3,
  BadgeCheck,
  Factory,
  TrendingUp,
  Users,
  Globe2,
  Clock,
  ShieldCheck,
  PackageCheck,
  Truck,
} from "lucide-react";

const stats = [
  { value: "3500+", label: "Workers Placed" },
  { value: "280+", label: "Factories Supported" },
  { value: "40+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

const items = [
  {
    title: "Production Workforce Demand",
    desc: "Food factories require continuous skilled workers to keep production lines running efficiently.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Seasonal Workforce Surge",
    desc: "Demand increases during festivals, holidays, and peak manufacturing cycles.",
    icon: TrendingUp,
    color: "#CFF7BC",
  },
  {
    title: "Food Safety Compliance",
    desc: "Workers must follow strict hygiene, GMP and HACCP standards in all production stages.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Shift-Based Staffing",
    desc: "Factories operate 24/7 requiring continuous shift coverage and workforce rotation.",
    icon: Clock,
    color: "#FFF6C8",
  },
  {
    title: "High Turnover Rate",
    desc: "Factories often face frequent worker replacement needs and onboarding delays.",
    icon: Users,
    color: "#FFE1A6",
  },
  {
    title: "Cold Chain Requirements",
    desc: "Frozen and refrigerated production needs trained workers for controlled environments.",
    icon: Globe2,
    color: "#CFF7BC",
  },
  {
    title: "Packaging & Logistics Pressure",
    desc: "Fast packaging and distribution require skilled packing and warehouse teams.",
    icon: PackageCheck,
    color: "#A6E6EC",
  },
  {
    title: "Urgent Staffing Gaps",
    desc: "Sudden workforce shortages can delay production and increase operational cost.",
    icon: Truck,
    color: "#FFE994",
  },
];

const FoodWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-stat-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-stat-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.06,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-stat-reveal", {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2">
            <BarChart3 size={16} />
            <span className="text-sm font-semibold">
              Food Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Data", "behind", "food", "factory", "workforce", "needs"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-stat-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="food-stat-reveal mt-4 text-sm leading-6 text-black/70">
            Real workforce demand in food manufacturing, packaging, quality
            control, warehouse operations and cold chain industries.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="food-stat-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.05em] text-black">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="food-stat-card group rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.03em] text-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/70">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-black/50">
                  <BadgeCheck size={14} />
                  Industry verified challenge
                </div>
              </div>
            );
          })}
        </div>

        <div className="food-stat-reveal mt-12 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Data-driven food workforce solutions
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We analyze workforce demand patterns and provide fast,
                  reliable staffing solutions for food factories worldwide.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Get Workforce Support
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodWorkforceStatistics;
