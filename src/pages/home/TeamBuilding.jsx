import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TeamBuilding = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-word", {
        y: 80,
        opacity: 0,
        rotateX: 75,
        duration: 1,
        stagger: 0.045,
        ease: "power4.out",
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".team-btn", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = [
    "OutsourceZen",
    "connects",
    "employers",
    "with",
    "skilled",
    "workforce",
    "solutions",
    "built",
    "for",
    "scale",
    "&",
    "business",
    "growth.",
  ];

  return (
    <section
      ref={sectionRef}
      className="font-arimo bg-[var(--color-primary-bg)] px-4 py-20 text-center lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-5xl font-normal leading-[1.05] tracking-[-0.020em] text-black/90 sm:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <span className="team-word inline-block px-1">{word}</span>
            </span>
          ))}
        </h2>

        <svg
          ref={lineRef}
          className="mx-auto mt-4 h-6 w-[520px] max-w-full"
          viewBox="0 0 520 28"
          fill="none"
        >
          <path
            d="M12 18C90 4 164 13 239 15C326 18 405 8 508 14"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <a
          href="/contact"
          className="team-btn group relative mt-6 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
        >
          <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full"></span>
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            Build your Team
          </span>
        </a>
      </div>
    </section>
  );
};

export default TeamBuilding;
