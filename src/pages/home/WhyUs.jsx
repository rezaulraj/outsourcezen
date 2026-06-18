import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const faqItems = [
  {
    title: "1. Share your workforce requirement",
    text: "Tell us the role, number of workers, location, salary range, skills, timeline and documentation needs.",
  },
  {
    title: "2. We source and shortlist candidates",
    text: "Our team searches, filters and prepares suitable candidates from trusted recruitment channels.",
  },
  {
    title: "3. Screening and trade assessment",
    text: "Candidates are checked through interviews, document review and skill-based trade testing.",
  },
  {
    title: "4. Visa, documentation and onboarding",
    text: "We support visa files, documents, orientation and deployment preparation.",
  },
  {
    title: "5. Deployment and ongoing support",
    text: "Your selected workforce is deployed with coordination and post-placement support.",
  },
];

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
          Book a Meeting
        </span>
      </a>
    </div>
  );
};

const WhyUs = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-word", {
        y: 55,
        opacity: 0,
        rotateX: 65,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".why-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".why-line", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;
    let shapeProgress = 0;
    let lastActive = activeRef.current;

    // Dot-matrix glyphs for "1".."5" on a 7-row x 5-column grid.
    // Each entry is [row, col]. This grid is taller (7 rows) so digits
    // like 2, 3, 5 read clearly instead of looking like scattered dots.
    const numberShapes = {
      // "1"
      0: [
        [0, 2],
        [1, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 1],
        [6, 2],
        [6, 3],
      ],
      // "2"
      1: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 4],
        [2, 4],
        [3, 3],
        [4, 2],
        [5, 1],
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
      ],
      // "3"
      2: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 4],
        [2, 4],
        [3, 2],
        [3, 3],
        [4, 4],
        [5, 4],
        [6, 0],
        [6, 1],
        [6, 2],
        [6, 3],
      ],
      // "4"
      3: [
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [3, 0],
        [3, 3],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [5, 3],
        [6, 3],
      ],
      // "5"
      4: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
        [4, 3],
        [5, 0],
        [5, 3],
        [6, 1],
        [6, 2],
      ],
    };

    const GRID_ROWS = 7;
    const GRID_COLS = 5;

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;

      w = parent.offsetWidth;
      h = parent.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawRing = (x, y, r, color, progress, start, width = 7) => {
      if (progress <= 0) return;
      ctx.beginPath();
      ctx.arc(x, y, r, start, start + Math.PI * 2 * progress);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawNumberLabel = (num, cx, cy) => {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#FFCC00";
      ctx.font = "900 260px Arimo, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, cx, cy);
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      if (lastActive !== activeRef.current) {
        shapeProgress = 0;
        lastActive = activeRef.current;
      }

      shapeProgress += (1 - shapeProgress) * 0.035;

      const cx = w / 2;
      const cy = h / 2;

      // Cell radius/spacing derived from available height so the full
      // 7-row grid always fits comfortably inside the canvas.
      const r = Math.min(w / (GRID_COLS + 2), h / (GRID_ROWS + 2)) * 0.62;
      const gap = r * 2.1;

      const gridW = (GRID_COLS - 1) * gap;
      const gridH = (GRID_ROWS - 1) * gap;

      const startX = cx - gridW / 2;
      const startY = cy - gridH / 2;

      const activeShape = numberShapes[activeRef.current] || [];
      const activeSet = new Set(
        activeShape.map(([row, col]) => `${row}-${col}`),
      );

      drawNumberLabel(activeRef.current + 1, cx, cy);

      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const x = startX + col * gap;
          const y = startY + row * gap;

          // Faint background dot grid
          drawRing(x, y, r, "rgba(241,224,174,0.55)", 0.999, 0, 5);

          const isActive = activeSet.has(`${row}-${col}`);

          if (isActive) {
            const indexDelay = (row + col) * 0.045;
            const localProgress = Math.max(
              0,
              Math.min(1, (shapeProgress - indexDelay) / (1 - indexDelay)),
            );

            const ringFill = 0.15 + localProgress * 0.85;

            drawRing(
              x,
              y,
              r,
              "#FFCC00",
              ringFill,
              -Math.PI / 2 + time + row * 0.2,
              8,
            );

            drawRing(
              x,
              y,
              r * 0.72,
              "rgba(255,204,0,0.35)",
              localProgress * 0.75,
              Math.PI / 2 - time,
              4,
            );
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[#FFF9E6] py-24 lg:py-32 "
    >
      <div className="absolute left-0 top-0 h-24 w-full bg-[#FBD6D2] [clip-path:ellipse(75%_45%_at_60%_0%)]" />

      {/* <div className="absolute -bottom-0 left-0 h-28 w-full bg-gradient-to-r from-[#BCE7F8] via-[#E9B7EF] to-[#A8ED8B] [clip-path:ellipse(85%_42%_at_40%_100%)]" /> */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-normal tracking-[-0.04em] text-black sm:text-5xl">
            {["Launch", "in", "5", "easy", "steps"].map((word, index) => (
              <span key={index} className="inline-block overflow-hidden px-1">
                <span className="why-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="why-line mx-auto mt-2 h-5 w-[260px]"
            viewBox="0 0 260 24"
            fill="none"
          >
            <path
              d="M12 13C55 3 96 8 130 12C174 17 212 12 248 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="why-reveal mx-auto mt-3 max-w-md text-sm leading-6 text-black/70">
            OutsourceZen sources, screens and prepares your workforce in a
            simple step-by-step recruitment process.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="why-reveal space-y-3">
            {faqItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-full rounded-xl border p-5 text-left transition-all duration-500 hover:-translate-y-1 ${
                  active === index
                    ? "border-[#FFCC00] bg-[#FFE994] shadow-[0_18px_35px_rgba(0,0,0,0.08)]"
                    : "border-black/10 bg-white/70 hover:bg-[#FFF8DD]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-black">{item.title}</h3>

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {active === index ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === index
                      ? "mt-3 max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-6 text-black/70">{item.text}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="why-reveal relative h-[360px] sm:h-[430px] lg:h-[500px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="why-reveal">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
