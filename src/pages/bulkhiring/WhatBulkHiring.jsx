import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { UsersRound, CheckCircle2, Clock, Factory } from "lucide-react";

const points = [
  {
    icon: UsersRound,
    title: "High-volume workforce",
    text: "Recruit large groups of workers for urgent or ongoing project needs.",
  },
  {
    icon: CheckCircle2,
    title: "Screened candidates",
    text: "Workers are filtered by skill, experience, documents and job fit.",
  },
  {
    icon: Clock,
    title: "Faster hiring timeline",
    text: "A structured process helps reduce delays and speed up deployment.",
  },
  {
    icon: Factory,
    title: "Industry-ready teams",
    text: "Ideal for construction, manufacturing, logistics, cleaning and service roles.",
  },
];

const WhatBulkHiring = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bulk-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".bulk-what-reveal", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".bulk-what-card", {
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        delay: 0.45,
        ease: "power3.out",
      });

      gsap.from(".bulk-what-line", {
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

    const workers = Array.from({ length: 54 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 54,
      radius: 0.22 + (i % 4) * 0.055,
      speed: 0.12 + (i % 6) * 0.015,
      size: 2.2 + (i % 3) * 0.9,
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
      ctx.arc(x, y + r * 0.75, r * 1.1, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawBuilding = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.roundRect(-64, -92, 128, 184, 16);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(-48, -74, 96, 146, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          const pulse = 0.45 + 0.35 * Math.sin(time * 2 + row + col);
          ctx.beginPath();
          ctx.roundRect(-31 + col * 31, -55 + row * 24, 14, 13, 3);
          ctx.fillStyle = `rgba(244,197,66,${0.4 + pulse})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.roundRect(-18, 48, 36, 44, 6);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawHub = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r + 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.10)";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        r + 12,
        -Math.PI / 2 + time * 0.35,
        -Math.PI / 2 +
          time * 0.35 +
          Math.PI * 2 * (0.58 + Math.sin(time) * 0.22),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - 13, y);
      ctx.lineTo(x - 5, y + 9);
      ctx.lineTo(x + 15, y - 13);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w * 0.45;
      const cy = h * 0.5;

      drawBuilding(w * 0.76, h * 0.52, Math.min(w, h) / 520);

      ctx.beginPath();
      ctx.moveTo(cx + 70, cy);
      ctx.quadraticCurveTo(w * 0.62, h * 0.38, w * 0.68, h * 0.47);
      ctx.strokeStyle = "rgba(0,0,0,0.13)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 40;
      ctx.stroke();
      ctx.setLineDash([]);

      workers.forEach((worker, i) => {
        const orbit = Math.min(w, h) * worker.radius;
        const angle = worker.angle + time * worker.speed;
        const x = cx + Math.cos(angle) * orbit;
        const y = cy + Math.sin(angle) * orbit * 0.72;

        const approved = i % 5 === 0 || Math.sin(time + i) > 0.6;
        drawWorker(
          x,
          y,
          worker.size,
          approved ? "#F4C542" : "rgba(0,0,0,0.55)",
        );
      });

      for (let i = 0; i < 14; i++) {
        const t = (time * 0.18 + i / 14) % 1;
        const x = cx + 72 + (w * 0.68 - cx) * t;
        const y = cy + Math.sin(t * Math.PI) * -34;
        drawWorker(x, y, 3, "#67D946");
      }

      drawHub(cx, cy, 42);

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
      <div
        className="absolute left-0 top-0 h-[55%] w-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 58% at 50% 0%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 h-[55%] w-full bg-[#CFF7BC]"
        style={{
          clipPath: "ellipse(82% 58% at 50% 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div>
          <p className="bulk-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What is Bulk Hiring?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Large-scale", "recruitment", "made", "simple"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="bulk-what-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="bulk-what-line mt-3 h-5 w-[340px] max-w-full"
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

          <p className="bulk-what-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Bulk hiring is a structured recruitment service for employers who
            need many workers at once. We organize sourcing, screening,
            shortlisting and deployment so large teams can be built faster with
            less hiring risk.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bulk-what-card rounded-3xl border border-black/10 bg-[var(--color-primary-bg)] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bulk-what-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatBulkHiring;
