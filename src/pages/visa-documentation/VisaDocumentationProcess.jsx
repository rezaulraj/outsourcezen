import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ClipboardList,
  FileSearch,
  ShieldCheck,
  FolderCheck,
  Stamp,
  Plane,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Document Collection",
    text: "We collect required files from candidates and employers.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "File Review",
    text: "Each document is reviewed for completeness and consistency.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Verification Check",
    text: "Identity, passport details and supporting documents are checked.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Visa File Setup",
    text: "Documents are organized into a clean visa-ready file.",
    icon: FolderCheck,
  },
  {
    number: "05",
    title: "Submission Support",
    text: "We support file coordination for visa and permit processing.",
    icon: Stamp,
  },
  {
    number: "06",
    title: "Deployment Ready",
    text: "Final papers are checked before workers are ready to travel.",
    icon: Plane,
  },
];

/**
 * THE BUG (original code):
 * The canvas covered the whole section and computed its own evenly
 * spaced points (cx ± 38px, evenly divided down the full section
 * height) to draw the connecting line + pulsing nodes. The actual
 * <ProcessCard> elements are laid out by normal document flow
 * (space-y-8, alternating justify-start/justify-end, variable height
 * per card since text length differs) — a completely different
 * coordinate system. So the nodes floated off the cards and the
 * connecting line didn't track the real step positions, especially on
 * resize or when card text wrapped differently.
 *
 * THE FIX:
 * Give each ProcessCard a ref back to the parent, measure their real
 * bounding boxes (ResizeObserver + resize listener), and size/position
 * the canvas to exactly match the card-stack wrapper. Draw the line and
 * nodes through each card's true inner-edge anchor point (left edge if
 * the card sits on the right, right edge if it sits on the left) at its
 * real vertical center, so the animation always lines up with the
 * actual steps.
 */

const VisaDocumentationProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const listWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".visa-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".visa-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".visa-process-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".visa-process-line", {
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

      points = cardRefs.current.map((el, i) => {
        if (!el) return { x: w / 2, y: 0 };
        const r = el.getBoundingClientRect();
        const isRight = i % 2 !== 0;
        const x = isRight ? r.left - wrapRect.left : r.right - wrapRect.left;
        const y = r.top - wrapRect.top + r.height / 2;
        return { x, y };
      });
    };

    const drawDocIcon = (x, y, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 3);
      ctx.rotate(Math.sin(time + i) * 0.04);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.roundRect(-14, -19, 28, 38, 5);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(4, -19);
      ctx.lineTo(14, -9);
      ctx.lineTo(4, -9);
      ctx.closePath();
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
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
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.stroke();

      drawDocIcon(x, y, 0.55, i);
    };

    const draw = () => {
      if (!w || !h) {
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
        <div className="visa-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Visa Documentation Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "documents", "to", "deployment"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="visa-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="visa-process-line mx-auto mt-3 h-5 w-[340px] max-w-full"
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
            A clear workflow that keeps visa files, supporting papers and
            deployment documents organized from start to finish.
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
      className={`visa-process-card relative flex ${
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

export default VisaDocumentationProcess;
