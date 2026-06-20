import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardList,
  GraduationCap,
  HardHat,
  Languages,
  BadgeCheck,
  Plane,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Worker Briefing",
    text: "We explain job role, employer expectations, travel timeline and basic responsibilities.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Safety Orientation",
    text: "Workers learn PPE use, workplace hazards, site rules and safe daily behavior.",
    icon: HardHat,
  },
  {
    number: "03",
    title: "Job Readiness Training",
    text: "We prepare workers for daily tasks, discipline, attendance and reporting flow.",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "Culture & Communication",
    text: "Workers learn basic workplace culture, respectful communication and adaptation tips.",
    icon: Languages,
  },
  {
    number: "05",
    title: "Final Assessment",
    text: "Training understanding is checked before workers are confirmed as deployment-ready.",
    icon: BadgeCheck,
  },
  {
    number: "06",
    title: "Departure Preparation",
    text: "Workers are guided on airport process, documents to carry and arrival instructions.",
    icon: Plane,
  },
];

const TrainingProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".training-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".training-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".training-process-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.55,
        ease: "power3.out",
      });

      // Each step card gets its own ScrollTrigger instead of a single
      // on-mount stagger, so cards further down the page actually animate
      // in when they reach the viewport, rather than finishing their
      // animation before the user ever scrolls to them.
      gsap.utils.toArray(".training-process-card").forEach((card, i) => {
        const isRight = i % 2 !== 0;

        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          rotate: isRight ? 2 : -2,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

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

    const drawCheck = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-3, 6);
      ctx.lineTo(10, -9);
      ctx.stroke();
      ctx.restore();
    };

    const drawWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.1, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawArrow = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 4);
      ctx.rotate(rot + Math.sin(time + i) * 0.08);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-22, 0);
      ctx.quadraticCurveTo(-6, -10, 14, -2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(4, -12);
      ctx.moveTo(14, -2);
      ctx.lineTo(5, 8);
      ctx.stroke();

      ctx.restore();
    };

    const drawMovingArrowLine = (x1, y1, x2, y2, i) => {
      const midY = y1 - 42;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, midY, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 14]);
      ctx.lineDashOffset = -time * 55 - i * 10;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.22 + i * 0.14) % 1;
      const midX = (x1 + x2) / 2;

      const cx = (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * midX + p * p * x2;
      const cy = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * midY + p * p * y2;

      // Tangent direction of the quadratic bezier at parameter p, so the
      // travelling arrow actually points the way the curve is heading
      // instead of a fixed fraction of the straight start-to-end angle.
      const tx = 2 * (1 - p) * (midX - x1) + 2 * p * (x2 - midX);
      const ty = 2 * (1 - p) * (midY - y1) + 2 * p * (y2 - midY);

      drawArrow(cx, cy, Math.atan2(ty, tx), 0.52, i);
    };

    const drawNode = (x, y, i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i);

      ctx.beginPath();
      ctx.arc(x, y, 27 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        25,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.45 + pulse * 0.34),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(x, y + 1, 0.82);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const top = h * 0.07;
      const bottom = h * 0.93;
      const totalH = bottom - top;

      const points = steps.map((_, i) => ({
        x: cx + (i % 2 === 0 ? -38 : 38),
        y: top + (totalH / (steps.length - 1)) * i,
      }));

      points.forEach((p, i) => {
        if (i < points.length - 1) {
          drawMovingArrowLine(
            p.x,
            p.y + 32,
            points[i + 1].x,
            points[i + 1].y - 32,
            i,
          );
        }
      });

      points.forEach((p, i) => drawNode(p.x, p.y, i));

      for (let i = 0; i < 20; i++) {
        const p = (time * 0.12 + i / 20) % 1;
        const y = top + totalH * p;
        const x = cx + Math.sin(p * Math.PI * 5) * 58;
        drawWorker(x, y, 3, p > 0.7 ? "#67D946" : "#F4C542");
      }

      drawArrow(w * 0.12, h * 0.18, 0.2, 0.85, 10);
      drawArrow(w * 0.88, h * 0.18, Math.PI - 0.2, 0.75, 11);
      drawArrow(w * 0.12, h * 0.84, -0.35, 0.75, 12);
      drawArrow(w * 0.88, h * 0.84, Math.PI + 0.3, 0.7, 13);

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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="training-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Training Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "briefing", "to", "departure"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="training-process-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <svg
            className="training-process-line mx-auto mt-3 h-5 w-[340px] max-w-full"
            viewBox="0 0 340 24"
            fill="none"
          >
            <path
              d="M12 15C75 5 135 8 170 13C230 21 285 10 328 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A simple step-by-step training flow that prepares workers for job
            duties, safety, culture, assessment and final travel readiness.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <ProcessCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessCard = ({ step, index }) => {
  const cardRef = useRef(null);
  const Icon = step.icon;
  const isRight = index % 2 !== 0;

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      rotate: isRight ? 1 : -1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <div
      className={`training-process-card relative flex ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      <article
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative w-full overflow-hidden rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 lg:w-[46%]"
      >
        <span className="absolute -right-4 -top-8 text-[120px] font-black leading-none text-black/[0.04]">
          {step.number}
        </span>

        <div className="relative z-10 flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FFE994] text-black">
            <Icon size={25} strokeWidth={2.4} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">
              Step {step.number}
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-black">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/70">{step.text}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TrainingProcess;
