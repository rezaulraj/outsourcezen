import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PathAnimation = () => {
  const sectionRef = useRef(null);
  const topFillRef = useRef(null);
  const bottomFillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([topFillRef.current, bottomFillRef.current], {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        })
        .to(topFillRef.current, {
          scaleX: 1,
          duration: 1.6,
          ease: "power3.out",
        })
        .to(
          bottomFillRef.current,
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1.1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-primary-bg)] py-2"
    >
      <svg
        className="h-[220px] w-full"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,35 C210,70 400,82 620,68 C820,55 980,38 1200,18 L1200,78 C940,105 720,126 500,126 C310,126 150,108 0,88 Z"
          fill="rgba(207,240,191,0.25)"
        />

        <path
          d="M0,132 C220,150 420,165 650,162 C850,160 1010,145 1200,125 L1200,180 C940,205 710,220 480,212 C300,205 130,190 0,176 Z"
          fill="rgba(169,229,234,0.25)"
        />

        <g ref={topFillRef}>
          <path
            d="M0,35 C210,70 400,82 620,68 C820,55 980,38 1200,18 L1200,78 C940,105 720,126 500,126 C310,126 150,108 0,88 Z"
            fill="#CFF0BF"
          />
        </g>

        <g ref={bottomFillRef}>
          <path
            d="M0,132 C220,150 420,165 650,162 C850,160 1010,145 1200,125 L1200,180 C940,205 710,220 480,212 C300,205 130,190 0,176 Z"
            fill="#A9E5EA"
          />
        </g>
      </svg>
    </section>
  );
};

export default PathAnimation;
