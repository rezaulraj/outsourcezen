import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Clock3,
  Globe2,
  HeartPulse,
  ShieldCheck,
  Smile,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "Healthcare Professionals Deployed",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: 98,
    suffix: "%",
    label: "Employer Satisfaction",
    icon: Smile,
    color: "#CFF7BC",
  },
  {
    value: 25,
    suffix: "+",
    label: "Countries Served",
    icon: Globe2,
    color: "#A6E6EC",
  },
  {
    value: 48,
    suffix: " Hours",
    label: "Initial Shortlisting",
    icon: Clock3,
    color: "#FFF6C8",
  },
];

const HealthcareWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-stat-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".health-stat-card", {
        y: 40,
        opacity: 1,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "back.out(1.5)",
      });

      gsap.from(".health-pulse", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1,0.6)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] py-20 lg:py-28"
    >
      <div className="absolute left-0 top-0 h-24 w-full bg-[#FBD6D2] [clip-path:ellipse(75%_45%_at_60%_0%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="health-pulse mb-5 inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#FFF9E6] px-5 py-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#CFF7BC]">
              <HeartPulse size={18} strokeWidth={2.4} />

              <span className="absolute inset-0 animate-ping rounded-full bg-[#67D946]/30" />
            </div>

            <span className="text-sm font-semibold text-black">
              Healthcare Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "behind", "trusted", "patient", "care"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="health-stat-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/70">
            Reliable healthcare recruitment built on speed, compliance,
            credential awareness and patient-centered staffing support.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatisticCard key={item.label} item={item} />
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
    <article className="health-stat-card group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/20">
      {/* Top Accent */}
      <div
        className="absolute left-0 top-0 h-1.5 w-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{
          backgroundColor: item.color,
          transformOrigin: "left",
        }}
      />

      {/* Icon */}
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: item.color,
        }}
      >
        <Icon size={28} strokeWidth={2.4} />
      </div>

      {/* Number */}
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

      {/* Bottom Indicator */}
      <div className="mt-7 flex items-center gap-2">
        <ShieldCheck
          size={16}
          className="text-black/40 transition-all duration-300 group-hover:text-black"
        />

        <span className="text-xs font-medium text-black/50 transition-all duration-300 group-hover:text-black/70">
          Trusted Healthcare Support
        </span>
      </div>
    </article>
  );
};

export default HealthcareWorkforceStatistics;
