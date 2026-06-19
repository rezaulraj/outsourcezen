import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Search,
  UserCheck,
  MessagesSquare,
  ShieldCheck,
  Crown,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define Leadership Need",
    text: "We understand the role, seniority, business goals, salary range and ideal leadership profile.",
    icon: Search,
  },
  {
    number: "02",
    title: "Map the Talent Market",
    text: "We identify experienced managers, specialists and hidden candidates from relevant industries.",
    icon: Crown,
  },
  {
    number: "03",
    title: "Approach Confidentially",
    text: "Potential leaders are contacted professionally while protecting client and candidate privacy.",
    icon: MessagesSquare,
  },
  {
    number: "04",
    title: "Screen & Shortlist",
    text: "We check experience, leadership fit, communication, documents and long-term suitability.",
    icon: UserCheck,
  },
  {
    number: "05",
    title: "Final Selection Support",
    text: "You receive a focused shortlist with interview coordination and hiring decision support.",
    icon: ShieldCheck,
  },
];

const SearchProcess = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".search-process-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".search-process-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".search-process-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.09,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".search-process-line", {
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

    const drawArrow = (x, y, rot, scale, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 6);
      ctx.rotate(rot + Math.sin(time + i) * 0.12);
      ctx.scale(scale, scale);

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

    const drawRing = (x, y, r, color, progress, i) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.09)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        r,
        -Math.PI / 2 + time * 0.3,
        -Math.PI / 2 + time * 0.3 + Math.PI * 2 * progress,
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y + Math.sin(time * 1.5 + i) * 3, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawArrow(w * 0.1, h * 0.2, 0.2, 0.85, 1);
      drawArrow(w * 0.88, h * 0.2, Math.PI - 0.2, 0.75, 2);
      drawArrow(w * 0.12, h * 0.82, -0.35, 0.75, 3);
      drawArrow(w * 0.88, h * 0.82, Math.PI + 0.3, 0.7, 4);

      drawRing(w * 0.5, h * 0.12, 16, "#F4C542", 0.55, 5);
      drawRing(w * 0.08, h * 0.52, 13, "#67D946", 0.65, 6);
      drawRing(w * 0.92, h * 0.52, 13, "#A6E6EC", 0.6, 7);
      drawRing(w * 0.5, h * 0.92, 15, "#111", 0.5, 8);

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
        <div className="search-process-reveal mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Search Process
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["How", "we", "find", "leaders"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="search-process-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="search-process-line mx-auto mt-3 h-5 w-[320px] max-w-full"
            viewBox="0 0 320 24"
            fill="none"
          >
            <path
              d="M12 15C70 5 125 8 160 13C215 21 260 10 308 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            A focused and confidential search flow designed for senior-level
            hiring, specialist roles and leadership appointments.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-black/10 lg:block" />

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
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);
  const Icon = step.icon;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame;
    let time = 0;
    let hover = 0;

    const w = 84;
    const h = 84;
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
      const r = 31;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        r,
        -Math.PI / 2 + time * 0.42,
        -Math.PI / 2 + time * 0.42 + Math.PI * 2 * (0.45 + hover * 0.46),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        19,
        Math.PI / 2,
        Math.PI / 2 - Math.PI * 2 * (0.34 + Math.sin(time) * 0.15),
        true,
      );
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

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
      className={`search-process-card relative flex ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
    >
      <div className="absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-[var(--color-primary-bg)] bg-[#F4C542] lg:block" />

      <article
        ref={cardRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative w-full rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 lg:w-[46%]"
      >
        <div className="absolute -right-3 top-8 h-[calc(100%-64px)] w-5 rounded-r-2xl bg-[#F4C542]" />

        <div className="flex items-start gap-5">
          <div className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <Icon size={25} strokeWidth={2.4} className="relative z-10" />
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

export default SearchProcess;
