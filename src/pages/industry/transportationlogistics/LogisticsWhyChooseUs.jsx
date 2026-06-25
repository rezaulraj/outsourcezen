import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Clock3,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  UsersRound,
  Warehouse,
} from "lucide-react";

const benefits = [
  {
    title: "Fast staffing support",
    text: "We help logistics employers receive suitable worker profiles quickly for urgent route, warehouse and delivery needs.",
    icon: Clock3,
    color: "#FFE994",
  },
  {
    title: "Verified driver sourcing",
    text: "Driver candidates can be reviewed for experience, license suitability, reliability and route readiness.",
    icon: Truck,
    color: "#CFF7BC",
  },
  {
    title: "Warehouse-ready workers",
    text: "We support picking, packing, sorting, loading, forklift and warehouse shift coverage requirements.",
    icon: Warehouse,
    color: "#A6E6EC",
  },
  {
    title: "Reliable route coverage",
    text: "Our recruitment support helps reduce delivery delays, route gaps and last-minute workforce shortages.",
    icon: Route,
    color: "#FFF6C8",
  },
  {
    title: "Compliance awareness",
    text: "We understand documentation, safety expectations and operational standards for logistics workforce hiring.",
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "Scalable workforce supply",
    text: "Employers can scale workers for peak seasons, increased order volume and distribution center pressure.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const LogisticsWhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logi-why-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".logi-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".logi-why-strip", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center relative z-20">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Reliable",
              "logistics",
              "hiring",
              "for",
              "smooth",
              "movement",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="logi-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Logistics employers choose us because we understand route pressure,
            warehouse productivity, driver availability, shift coverage and
            supply chain continuity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="logi-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
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

        <div className="logi-why-strip mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <PackageCheck size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for fleet, warehouse and delivery operations
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  Whether you need drivers, loaders, pickers, packers,
                  dispatchers or supervisors, our process supports practical
                  logistics hiring from requirement to deployment.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Logistics Staff
              <BadgeCheck size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsWhyChooseUs;
