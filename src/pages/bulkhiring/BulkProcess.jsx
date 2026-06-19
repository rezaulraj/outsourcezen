import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Search,
  UserCheck,
  Hammer,
  FileCheck,
  Plane,
  Building2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Workforce Sourcing",
    text: "We collect workers from trusted local recruitment channels.",
    icon: Search,
  },
  {
    number: "02",
    title: "Candidate Screening",
    text: "We check experience, documents, availability and job fit.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Trade Assessment",
    text: "Skill testing helps confirm workers are ready for the role.",
    icon: Hammer,
  },
  {
    number: "04",
    title: "Documentation",
    text: "We organize contracts, files, visa support and deployment papers.",
    icon: FileCheck,
  },
  {
    number: "05",
    title: "Deployment Prep",
    text: "Selected workers receive basic orientation and travel readiness.",
    icon: Plane,
  },
  {
    number: "06",
    title: "Mobilization",
    text: "Workers are delivered to the employer with coordination support.",
    icon: Building2,
  },
];

const BulkProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bulk-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".bulk-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".bulk-process-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".bulk-process-line", {
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
    const ctx = canvas.getContext("2d");

    let w, h, frame;
    let time = 0;

    const particles = Array.from({ length: 54 }, (_, i) => ({
      t: Math.random(),
      speed: 0.0018 + Math.random() * 0.0022,
      side: i % 2 === 0 ? -1 : 1,
      size: 2 + Math.random() * 2,
      delay: Math.random(),
    }));

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

    const drawWorker = (x, y, r, color) => {
      ctx.beginPath();
      ctx.arc(x, y - r * 1.2, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.7, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.5);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawNode = (x, y, i) => {
      const active = 0.5 + 0.5 * Math.sin(time * 1.4 + i);

      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 28 + active * 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,197,66,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        24,
        -Math.PI / 2 + time * 0.35,
        -Math.PI / 2 + time * 0.35 + Math.PI * 2 * (0.45 + active * 0.35),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const top = h * 0.06;
      const bottom = h * 0.94;
      const height = bottom - top;

      ctx.beginPath();
      ctx.moveTo(cx, top);
      ctx.lineTo(cx, bottom);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 14]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      steps.forEach((_, i) => {
        const y = top + (height / (steps.length - 1)) * i;
        drawNode(cx, y, i);
      });

      particles.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const y = top + height * p.t;
        const wave = Math.sin(p.t * Math.PI * 6 + i) * 18;
        const x = cx + p.side * (42 + wave);

        const passed = p.t > 0.55;
        drawWorker(x, y, p.size, passed ? "#67D946" : "rgba(0,0,0,0.45)");
      });

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
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bulk-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Bulk Hiring Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["From", "sourcing", "to", "mobilization"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="bulk-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="bulk-process-line mx-auto mt-3 h-5 w-[340px] max-w-full"
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
            A clear step-by-step workflow for sourcing, screening, testing,
            documentation and workforce deployment.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-black/10 lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index }) => {
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
      className={`bulk-process-card relative flex ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      <div className="absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[var(--color-primary-bg)] bg-[#F4C542] lg:block" />

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

export default BulkProcess;
