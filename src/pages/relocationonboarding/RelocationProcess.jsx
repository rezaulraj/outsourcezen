import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Building2,
  ClipboardCheck,
  Home,
  MapPinCheck,
  MessageSquareText,
  PlaneLanding,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Arrival Planning",
    text: "We confirm arrival date, destination, receiving point and first movement plan.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Airport Receiving",
    text: "Workers are guided after landing so they know where to go and who to contact.",
    icon: PlaneLanding,
  },
  {
    number: "03",
    title: "Accommodation Setup",
    text: "We support housing guidance, shared living rules and settlement expectations.",
    icon: Home,
  },
  {
    number: "04",
    title: "Local Orientation",
    text: "Workers learn basic local rules, transport, timing and daily-life guidance.",
    icon: MapPinCheck,
  },
  {
    number: "05",
    title: "Workplace Onboarding",
    text: "We coordinate first-day reporting, supervisor contact and workplace introduction.",
    icon: Building2,
  },
  {
    number: "06",
    title: "Follow-up Support",
    text: "Early communication helps solve adjustment issues and reduce onboarding friction.",
    icon: MessageSquareText,
  },
];

/**
 * THE BUG (original code):
 * The canvas covered the whole section and computed its own evenly
 * spaced points (cx ± 38px, divided evenly down the full section
 * height) for the connecting line, pulsing nodes, and the worker dots
 * traveling down the path. The actual <ProcessCard> elements are laid
 * out by normal document flow (space-y-8, alternating
 * justify-start/justify-end, variable height per card since text length
 * differs) — a different coordinate system entirely. So the nodes and
 * the worker-dot stream floated off the cards instead of tracking the
 * real steps, and broke further on resize or when text wrapped
 * differently.
 *
 * THE FIX:
 * Give each ProcessCard a ref back to the parent, measure their real
 * bounding boxes (ResizeObserver + resize), and size/position the
 * canvas to exactly match the card-stack wrapper. Draw the line, nodes,
 * and the traveling worker dots through each card's true inner-edge
 * anchor point at its real vertical center, so everything always lines
 * up with the actual steps.
 */

const RelocationProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const listWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".relocation-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".relocation-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".relocation-process-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".relocation-process-line", {
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
    let top = 0;
    let totalH = 0;

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

      points = cardRefs.current.map((el, i) => {
        if (!el) return { x: w / 2, y: 0 };
        const r = el.getBoundingClientRect();
        const isRight = i % 2 !== 0;
        const x = isRight ? r.left - wrapRect.left : r.right - wrapRect.left;
        const y = r.top - wrapRect.top + r.height / 2;
        return { x, y };
      });

      top = points.length ? points[0].y : 0;
      totalH = points.length ? points[points.length - 1].y - top : 0;
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
      const midY = (y1 + y2) / 2;

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
      const cx =
        (1 - p) * (1 - p) * x1 + 2 * (1 - p) * p * ((x1 + x2) / 2) + p * p * x2;
      const cy = (1 - p) * (1 - p) * y1 + 2 * (1 - p) * p * midY + p * p * y2;

      drawArrow(cx, cy, Math.atan2(y2 - y1, x2 - x1) * 0.35, 0.52, i);
    };

    const drawNode = (x, y, i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i);

      ctx.beginPath();
      ctx.arc(x, y, 20 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        18,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.45 + pulse * 0.34),
      );
      ctx.strokeStyle = i === steps.length - 1 ? "#67D946" : "#F4C542";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      drawCheck(x, y + 1, 0.62);
    };

    const draw = () => {
      if (!w || !h || points.length === 0) {
        frame = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      points.forEach((p, i) => {
        if (i < points.length - 1) {
          const next = points[i + 1];
          drawMovingArrowLine(p.x, p.y, next.x, next.y, i);
        }
      });

      points.forEach((p, i) => drawNode(p.x, p.y, i));

      const midX = w / 2;
      for (let i = 0; i < 22; i++) {
        const p = (time * 0.12 + i / 22) % 1;
        const y = top + totalH * p;
        const x = midX + Math.sin(p * Math.PI * 5) * 58;

        drawWorker(x, y, 3, p > 0.74 ? "#67D946" : "#F4C542");
      }

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
        <div className="relocation-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Relocation Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "landing", "to", "workplace", "start"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="relocation-process-word inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <svg
            className="relocation-process-line mx-auto mt-3 h-5 w-[360px] max-w-full"
            viewBox="0 0 360 24"
            fill="none"
          >
            <path
              d="M12 15C80 5 145 8 180 13C245 21 300 10 348 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A practical post-arrival flow that helps workers settle, understand
            local guidance and begin work with less confusion.
          </p>
        </div>

        <div ref={listWrapRef} className="relative mx-auto max-w-6xl">
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 hidden lg:block"
          />

          <div className="relative space-y-8">
            {steps.map((step, index) => (
              <ProcessCard
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

const ProcessCard = ({ step, index, cardRef }) => {
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
      className={`relocation-process-card relative flex ${
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

export default RelocationProcess;
