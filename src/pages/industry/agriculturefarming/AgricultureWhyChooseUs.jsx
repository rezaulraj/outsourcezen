import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Clock3,
  Home,
  Leaf,
  MapPin,
  Sprout,
  Tractor,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Seasonal expertise",
    text: "We understand peak harvest periods, planting windows and urgent agricultural workforce demand.",
    icon: Sprout,
    color: "#FFE994",
  },
  {
    title: "Fast deployment",
    text: "Employers receive suitable farm worker profiles quickly for time-sensitive operations.",
    icon: Clock3,
    color: "#CFF7BC",
  },
  {
    title: "Reliable workforce",
    text: "Candidates are checked for discipline, availability and readiness for practical farm work.",
    icon: UsersRound,
    color: "#A6E6EC",
  },
  {
    title: "Rural coordination",
    text: "We support farms that need workers in remote or rural agricultural locations.",
    icon: MapPin,
    color: "#FFF6C8",
  },
  {
    title: "Accommodation awareness",
    text: "We help employers plan workforce needs around housing, arrival and seasonal logistics.",
    icon: Home,
    color: "#FFE994",
  },
  {
    title: "Productivity focus",
    text: "Our recruitment approach helps farms maintain output during busy agricultural cycles.",
    icon: TrendingUp,
    color: "#CFF7BC",
  },
];

const AgricultureWhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".agri-why-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".agri-why-card", {
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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-20 lg:py-28"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Reliable", "farm", "hiring", "for", "seasonal", "success"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="agri-why-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Farms choose us because we understand seasonal pressure, rural
            deployment, reliable worker supply and productivity-focused
            agricultural hiring.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="agri-why-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6"
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

export default AgricultureWhyChooseUs;
