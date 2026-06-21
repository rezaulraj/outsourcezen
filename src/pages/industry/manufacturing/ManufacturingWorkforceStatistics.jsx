import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Clock3, Globe2, Smile, UsersRound } from "lucide-react";

const stats = [
  {
    value: "8000+",
    label: "Workers Deployed",
    icon: UsersRound,
    color: "#FFE994",
  },
  {
    value: "96%",
    label: "Employer Satisfaction",
    icon: Smile,
    color: "#CFF7BC",
  },
  {
    value: "25+",
    label: "Countries Served",
    icon: Globe2,
    color: "#A6E6EC",
  },
  {
    value: "48 Hours",
    label: "Initial Shortlisting",
    icon: Clock3,
    color: "#FFF6C8",
  },
];

const ManufacturingWorkforceStatistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mfg-stat-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".mfg-stat-card", {
        y: 45,
        opacity: 0,
        scale: 0.94,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.3,
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
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Manufacturing Workforce Statistics
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Numbers", "that", "support", "production"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="mfg-stat-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, ...item }) => (
            <article
              key={item.label}
              className="mfg-stat-card rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={26} strokeWidth={2.4} />
              </div>

              <h3 className="text-5xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </h3>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-black/55">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingWorkforceStatistics;
