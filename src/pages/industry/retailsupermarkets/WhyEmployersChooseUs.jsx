import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Clock3,
  CreditCard,
  Globe2,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Retail hiring experience",
    text: "We understand daily store operations, checkout pressure, shelf coverage, stockroom needs and customer service roles.",
    icon: Store,
    color: "#FFE994",
  },
  {
    title: "Fast shortlisting",
    text: "We support quick candidate shortlisting for urgent store gaps, seasonal rush and new store openings.",
    icon: Clock3,
    color: "#CFF7BC",
  },
  {
    title: "Reliable store staff",
    text: "We help employers find dependable workers for cashiers, shelves, stockroom, warehouse and delivery support.",
    icon: UsersRound,
    color: "#A6E6EC",
  },
  {
    title: "Full role coverage",
    text: "From front-store staff to supervisors, fresh food teams, security and delivery workers, we cover key retail roles.",
    icon: Boxes,
    color: "#FFF6C8",
  },
  {
    title: "Flexible staffing support",
    text: "We support permanent, temporary, seasonal, weekend and shift-based retail workforce needs.",
    icon: AlarmClock,
    color: "#FFE994",
  },
  {
    title: "Multi-location hiring",
    text: "We can support retail hiring across multiple stores, locations, branches and operational requirements.",
    icon: Globe2,
    color: "#CFF7BC",
  },
];

const proofStats = [
  { value: "1500+", label: "Retail Professionals" },
  { value: "200+", label: "Stores Supported" },
  { value: "25+", label: "Countries Covered" },
  { value: "98%", label: "Client Satisfaction" },
];

const WhyEmployersChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".retail-why-word", {
        y: 50,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".retail-why-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".retail-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".retail-why-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="retail-why-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Trusted",
              "retail",
              "recruitment",
              "for",
              "busy",
              "store",
              "teams",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="retail-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us because we help them fill retail staffing gaps
            quickly with dependable workers for daily operations, customer
            service and store support.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="retail-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={24} strokeWidth={2.4} />
              </div>

              <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map((item) => (
            <article
              key={item.label}
              className="retail-why-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div> */}

        <div className="retail-why-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <ShoppingCart size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for fast-moving retail workforce needs
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support supermarkets, retail chains and store operators
                  with front-store hiring, shelf replenishment, checkout
                  coverage, warehouse support, delivery staffing and shift-based
                  workforce needs.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Retail Staff
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* <div className="retail-why-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Fast shortlisting",
            "Reliable workers",
            "Seasonal hiring",
            "Shift coverage",
            "Store support",
            "Multi-location hiring",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {item}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default WhyEmployersChooseUs;
