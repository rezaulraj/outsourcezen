import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Factory,
  Users,
  Clock,
  TrendingUp,
  Quote,
  MapPin,
  BadgeCheck,
  ArrowRight,
  Star,
} from "lucide-react";

const stories = [
  {
    company: "Frozen Food Manufacturer",
    location: "Germany",
    result: "180 workers deployed",
    time: "12 days hiring cycle",
    quote:
      "We were struggling with production delays. The recruitment support helped us stabilize our entire factory workforce quickly.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    company: "Beverage Production Plant",
    location: "Netherlands",
    result: "70 machine operators hired",
    time: "Fast turnaround staffing",
    quote:
      "Highly skilled operators were provided exactly when we needed them. Production never stopped again.",
    icon: TrendingUp,
    color: "#CFF7BC",
  },
  {
    company: "Dairy Processing Company",
    location: "Poland",
    result: "120 packaging staff",
    time: "Seasonal peak support",
    quote:
      "They helped us manage peak season demand without compromising hygiene or efficiency.",
    icon: Users,
    color: "#A6E6EC",
  },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "3500+", label: "Workers Placed" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support Available" },
];

const SuccessStories = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-succ-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-succ-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.07,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-succ-reveal", {
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
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Success Stories
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Real", "food", "factory", "hiring", "results"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="food-succ-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="food-succ-reveal mt-4 text-sm leading-6 text-black/70">
            Proven recruitment success across food manufacturing, packaging,
            beverage, dairy and frozen food industries.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {stories.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className="food-succ-card group rounded-[32px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-black">
                  {item.company}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-black/60">
                  <MapPin size={14} />
                  {item.location}
                </div>

                <div className="mt-4 space-y-2 text-sm font-semibold text-black/70">
                  <p>✔ {item.result}</p>
                  <p>⏱ {item.time}</p>
                </div>

                <div className="mt-5 rounded-2xl bg-black/[0.04] p-4">
                  <Quote size={18} className="mb-2 text-black/40" />
                  <p className="text-sm leading-6 text-black/70">
                    {item.quote}
                  </p>
                </div>

                <button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-black">
                  View Case
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>

        {/* Stats */}
        <div className="food-succ-reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.05em] text-black">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;
