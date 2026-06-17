import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SurgeProtect = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".surge-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".surge-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.to(".shield-bolt", {
        y: -8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    "Urgent Workforce Demand",
    "Large Project Hiring",
    "Seasonal Manpower",
    "Factory Scale-Up",
    "Construction Mobilization",
    "Overseas Deployment",
    "Replacement Support",
    "Rapid Candidate Screening",
  ];

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[#FFF9E6]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#AEE8EE] via-[#E7B8EF] to-[#9BEA70]" />

      <div className="absolute left-0 -top-10 h-38 w-full bg-[var(--color-primary-bg)] [clip-path:ellipse(70%_45%_at_50%_0%)]" />

      <div className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="container mx-auto">
          <div className="surge-reveal mx-auto mb-14 flex max-w-3xl items-center justify-center gap-5 text-center">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                <path
                  d="M25 15H95C97 60 82 94 60 108C38 94 23 60 25 15Z"
                  fill="none"
                  stroke="black"
                  strokeWidth="7"
                  strokeLinejoin="round"
                />
                <path
                  className="shield-bolt"
                  d="M65 27L45 62H60L51 91L77 52H61L65 27Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="text-left">
              <h2 className="text-5xl font-bold tracking-[-0.05em] text-black sm:text-6xl">
                {["Surge", "Workforce"].map((word, index) => (
                  <span key={index} className="inline-block overflow-hidden">
                    <span className="surge-word inline-block">{word}</span>
                  </span>
                ))}
              </h2>
              <p className="mt-2 text-3xl tracking-[-0.04em] text-black sm:text-4xl">
                Scale Hiring Without Limits
              </p>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="surge-reveal max-w-md">
              <p className="text-xl leading-8 text-black">
                From urgent manpower needs to large project mobilization, we
                help your business access qualified workers quickly, reduce
                hiring pressure, and scale operations with confidence.
              </p>

              <a
                href="/contact"
                className="group relative mt-8 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
              >
                <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                  Speak to an expert
                </span>
              </a>
            </div>

            <div className="surge-reveal rounded border border-black/30 bg-[var(--color-primary-bg)] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
              <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-3 text-lg text-black"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black transition-all duration-300 group-hover:scale-[1.8] group-hover:bg-yellow-400" />
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurgeProtect;
