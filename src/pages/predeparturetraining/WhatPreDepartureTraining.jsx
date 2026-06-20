import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  HardHat,
  Languages,
  ShieldCheck,
} from "lucide-react";

const points = [
  {
    title: "Job readiness",
    text: "Workers understand duties, expectations and basic workplace behavior.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Safety awareness",
    text: "Basic safety rules, PPE use and workplace discipline are explained.",
    icon: HardHat,
  },
  {
    title: "Culture preparation",
    text: "Workers learn about workplace culture, communication and daily life abroad.",
    icon: Languages,
  },
  {
    title: "Deployment confidence",
    text: "Training reduces confusion before travel and improves onboarding readiness.",
    icon: BadgeCheck,
  },
];

const WhatPreDepartureTraining = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pre-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".pre-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".pre-what-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".pre-what-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
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
      ctx.arc(x, y - r * 1.2, r * 0.78, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y + r * 0.75, r, Math.PI, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, r * 0.55);
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawTrainingBoard = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      rr(-88, -70, 176, 140, 18);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 16px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("TRAINING", 0, -38);

      const modules = ["SAFETY", "JOB", "CULTURE", "TRAVEL"];
      modules.forEach((m, i) => {
        const yy = -16 + i * 25;
        rr(-58, yy - 8, 116, 15, 8);
        ctx.fillStyle = i % 2 === 0 ? "#FFE994" : "#CFF7BC";
        ctx.fill();

        ctx.fillStyle = "#111";
        ctx.font = "700 9px Arimo";
        ctx.fillText(m, 0, yy + 3);
      });

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 56, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        56,
        -Math.PI / 2 + time * 0.45,
        -Math.PI / 2 +
          time * 0.45 +
          Math.PI * 2 * (0.58 + Math.sin(time) * 0.2),
      );
      ctx.strokeStyle = "#F4C542";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(x - 18, y - 3);
      ctx.lineTo(x, y - 14);
      ctx.lineTo(x + 18, y - 3);
      ctx.lineTo(x, y + 10);
      ctx.closePath();
      ctx.stroke();

      drawCheck(x + 22, y + 23, 0.7);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("READY", x, y + 72);
    };

    const drawCertificate = (x, y, scale) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25) * 5);
      ctx.rotate(-0.08 + Math.sin(time) * 0.04);
      ctx.scale(scale, scale);

      rr(-52, -38, 104, 76, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CERTIFIED", 0, -10);

      rr(-28, 8, 56, 7, 4);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      drawCheck(35, 18, 0.55);

      ctx.restore();
    };

    const flow = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 42, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 48;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.56;
      const hubY = h * 0.52;
      const scale = Math.min(w, h) / 620;

      drawTrainingBoard(w * 0.22, h * 0.5, scale);
      drawHub(hubX, hubY);
      drawCertificate(w * 0.82, h * 0.5, scale);

      flow(w * 0.32, h * 0.5, hubX - 66, hubY, "rgba(0,0,0,0.13)");
      flow(hubX + 66, hubY, w * 0.74, h * 0.5, "#F4C542");

      for (let i = 0; i < 18; i++) {
        const p = (time * 0.15 + i / 18) % 1;
        const x = w * 0.32 + (hubX - w * 0.38) * p;
        const y = h * 0.5 + Math.sin(p * Math.PI) * -32;
        drawWorker(x, y, 3, p > 0.7 ? "#F4C542" : "rgba(0,0,0,0.5)");
      }

      for (let i = 0; i < 12; i++) {
        const p = (time * 0.16 + i / 12) % 1;
        const x = hubX + 72 + (w * 0.74 - hubX - 72) * p;
        const y = hubY + Math.sin(p * Math.PI) * -28;
        drawWorker(x, y, 3.2, "#67D946");
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
      className="font-arimo relative overflow-hidden bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#A6E6EC]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div>
          <p className="pre-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Pre-Departure Training?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Prepare", "workers", "before", "deployment"].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="pre-what-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <svg
            className="pre-what-line mt-3 h-5 w-[340px] max-w-full"
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

          <p className="pre-what-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Pre-departure training prepares selected workers before they travel
            abroad. It helps them understand job duties, workplace rules, safety
            expectations, communication basics and daily life in the destination
            country.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="pre-what-card rounded-3xl border border-black/10 bg-[#FFF9E6] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pre-what-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatPreDepartureTraining;
