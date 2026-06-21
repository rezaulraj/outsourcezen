import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
          Contact Our Team
        </span>
      </a>
    </div>
  );
};

const faqs = [
  {
    question: "What is included in relocation and onboarding support?",
    answer:
      "Our support covers airport arrival guidance, accommodation coordination, workplace reporting instructions, local orientation, and post-arrival follow-up.",
  },
  {
    question: "Do workers receive accommodation guidance?",
    answer:
      "Yes. We help workers understand accommodation arrangements, shared living rules, daily routines, and essential housing information.",
  },
  {
    question: "How do workers know where to report on their first day?",
    answer:
      "We coordinate reporting details including workplace location, reporting time, supervisor contact, and first-day instructions.",
  },
  {
    question: "Do you provide support after workers arrive?",
    answer:
      "Yes. Our team follows up after arrival to address early concerns and improve communication between employers and workers.",
  },
  {
    question: "Why is onboarding support important for employers?",
    answer:
      "Effective onboarding reduces confusion, improves first-week productivity, strengthens retention, and creates a smoother workforce transition.",
  },
  {
    question: "Can the onboarding process be customized?",
    answer:
      "Absolutely. We adapt relocation and onboarding support according to country requirements, employer needs, and workforce size.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[var(--color-primary-bg)] relative py-20 lg:py-28 font-arimo">
      <div className="absolute inset-0 bg-[#CFF7BC]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-20">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="inline-block border-b border-black text-sm font-medium text-black">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.04em] text-black">
            Everything you need to know
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-black/70">
            Answers to the most common questions about our relocation and
            onboarding support services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-black/10 pb-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-6 text-left py-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-bold text-black/30 min-w-[32px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-lg sm:text-xl font-semibold text-black">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    size={22}
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-12 pr-8 pb-2">
                    <p className="text-sm leading-7 text-black/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <AnimatedBookButton />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
