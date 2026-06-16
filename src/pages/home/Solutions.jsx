import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const solutionItems = [
  {
    title: "Workforce Sourcing",
    desc: "Find reliable skilled workers from trusted recruitment networks.",
    color: "#18B8C7",
    icon: "waves",
  },
  {
    title: "Overseas Recruitment",
    desc: "Connect employers with qualified international workforce.",
    color: "#FF8A76",
    icon: "globe",
  },
  {
    title: "Executive Search",
    desc: "Hire leadership talent for senior and specialist roles.",
    color: "#9B5CFF",
    icon: "target",
  },
  {
    title: "Bulk Hiring",
    desc: "Scale your workforce quickly for large project requirements.",
    color: "#75D65A",
    icon: "grid",
  },
  {
    title: "Candidate Screening",
    desc: "Shortlist, verify and prepare candidates before employer review.",
    color: "#F5C637",
    icon: "check",
  },
  {
    title: "Trade Testing & Assessment",
    desc: "Assess skills through practical trade testing and evaluation.",
    color: "#6ED1C7",
    icon: "rings",
  },
  {
    title: "Visa & Documentation Support",
    desc: "Support visa, documents and compliance before deployment.",
    color: "#F58E3D",
    icon: "doc",
  },
//   {
//     title: "Pre-Departure Training",
//     desc: "Prepare workers with orientation, safety and job-readiness training.",
//     color: "#B984FF",
//     icon: "steps",
//   },
  {
    title: "Relocation & Onboarding",
    desc: "Smooth relocation, arrival support and workforce onboarding.",
    color: "#8FCE96",
    icon: "route",
  },
];

const Solutions = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solution-heading", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".solution-card", {
        y: 55,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.15,
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
        <div className="solution-heading mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-normal tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
            + More Growth, Less Risk
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-black/75">
            Smart workforce solutions designed to help employers hire faster,
            reduce risk and scale with confidence.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {solutionItems.map((item, index) => (
            <SolutionCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ item }) => {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;
    let hoverProgress = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = 150;
      h = 150;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawRing = (x, y, r, start, progress, color, width = 8) => {
      ctx.beginPath();
      ctx.arc(x, y, r, start, start + Math.PI * 2 * progress);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawIcon = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      hoverProgress += ((hoverRef.current ? 1 : 0) - hoverProgress) * 0.08;

      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      drawRing(0, 0, 58, -Math.PI / 2, 0.999, `${item.color}26`, 8);

      drawRing(
        0,
        0,
        58,
        -Math.PI / 2 + time,
        0.18 + hoverProgress * 0.78,
        item.color,
        9,
      );

    //   drawRing(
    //     0,
    //     0,
    //     42,
    //     Math.PI / 2 - time * 0.8,
    //     0.12 + hoverProgress * 0.58,
    //     `${item.color}90`,
    //     6,
    //   );

      ctx.strokeStyle = item.color;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (item.icon === "waves") {
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(-18, 10, 20 + i * 11, -1.7, 0.45);
          ctx.strokeStyle =
            i === 0 ? item.color : `${item.color}${70 + i * 25}`;
          ctx.stroke();
        }
      }

      if (item.icon === "globe") {
        drawRing(0, 0, 28, 0, 0.999, item.color, 7);
        drawRing(0, 0, 42, -time, 0.72, `${item.color}aa`, 6);
        ctx.beginPath();
        ctx.moveTo(-32, 0);
        ctx.lineTo(32, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 30, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (item.icon === "target") {
        drawRing(0, 0, 34, time, 0.82, item.color, 8);
        drawRing(0, 0, 20, -time, 0.82, `${item.color}aa`, 8);
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(8, 0);
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 8);
        ctx.stroke();
      }

      if (item.icon === "grid") {
        const gap = 28;
        [-1, 1].forEach((x) => {
          [-1, 1].forEach((y) => {
            drawRing(
              (x * gap) / 2,
              (y * gap) / 2,
              16,
              time,
              0.86,
              item.color,
              7,
            );
          });
        });
      }

      if (item.icon === "check") {
        drawRing(0, 0, 36, -Math.PI / 2, 0.9, `${item.color}aa`, 8);
        ctx.beginPath();
        ctx.moveTo(-24, 2);
        ctx.lineTo(-8, 18);
        ctx.lineTo(28, -20);
        ctx.stroke();
      }

      if (item.icon === "rings") {
        drawRing(-14, 0, 25, time, 0.78, item.color, 8);
        drawRing(16, 0, 25, -time, 0.78, `${item.color}aa`, 8);
      }

      if (item.icon === "doc") {
        ctx.beginPath();
        ctx.roundRect(-28, -36, 56, 72, 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-14, -14);
        ctx.lineTo(14, -14);
        ctx.moveTo(-14, 4);
        ctx.lineTo(18, 4);
        ctx.moveTo(-14, 22);
        ctx.lineTo(8, 22);
        ctx.stroke();
      }

      if (item.icon === "steps") {
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.roundRect(-34 + i * 22, 24 - i * 16, 18, 12, 5);
          ctx.stroke();
        }
        drawRing(12, -26, 20, time, 0.8, item.color, 7);
      }

      if (item.icon === "route") {
        ctx.beginPath();
        ctx.moveTo(-34, 22);
        ctx.bezierCurveTo(-10, -28, 18, 34, 36, -22);
        ctx.stroke();

        drawRing(-34, 22, 8, 0, 0.999, item.color, 6);
        drawRing(36, -22, 8, 0, 0.999, item.color, 6);
      }

      ctx.restore();

      frame = requestAnimationFrame(drawIcon);
    };

    resize();
    drawIcon();

    return () => cancelAnimationFrame(frame);
  }, [item]);

  const handleEnter = () => {
    hoverRef.current = true;

    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.015,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    hoverRef.current = false;

    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="solution-card group relative min-h-[390px] overflow-visible rounded-[28px] border bg-[var(--color-primary-bg)] p-7 text-center transition-colors duration-500"
      style={{ borderColor: `${item.color}70` }}
    >
      <div
        className="pointer-events-none absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border-[5px] border-dashed opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-2"
        style={{ borderColor: item.color }}
      />

      <div className="mx-auto mb-5 flex h-36 w-36 items-center justify-center">
        <canvas ref={canvasRef} />
      </div>

      <h3 className="text-xl font-bold tracking-[-0.02em] text-black">
        {item.title}
      </h3>

      <p className="mx-auto mt-5 max-w-[260px] text-sm leading-6 text-black/70">
        {item.desc}
      </p>

      <a
        href="/solutions"
        className="group/btn relative mt-8 inline-flex overflow-hidden rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
      >
        <span
          className="absolute inset-0 w-0 transition-all duration-700 ease-out group-hover/btn:w-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-black">
          Learn More
        </span>
      </a>
    </div>
  );
};

export default Solutions;
