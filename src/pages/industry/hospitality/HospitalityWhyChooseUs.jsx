import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Clock3,
  ConciergeBell,
  Languages,
  Sparkles,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Guest-focused candidates",
    text: "We focus on workers with service attitude, professionalism and guest-care mindset.",
    icon: ConciergeBell,
    color: "#FFE994",
  },
  {
    title: "Fast staffing support",
    text: "Employers receive suitable profiles quickly for urgent hospitality staffing needs.",
    icon: Clock3,
    color: "#CFF7BC",
  },
  {
    title: "Seasonal workforce support",
    text: "We help hotels, resorts and restaurants prepare for peak seasons and busy periods.",
    icon: UsersRound,
    color: "#A6E6EC",
  },
  {
    title: "Service-ready screening",
    text: "Candidates are checked for grooming, communication, discipline and service behavior.",
    icon: BadgeCheck,
    color: "#FFF6C8",
  },
  {
    title: "Multicultural talent pool",
    text: "We support employers needing staff for diverse guests and international operations.",
    icon: Languages,
    color: "#FFE994",
  },
  {
    title: "Consistent guest experience",
    text: "Our hiring approach helps maintain reliable service quality across every guest touchpoint.",
    icon: Sparkles,
    color: "#CFF7BC",
  },
];

const HospitalityWhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hosp-why-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".hosp-why-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
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
              "hospitality",
              "hiring",
              "for",
              "better",
              "service",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="hosp-why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us because we understand hospitality service
            pressure, guest expectations, seasonal demand and the need for
            professional staff.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="hosp-why-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
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
      </div>
    </section>
  );
};

export default HospitalityWhyChooseUs;
