import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Clock,
  Factory,
  Globe2,
  Handshake,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    title: "Industry Expertise",
    desc: "We specialize in food processing recruitment with deep understanding of factory operations and production flow.",
    icon: Factory,
    color: "#FFE994",
  },
  {
    title: "Fast Hiring Support",
    desc: "Quick turnaround recruitment for urgent production needs and seasonal demand spikes.",
    icon: Zap,
    color: "#CFF7BC",
  },
  {
    title: "Skilled Workforce",
    desc: "We provide trained and semi-skilled workers for production, packaging, QA and warehouse roles.",
    icon: Users,
    color: "#A6E6EC",
  },
  {
    title: "Food Safety Focus",
    desc: "Candidates are screened for hygiene awareness, safety standards and compliance readiness.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Reliable Staffing",
    desc: "We reduce turnover by matching the right candidates with the right factory environment.",
    icon: Handshake,
    color: "#FFE1A6",
  },
  {
    title: "Global Reach",
    desc: "We support food factories across multiple countries with scalable workforce solutions.",
    icon: Globe2,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "3500+", label: "Workers Placed" },
  { value: "280+", label: "Factories Supported" },
  { value: "40+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

const WhyEmployersChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-why-word", {
        y: 60,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".food-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.07,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".food-why-reveal", {
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
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Trusted", "food", "processing", "recruitment", "partner"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="food-why-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="food-why-reveal mt-4 text-sm leading-6 text-black/70 max-w-xl mx-auto">
            We help food factories hire faster, reduce downtime, improve
            workforce stability and maintain production efficiency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="food-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={24} strokeWidth={2.3} />
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/70">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="food-why-reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[26px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        {/* CTA */}
        <div className="food-why-reveal mt-12 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <PackageCheck size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need reliable food factory workers?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We provide fast, safe and efficient recruitment for production
                  lines, packaging, QA, warehouse and management roles.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Hire Now
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="food-why-reveal mt-6 flex flex-wrap justify-center gap-3">
          {[
            "Fast hiring",
            "Skilled workers",
            "Food safety",
            "Factory staff",
            "Global support",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEmployersChooseUs;
