import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe2,
  Handshake,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "Successful Placements",
    icon: BadgeCheck,
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
    icon: Building2,
    color: "#A6E6EC",
  },
  {
    value: 96,
    suffix: "%",
    label: "Client Satisfaction",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
];

const CompanyStatsCTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".company-stat-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".company-stat-card", {
        y: 40,
        opacity: 1,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "back.out(1.5)",
      });

      gsap.from(".company-cta", {
        y: 35,
        opacity: 0,
        scale: 0.97,
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
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Company Statistics
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "that", "reflect", "our", "global", "impact"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="company-stat-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            From international workforce sourcing to placement coordination, our
            company supports employers across countries, industries and hiring
            needs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatisticCard key={item.label} item={item} />
          ))}
        </div>

        <div className="company-cta mt-10 overflow-hidden rounded-[42px] border border-black bg-[#FFF9E6]">
          <div className="grid items-center gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative p-7 sm:p-10 lg:p-12">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#CFF7BC]/70 blur-3xl" />
              <div className="absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-[#FFE994]/70 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white">
                  <Handshake size={30} strokeWidth={2.4} />
                </div>

                <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
                  Ready to build your workforce?
                </p>

                <h3 className="max-w-2xl text-4xl font-normal tracking-[-0.055em] text-black sm:text-5xl lg:text-6xl">
                  Let’s connect your company with reliable people.
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-6 text-black/70">
                  Whether you need overseas recruitment, workforce sourcing,
                  bulk hiring, candidate screening or deployment support, our
                  team is ready to help.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
                  >
                    Contact Our Team
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="/solutions/workforce-sourcing"
                    className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] border-t border-black lg:min-h-[460px] lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-black" />

              <div className="absolute inset-0 opacity-20">
                <div className="grid h-full grid-cols-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border-r border-white/25" />
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-center p-7 text-white sm:p-10 lg:min-h-[460px]">
                <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                  <Sparkles size={14} />
                  Global Hiring Support
                </div>

                <div className="space-y-5">
                  {[
                    ["Workforce Sourcing", "Find suitable workers"],
                    ["Candidate Screening", "Shortlist reliable profiles"],
                    ["Documentation Support", "Coordinate required files"],
                    ["Deployment Support", "Prepare people for placement"],
                  ].map(([title, text], index) => (
                    <div
                      key={title}
                      className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#CFF7BC] text-sm font-bold text-black">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white">
                            {title}
                          </h4>
                          <p className="mt-1 text-sm text-white/60">{text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE994] text-black">
                    <UsersRound size={22} />
                  </div>

                  <p className="text-sm leading-6 text-white/70">
                    Tell us what roles you need. We will help you move from
                    hiring requirement to workforce support.
                  </p>
                </div>
              </div>
            </div>
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
    <article className="company-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/20">
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

      <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/50">
        <BadgeCheck size={13} />
        Company impact
      </div>
    </article>
  );
};

export default CompanyStatsCTA;
