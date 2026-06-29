import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Apple,
  BadgeCheck,
  Beef,
  Candy,
  CheckCircle2,
  Factory,
  Fish,
  Milk,
  PackageCheck,
  ShieldCheck,
  Snowflake,
  Wheat,
} from "lucide-react";

const industries = [
  {
    title: "Food Manufacturing",
    desc: "Production lines, processing plants and factory operations.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Packaging",
    desc: "Packing, labelling, bottling and quality packaging teams.",
    icon: PackageCheck,
    color: "#CFF7BC",
  },
  {
    title: "Food Safety",
    desc: "Quality assurance, hygiene and compliance professionals.",
    icon: ShieldCheck,
    color: "#A6E6EC",
  },
  {
    title: "Cold Chain",
    desc: "Cold storage, frozen food and refrigerated warehouse staff.",
    icon: Snowflake,
    color: "#FFF6C8",
  },
];

const sectors = [
  { icon: Milk, label: "Dairy" },
  { icon: Beef, label: "Meat" },
  { icon: Fish, label: "Seafood" },
  { icon: Wheat, label: "Bakery" },
  { icon: Apple, label: "Fruit & Vegetable" },
  { icon: Candy, label: "Confectionery" },
];

const WhatIsFoodProcessingRecruitment = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-intro-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-intro-card", {
        y: 35,
        opacity: 1,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".food-intro-left", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".food-intro-right", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.35,
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
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Food Processing Recruitment?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Building",
              "safe",
              "and",
              "efficient",
              "food",
              "production",
              "teams",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="food-intro-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div className="food-intro-left">
            <div className="rounded-[38px] border border-black/10 bg-[#FFF9E6] p-8 lg:p-10">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Factory size={30} strokeWidth={2.4} />
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.04em] text-black">
                Supplying skilled people for every stage of food production
              </h3>

              <p className="mt-6 text-base leading-8 text-black/70">
                Food Processing Recruitment focuses on sourcing, screening and
                placing qualified professionals who help food manufacturers keep
                production lines operating safely, efficiently and in compliance
                with industry standards.
              </p>

              <p className="mt-5 text-base leading-8 text-black/70">
                From raw material preparation to processing, packaging, quality
                inspection, cold storage and warehouse operations, we recruit
                reliable workers that support consistent food production and
                business growth.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Production Operators",
                  "Machine Operators",
                  "Packaging Teams",
                  "Quality Inspectors",
                  "Warehouse Staff",
                  "Food Safety Officers",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-black/[0.04] p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-green-600 shrink-0"
                    />

                    <span className="text-sm font-semibold text-black/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="food-intro-right space-y-5">
            {industries.map(({ icon: Icon, ...item }) => (
              <article
                key={item.title}
                className="food-intro-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/20"
              >
                <div className="flex gap-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={24} strokeWidth={2.4} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div className="food-intro-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                Industries We Support
              </p>

              <div className="grid grid-cols-2 gap-4">
                {sectors.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-black/[0.04] p-4"
                  >
                    <Icon size={20} />

                    <span className="text-sm font-semibold text-black">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="food-intro-card mt-12 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <BadgeCheck
                className="mb-4 text-green-600"
                size={28}
                strokeWidth={2.4}
              />
              <h4 className="text-lg font-bold text-black">
                Skilled Workforce
              </h4>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Qualified production workers, machine operators and packaging
                professionals.
              </p>
            </div>

            <div>
              <ShieldCheck
                className="mb-4 text-green-600"
                size={28}
                strokeWidth={2.4}
              />
              <h4 className="text-lg font-bold text-black">
                Food Safety Focus
              </h4>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Candidates prepared for hygiene standards, GMP, HACCP and
                quality compliance.
              </p>
            </div>

            <div>
              <PackageCheck
                className="mb-4 text-green-600"
                size={28}
                strokeWidth={2.4}
              />
              <h4 className="text-lg font-bold text-black">
                End-to-End Production
              </h4>
              <p className="mt-2 text-sm leading-6 text-black/70">
                Recruitment support from food preparation through packaging,
                storage and distribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsFoodProcessingRecruitment;
