import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlarmClock,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";

const benefits = [
  {
    title: "Reliable shift coverage",
    text: "We help employers cover day, night, weekend and urgent facility shifts with dependable workers.",
    icon: AlarmClock,
    color: "#FFE994",
  },
  {
    title: "Screened cleaning staff",
    text: "Candidates are reviewed for attendance discipline, hygiene awareness and practical cleaning readiness.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
  {
    title: "Multi-site support",
    text: "We support offices, commercial buildings, hotels, public areas and multiple facility locations.",
    icon: Building2,
    color: "#A6E6EC",
  },
  {
    title: "Quality-focused service",
    text: "Our recruitment process supports checklist routines, cleaning standards and consistent service quality.",
    icon: ClipboardCheck,
    color: "#FFF6C8",
  },
  {
    title: "Safety awareness",
    text: "Workers are matched with workplace hygiene, safety expectations and facility procedures in mind.",
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "Facility-ready support",
    text: "From cleaners to maintenance helpers, we help keep buildings operational, safe and presentable.",
    icon: Wrench,
    color: "#CFF7BC",
  },
];

const CleaningFacilityWhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".clean-why-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".clean-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".clean-why-strip", {
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
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Reliable",
              "facility",
              "staffing",
              "for",
              "cleaner",
              "operations",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="clean-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us because we understand cleaning schedules,
            facility safety, shift coverage, hygiene standards and reliable
            workforce support.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="clean-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
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

        <div className="clean-why-strip mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <Sparkles size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Built for offices, buildings and high-traffic facilities
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  Whether you need cleaners, janitors, housekeeping teams,
                  facility assistants, maintenance helpers or supervisors, our
                  process supports practical staffing from requirement to
                  deployment.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Facility Staff
              <BadgeCheck size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningFacilityWhyChooseUs;
