import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Building2, Factory, Home, Landmark, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Residential Projects",
    text: "Reliable workers for apartment buildings, housing compounds and villa construction.",
    workers: "850+",
    role: "Masons, carpenters, helpers",
    icon: Home,
    color: "#FFE994",
  },
  {
    title: "Commercial Towers",
    text: "Skilled teams for high-rise buildings, offices, malls and mixed-use developments.",
    workers: "1200+",
    role: "Steel fixers, electricians, plumbers",
    icon: Building2,
    color: "#CFF7BC",
  },
  {
    title: "Industrial Facilities",
    text: "Technical manpower for factories, warehouses, plants and production facilities.",
    workers: "960+",
    role: "Welders, HVAC, equipment operators",
    icon: Factory,
    color: "#A6E6EC",
  },
  {
    title: "Infrastructure Developments",
    text: "Project-ready teams for roads, bridges, utilities and public infrastructure works.",
    workers: "1500+",
    role: "Operators, supervisors, skilled trades",
    icon: Landmark,
    color: "#FFF6C8",
  },
];

const ConstructionProjects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".project-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.3,
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
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
              Success Stories / Projects
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {["Construction", "teams", "for", "real", "projects"].map(
                (word) => (
                  <span
                    key={word}
                    className="inline-block overflow-hidden px-1"
                  >
                    <span className="project-word inline-block">{word}</span>
                  </span>
                ),
              )}
            </h2>
          </div>

          <p className="project-card max-w-xl text-base leading-7 text-black/70 lg:pb-2">
            We support employers across different construction project types —
            from residential sites to industrial and infrastructure
            developments.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map(({ icon: Icon, ...item }, index) => (
            <article
              key={item.title}
              className="project-card group relative overflow-hidden rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-500 hover:-translate-y-2"
            >
              <span className="absolute -right-4 -top-7 text-[110px] font-black leading-none text-black/[0.04]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={28} strokeWidth={2.4} />
                </div>

                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/70">
                  {item.text}
                </p>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                    {item.workers}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                    Workers supported
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-white/55 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/45">
                    Common roles
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-black">
                    {item.role}
                  </p>
                </div>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-black"
                >
                  Discuss similar project
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#67D946] transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionProjects;
