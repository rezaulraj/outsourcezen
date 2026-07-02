import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  BarChart3,
  Building2,
  Camera,
  Clock3,
  Fingerprint,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

const stats = [
  {
    value: "3200+",
    label: "Security Staff",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: "180+",
    label: "Sites Protected",
    icon: Building2,
    color: "#CFF7BC",
  },
  {
    value: "25+",
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
    icon: Zap,
    color: "#FFE1A6",
  },
  {
    value: "24/7",
    label: "Support Coverage",
    icon: Clock3,
    color: "#CFF7BC",
  },
];

const insights = [
  {
    title: "Guard coverage demand",
    text: "Offices, warehouses, hotels, retail stores and residential sites need reliable shift-based guards.",
    icon: LockKeyhole,
    color: "#FFE994",
  },
  {
    title: "CCTV monitoring growth",
    text: "More facilities require trained CCTV operators and control room staff for active monitoring.",
    icon: Camera,
    color: "#CFF7BC",
  },
  {
    title: "Verified workforce need",
    text: "Employers prefer security staff with discipline, background readiness and professional conduct.",
    icon: Fingerprint,
    color: "#A6E6EC",
  },
  {
    title: "24/7 replacement support",
    text: "Security coverage needs fast replacement options to avoid missed shifts and site risk.",
    icon: Clock3,
    color: "#FFF6C8",
  },
];

const SecurityWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".security-stat-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".security-stat-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.07,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".security-stat-reveal", {
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
        <div className="security-stat-reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2">
            <BarChart3 size={16} />
            <span className="text-sm font-semibold text-black">
              Security Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Data", "behind", "reliable", "security", "coverage"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="security-stat-word inline-block">
                    {word}
                  </span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Practical workforce numbers across guarding, CCTV monitoring, access
            control, patrol coverage, events and site security recruitment.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(({ icon: Icon, ...item }) => (
            <article
              key={item.label}
              className="security-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
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
                  Security workforce support
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="security-stat-reveal mt-12 rounded-[36px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <ShieldCheck size={28} strokeWidth={2.4} />
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.05em] text-black sm:text-4xl">
                Workforce data for dependable site protection
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/70">
                Security staffing requires speed, verification, shift planning,
                replacement coverage and reliable deployment. Our recruitment
                support helps employers keep sites protected without staffing
                gaps.
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

        <div className="security-stat-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Security guards",
            "CCTV operators",
            "Access control",
            "Patrol officers",
            "Event security",
            "24/7 coverage",
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

export default SecurityWorkforceStatistics;
