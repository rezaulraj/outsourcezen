import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Building2,
  Factory,
  Hotel,
  HeartPulse,
  Sprout,
  Truck,
  Sparkles,
  Fuel,
  ShoppingCart,
  Wheat,
  Ship,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const areas = [
  {
    title: "Construction",
    text: "Skilled workers for building, infrastructure and site operations.",
    icon: Building2,
    color: "#FFE994",
  },
  {
    title: "Manufacturing",
    text: "Production, assembly, packaging and factory workforce support.",
    icon: Factory,
    color: "#CFF7BC",
  },
  {
    title: "Hospitality",
    text: "Hotel, restaurant, housekeeping and guest-service professionals.",
    icon: Hotel,
    color: "#A6E6EC",
  },
  {
    title: "Healthcare",
    text: "Nurses, caregivers, allied health and medical support staff.",
    icon: HeartPulse,
    color: "#FFF6C8",
  },
  {
    title: "Agriculture & Farming",
    text: "Seasonal farm workers, greenhouse, livestock and harvest support.",
    icon: Sprout,
    color: "#FFE994",
  },
  {
    title: "Transportation & Logistics",
    text: "Drivers, warehouse workers, dispatch and supply chain support.",
    icon: Truck,
    color: "#CFF7BC",
  },
  {
    title: "Cleaning & Facility Management",
    text: "Cleaners, maintenance teams and facility support staff.",
    icon: Sparkles,
    color: "#A6E6EC",
  },
  {
    title: "Oil, Gas & Energy",
    text: "Technical, site, maintenance and energy-sector workforce support.",
    icon: Fuel,
    color: "#FFF6C8",
  },
  {
    title: "Retail & Supermarkets",
    text: "Cashiers, shelf stockers, store helpers and customer support staff.",
    icon: ShoppingCart,
    color: "#FFE994",
  },
  {
    title: "Food Processing",
    text: "Food production, packing, hygiene and quality support workers.",
    icon: Wheat,
    color: "#CFF7BC",
  },
  {
    title: "Shipbuilding & Marine",
    text: "Marine trades, shipyard workers and technical support roles.",
    icon: Ship,
    color: "#A6E6EC",
  },
  //   {
  //     title: "Security Services",
  //     text: "Security guards, site protection and monitoring support staff.",
  //     icon: ShieldCheck,
  //     color: "#FFF6C8",
  //   },
  {
    title: "Skilled Trades",
    text: "Electricians, welders, plumbers, mechanics and technical workers.",
    icon: Wrench,
    color: "#FFE994",
  },
];

const RecruitmentSupportAreas = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".support-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".support-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.055,
        delay: 0.25,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative bg-[#FFF9E6] py-20 lg:py-28"
    >
      <div className="absolute left-0 top-0 h-24 w-full bg-[#FBD6D2] [clip-path:ellipse(75%_45%_at_60%_0%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Recruitment Support Areas
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Workforce", "support", "across", "key", "industries"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="support-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We support employers across multiple sectors with dependable
            recruitment, screening and workforce deployment solutions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="support-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
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
      </div>
    </section>
  );
};

export default RecruitmentSupportAreas;
