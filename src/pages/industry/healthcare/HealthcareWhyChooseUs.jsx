import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardCheck,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const benefits = [
  {
    title: "Patient-centered hiring",
    text: "We focus on professionals who understand empathy, responsibility and safe patient care.",
    icon: HeartPulse,
    color: "#FFE994",
  },
  {
    title: "Credential-focused screening",
    text: "Licenses, certificates, work history and role experience are reviewed with care.",
    icon: ClipboardCheck,
    color: "#CFF7BC",
  },
  {
    title: "Qualified clinical support",
    text: "We help employers find nurses, caregivers, allied health and medical support staff.",
    icon: Stethoscope,
    color: "#A6E6EC",
  },
  {
    title: "Compliance awareness",
    text: "Our recruitment approach supports healthcare standards, ethics and workplace safety.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Compassionate professionals",
    text: "Candidates are considered for communication, discipline and care-oriented attitude.",
    icon: HeartHandshake,
    color: "#FFE994",
  },
  {
    title: "Reliable workforce support",
    text: "We support urgent staffing, shift coverage and long-term healthcare workforce needs.",
    icon: BadgeCheck,
    color: "#CFF7BC",
  },
];

const HealthcareWhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".health-why-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".health-why-card", {
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
            Why Healthcare Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Trusted", "healthcare", "hiring", "for", "better", "care"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="health-why-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Healthcare employers choose us because we understand patient safety,
            credential review, care continuity and the importance of dependable
            professionals.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="health-why-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
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

export default HealthcareWhyChooseUs;
