import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Clock3, Globe2, Hotel, Smile, UsersRound } from "lucide-react";

const stats = [
  {
    value: 6000,
    suffix: "+",
    label: "Hospitality Professionals",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: 97,
    suffix: "%",
    label: "Employer Satisfaction",
    icon: Smile,
    color: "#CFF7BC",
  },
  {
    value: 20,
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

const HospitalityWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hosp-stat-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".hosp-stat-card", {
        y: 40,
        opacity: 1,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.25,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2">
            <Hotel size={16} />
            <span className="text-sm font-medium text-black">
              Hospitality Workforce Statistics
            </span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "behind", "exceptional", "service"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="hosp-stat-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Proven hospitality recruitment performance built on speed,
            reliability and guest-focused hiring.
          </p>
        </div>

        {/* Statistics */}
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
    const obj = { val: 0 };

    gsap.to(obj, {
      val: item.value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (!valueRef.current) return;

        valueRef.current.textContent =
          Math.floor(obj.val).toLocaleString() + item.suffix;
      },
    });
  }, [item]);

  return (
    <article className="hosp-stat-card group overflow-hidden rounded-[32px] border border-black/10 bg-[#FFF9E6] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-black/20">
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

      <div
        className="mt-6 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: item.color }}
      />
    </article>
  );
};

export default HospitalityWorkforceStatistics;
