import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    number: "01",
    title: "Share Requirement",
    text: "Tell us role, skills, country, salary, quantity and timeline.",
  },
  {
    number: "02",
    title: "Source Candidates",
    text: "We find suitable workers through verified local channels.",
  },
  {
    number: "03",
    title: "Screen & Test",
    text: "Candidates are checked by skill, documents and experience.",
  },
  {
    number: "04",
    title: "Prepare Documents",
    text: "We support visa files, contracts and deployment preparation.",
  },
  {
    number: "05",
    title: "Deploy Workforce",
    text: "Selected workers are ready for onboarding and job placement.",
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".process-card", {
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".process-line", {
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

    let w;
    let h;
    let frame;
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

    const drawArrow = (x, y, rot, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.5 + i) * 6);
      ctx.rotate(rot + Math.sin(time + i) * 0.12);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.quadraticCurveTo(-4, -9, 12, -2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(12, -2);
      ctx.lineTo(3, -10);
      ctx.moveTo(12, -2);
      ctx.lineTo(4, 7);
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x, y, r, i) => {
      ctx.beginPath();
      ctx.arc(x, y + Math.sin(time * 1.8 + i) * 4, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      drawArrow(w * 0.12, h * 0.22, 0.2, 1);
      drawArrow(w * 0.88, h * 0.25, Math.PI - 0.2, 2);
      drawArrow(w * 0.18, h * 0.78, -0.35, 3);
      drawArrow(w * 0.82, h * 0.76, Math.PI + 0.3, 4);

      drawDot(w * 0.08, h * 0.52, 4, 5);
      drawDot(w * 0.92, h * 0.5, 4, 6);
      drawDot(w * 0.5, h * 0.12, 3.5, 7);
      drawDot(w * 0.48, h * 0.9, 3.5, 8);

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
        <div className="process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Our Recruitment Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Launch", "in", "5", "easy", "steps"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="process-line mx-auto mt-3 h-5 w-[300px] max-w-full"
            viewBox="0 0 300 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 115 9 150 13C200 20 245 10 288 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A simple hiring flow built to reduce risk, save time and deliver
            job-ready workers.
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
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let hover = 0;
    let time = 0;

    const w = 78;
    const h = 78;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.018;
      hover += ((hoverRef.current ? 1 : 0) - hover) * 0.08;

      const cx = w / 2;
      const cy = h / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        28,
        -Math.PI / 2 + time * 0.4,
        -Math.PI / 2 + time * 0.4 + Math.PI * 2 * (0.45 + hover * 0.45),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        17,
        Math.PI / 2,
        Math.PI / 2 - Math.PI * 2 * (0.35 + Math.sin(time) * 0.15),
        true,
      );
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 15px Arimo";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(step.number, cx, cy + 1);

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, [step.number]);

  const onEnter = () => {
    hoverRef.current = true;
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    hoverRef.current = false;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const isRight = index % 2 !== 0;

  return (
    <div
      className={`process-card relative flex ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      <div className="absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[var(--color-primary-bg)] bg-[#F4C542] lg:block" />

      <article
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative w-full rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 lg:w-[46%]"
      >
        <div className="absolute -right-3 top-8 h-[calc(100%-64px)] w-5 rounded-r-2xl bg-[#67D946]" />

        <div className="flex items-start gap-5">
          <canvas ref={canvasRef} className="shrink-0" />

          <div>
            <h3 className="text-2xl font-bold tracking-[-0.035em] text-black">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/70">{step.text}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Clear", "Fast", "Verified"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#FFE994] px-3 py-1 text-xs font-semibold text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Process;
