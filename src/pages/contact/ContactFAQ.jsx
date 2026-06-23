import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How quickly can workers be sourced?",
    answer:
      "Initial shortlisting can usually begin within a few days, depending on the role, industry, country, worker quantity and documentation requirements.",
  },
  {
    question: "Which industries do you support?",
    answer:
      "We support construction, manufacturing, hospitality, healthcare, agriculture, logistics, cleaning, food processing, retail, security, oil and gas, marine and skilled trades.",
  },
  {
    question: "Can you handle bulk hiring?",
    answer:
      "Yes. We can support bulk recruitment for employers who need multiple workers for seasonal demand, factory operations, construction projects or service-based workforce needs.",
  },
  {
    question: "Do you provide visa and documentation support?",
    answer:
      "Yes. We can assist with documentation coordination, candidate file preparation and visa-related support depending on the employer’s recruitment requirements.",
  },
  {
    question: "Can employers contact a specific office?",
    answer:
      "Yes. Employers can contact our team through the contact form or email us directly at talk@outsourcezen.com. We will guide the inquiry to the right team.",
  },
  {
    question: "Do you recruit internationally?",
    answer:
      "Yes. Our office network supports employers and workforce solutions across multiple regions including the UK, Bangladesh, Romania and Portugal.",
  },
];

const ContactFAQ = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Entrance animations for typography
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-word", {
        y: 45,
        opacity: 0,
        rotateX: 55,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".faq-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dot-matrix canvas controller loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w;
    let h;
    let frame;
    let time = 0;
    let shapeProgress = 0;
    let lastActive = activeRef.current;

    // Grid coordinates for numbers 1 to 6 on a 7-row x 5-column space
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
        [5, 3],
        [6, 1],
        [6, 2],
      ],
      // "6"
      5: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [4, 0],
        [4, 4],
        [5, 0],
        [5, 4],
        [6, 1],
        [6, 2],
        [6, 3],
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
      ctx.globalAlpha = 0.06;
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

      shapeProgress += (1 - shapeProgress) * 0.045; // Smooth interpolation speed

      const cx = w / 2;
      const cy = h / 2;

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

      // Render structural big watermark number behind grid
      if (activeRef.current !== null) {
        drawNumberLabel(activeRef.current + 1, cx, cy);
      }

      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const x = startX + col * gap;
          const y = startY + row * gap;

          // Silent background structural rings
          drawRing(x, y, r, "rgba(241,224,174,0.4)", 0.999, 0, 4);

          const isActive = activeSet.has(`${row}-${col}`);

          if (isActive && activeRef.current !== null) {
            const indexDelay = (row + col) * 0.04;
            const localProgress = Math.max(
              0,
              Math.min(1, (shapeProgress - indexDelay) / (1 - indexDelay)),
            );

            const ringFill = 0.15 + localProgress * 0.85;

            // Primary active accent ring
            drawRing(
              x,
              y,
              r,
              "#FFCC00",
              ringFill,
              -Math.PI / 2 + time + row * 0.2,
              7,
            );

            // Inner core fluid canvas circle
            drawRing(
              x,
              y,
              r * 0.72,
              "rgba(255,204,0,0.35)",
              localProgress * 0.75,
              Math.PI / 2 - time,
              3,
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
      className="font-arimo bg-[var(--color-primary-bg)] py-20 lg:pb-32 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-5 py-2">
            <HelpCircle size={17} />
            <span className="text-sm font-semibold text-black">FAQ</span>
          </div>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Questions", "before", "you", "contact", "us?"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden px-1">
                <span className="faq-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Responsive dual split system */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* FAQ Accordion Side */}
          <div className="faq-reveal space-y-4 order-2 lg:order-1">
            {faqs.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-[26px] border transition-all duration-500 ${
                    isActive
                      ? "border-[#FFCC00] bg-[#FFE994]/40 shadow-[0_14px_30px_rgba(0,0,0,0.04)]"
                      : "border-black/10 bg-[#FFF9E6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                  >
                    <span className="text-base sm:text-lg font-bold tracking-[-0.03em] text-black">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isActive ? "bg-[#FFCC00] rotate-180" : "bg-[#CFF7BC]"
                      }`}
                    >
                      <ChevronDown size={20} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-sm leading-6 text-black/70 sm:px-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Dot-Matrix Side */}
          <div className="faq-reveal relative flex items-center justify-center h-[320px] sm:h-[400px] lg:h-[480px] order-1 lg:order-2">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
