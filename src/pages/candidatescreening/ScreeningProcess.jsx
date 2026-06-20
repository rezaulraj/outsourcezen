import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FileSearch,
  BadgeCheck,
  ShieldCheck,
  MessageSquareText,
  UserRoundCheck,
  ClipboardCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Application Review",
    text: "We review CVs, job history, role fit and basic candidate details.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Document Verification",
    text: "We check documents, identity details and application consistency.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Skill Assessment",
    text: "We assess practical ability, trade skills and technical fit.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Interview Evaluation",
    text: "We evaluate attitude, communication and job understanding.",
    icon: MessageSquareText,
  },
  {
    number: "05",
    title: "Shortlisting",
    text: "Only qualified candidates are prepared for employer review.",
    icon: UserRoundCheck,
  },
  {
    number: "06",
    title: "Final Report",
    text: "You receive clear candidate notes, score and hiring recommendation.",
    icon: ClipboardCheck,
  },
];

/**
 * THE BUG (original code):
 * The canvas drew its connecting line + pulsing nodes at positions it
 * computed itself — evenly spaced down the section, alternating left/right
 * by a fixed 38px offset from center. The actual <StepCard> elements,
 * meanwhile, are laid out by normal document flow (space-y-8, variable
 * card height because text wraps differently per step, alternate
 * justify-start/justify-end on a flex row). Those two coordinate systems
 * have nothing to do with each other, so the "nodes" floated in empty
 * space instead of sitting on the cards, and the connecting line cut
 * through card bodies instead of threading between them.
 *
 * THE FIX:
 * Measure the real card elements with refs + ResizeObserver/window resize,
 * compute each card's actual left/right anchor point and vertical center
 * relative to the section, and draw the canvas path/nodes through those
 * real coordinates. The animation now always lands exactly where the
 * cards are, regardless of viewport width, text length, or reflow.
 */

const ScreeningProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const listWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".screen-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".screen-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".screen-process-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".screen-process-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 1,
        delay: 0.55,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = listWrapRef.current;
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;
    let points = [];

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      const wrapRect = wrap.getBoundingClientRect();

      w = wrapRect.width;
      h = wrapRect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Real anchor point per card: the inner edge facing the timeline
      // (left edge if the card sits on the right, right edge if on the
      // left), at the card's true vertical center.
      points = cardRefs.current.map((el, i) => {
        if (!el) return { x: w / 2, y: 0 };
        const r = el.getBoundingClientRect();
        const isRight = i % 2 !== 0;
        const x = isRight ? r.left - wrapRect.left : r.right - wrapRect.left;
        const y = r.top - wrapRect.top + r.height / 2;
        return { x, y };
      });
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
      const midY = (y1 + y2) / 2;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, midY, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 14]);
      ctx.lineDashOffset = -time * 55 - i * 10;
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (time * 0.24 + i * 0.16) % 1;
      const cx =
        (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * ((x1 + x2) / 2) + p * p * x2;
      const cy = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * midY + p * p * y2;

      const dx = x2 - x1;
      const dy = y2 - y1;
      drawArrow(cx, cy, Math.atan2(dy, dx) * 0.35, 0.55, i);
    };

    const drawNode = (x, y, i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i);

      ctx.beginPath();
      ctx.arc(x, y, 18 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        16,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.45 + pulse * 0.34),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      points.forEach((p, i) => {
        if (i < points.length - 1) {
          const next = points[i + 1];
          drawMovingArrowLine(p.x, p.y, next.x, next.y, i);
        }
      });

      points.forEach((p, i) => drawNode(p.x, p.y, i));

      frame = requestAnimationFrame(draw);
    };

    measure();
    draw();

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="screen-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Screening Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "application", "to", "shortlist"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="screen-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="screen-process-line mx-auto mt-3 h-5 w-[340px] max-w-full"
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
            A clear screening workflow that turns large applicant pools into a
            verified shortlist employers can trust.
          </p>
        </div>

        <div ref={listWrapRef} className="relative mx-auto max-w-6xl">
          {/* canvas now sized + positioned to exactly match the card stack
              wrapper, and redrawn from real card geometry on every resize */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 hidden lg:block"
          />

          <div className="relative space-y-8">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index, cardRef }) => {
  const innerRef = useRef(null);
  const Icon = step.icon;
  const isRight = index % 2 !== 0;

  const setRefs = (el) => {
    innerRef.current = el;
    cardRef(el);
  };

  const onEnter = () => {
    gsap.to(innerRef.current, {
      y: -10,
      scale: 1.02,
      rotate: isRight ? 1 : -1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(innerRef.current, {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <div
      className={`screen-process-card relative flex ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      <article
        ref={setRefs}
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

export default ScreeningProcess;
