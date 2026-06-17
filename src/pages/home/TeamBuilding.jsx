import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedBookButton = () => {
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 320;
    const h = 140;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawArrow = (x, y, angle, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-8, -10, 8, -4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, -4);
      ctx.lineTo(0, -13);
      ctx.moveTo(8, -4);
      ctx.lineTo(0, 6);
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      time += 0.02;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.09;

      const clickPulse = hoverRef.current
        ? 1 + Math.sin(time * 12) * 0.08
        : 1 + Math.sin(time * 2) * 0.03;

      const arrows = [
        {
          from: [50, 35, 0.15],
          to: [110, 55, 0.45],
        },
        {
          from: [270, 35, Math.PI - 0.15],
          to: [210, 55, Math.PI - 0.45],
        },
        {
          from: [70, 105, -0.45],
          to: [112, 85, -0.15],
        },
        {
          from: [250, 105, Math.PI + 0.45],
          to: [208, 85, Math.PI + 0.15],
        },
      ];

      arrows.forEach((item, i) => {
        const wave = Math.sin(time * 2 + i) * (1 - hover) * 6;
        const x = lerp(item.from[0], item.to[0], hover);
        const y = lerp(item.from[1], item.to[1], hover) + wave;
        const angle = lerp(item.from[2], item.to[2], hover);

        drawArrow(x, y, angle, clickPulse);
      });

      const dots = [
        {
          from: [42, 78],
          to: [120, 70],
        },
        {
          from: [118, 18],
          to: [145, 48],
        },
        {
          from: [278, 78],
          to: [200, 70],
        },
        {
          from: [180, 118],
          to: [170, 92],
        },
      ];

      dots.forEach((item, i) => {
        const x = lerp(item.from[0], item.to[0], hover);
        const y =
          lerp(item.from[1], item.to[1], hover) +
          Math.sin(time * 2.5 + i) * (1 - hover) * 4;

        drawDot(x, y, 4 + hover * 1.5);
      });

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative mx-auto mt-12 flex h-[140px] w-[320px] items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />

      <a
        href="/contact"
        className="group relative z-10 inline-flex overflow-hidden rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition-all duration-500 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 w-0 bg-yellow-400 transition-all duration-700 ease-out group-hover:w-full" />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
          Build your Team
        </span>
      </a>
    </div>
  );
};

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

      gsap.from(".why-reveal", {
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

        <div className="why-reveal">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

export default TeamBuilding;
