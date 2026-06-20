import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FileCheck, FolderCheck, Plane, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Passport Verification",
    text: "We review passport details, validity and candidate identity.",
    icon: ShieldCheck,
  },
  {
    title: "Employment Contracts",
    text: "We help organize worker contracts and employer requirements.",
    icon: FileCheck,
  },
  {
    title: "Visa File Preparation",
    text: "Required papers are arranged into a clear visa-ready file.",
    icon: FolderCheck,
  },
  {
    title: "Deployment Documents",
    text: "Final documents are prepared for travel and mobilization.",
    icon: Plane,
  },
];

const WhatVisaDocumentation = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".visa-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".visa-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".visa-what-card", {
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.4,
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

    const drawDoc = (x, y, scale, label, i) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4 + i) * 5);
      ctx.rotate(Math.sin(time + i) * 0.05);
      ctx.scale(scale, scale);

      rr(-42, -54, 84, 108, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(18, -54);
      ctx.lineTo(42, -30);
      ctx.lineTo(18, -30);
      ctx.closePath();
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      for (let n = 0; n < 4; n++) {
        rr(-24, -24 + n * 16, 48 - n * 5, 6, 4);
        ctx.fillStyle = "rgba(0,0,0,0.14)";
        ctx.fill();
      }

      rr(-24, 34, 48, 9, 5);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      drawCheck(24, 18, 0.65);

      ctx.fillStyle = "#111";
      ctx.font = "700 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(label, 0, 72);

      ctx.restore();
    };

    const drawHub = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 58, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        58,
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

      drawCheck(x, y + 2, 1.1);

      ctx.fillStyle = "#111";
      ctx.font = "700 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("VERIFIED", x, y + 74);
    };

    const drawPlane = (x, y) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.25 + Math.sin(time) * 0.08);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(20, -8);
      ctx.lineTo(8, 3);
      ctx.lineTo(20, 12);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-13, 14);
      ctx.moveTo(-4, -1);
      ctx.lineTo(-13, -13);
      ctx.stroke();

      ctx.restore();
    };

    const drawFlowLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 45, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const hubX = w * 0.55;
      const hubY = h * 0.5;
      const s = Math.min(w, h) / 620;

      const docs = [
        [w * 0.18, h * 0.25, "PASS"],
        [w * 0.18, h * 0.5, "MED"],
        [w * 0.18, h * 0.75, "POLICE"],
      ];

      docs.forEach(([x, y, label], i) => {
        drawDoc(x, y, s, label, i);
        drawFlowLine(x + 55 * s, y, hubX - 70, hubY + (i - 1) * 22);
      });

      drawHub(hubX, hubY);

      for (let i = 0; i < 12; i++) {
        const p = (time * 0.16 + i / 12) % 1;
        const x = hubX + 70 + (w * 0.82 - hubX - 70) * p;
        const y = hubY + Math.sin(p * Math.PI) * -32;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#67D946" : "#F4C542";
        ctx.fill();
      }

      drawDoc(w * 0.84, hubY, s * 1.12, "VISA", 4);
      drawPlane(w * 0.82 + Math.sin(time * 0.9) * 28, h * 0.82);

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
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />

      <div className="relative z-10 container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div>
          <p className="visa-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What Is Visa & Documentation Support?
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Organized", "files", "for", "smooth", "deployment"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="visa-what-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <svg
            className="visa-what-reveal mt-3 h-5 w-[340px] max-w-full"
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

          <p className="visa-what-reveal mt-5 max-w-xl text-base leading-7 text-black/75">
            Visa & Documentation Support helps employers and selected workers
            prepare, verify and organize the required paperwork before workforce
            mobilization.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="visa-what-card rounded-3xl border border-black/10 bg-[var(--color-primary-bg)] p-5"
              >
                <Icon size={22} className="mb-4" />
                <h3 className="text-base font-bold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="visa-what-reveal relative h-[390px] sm:h-[480px] lg:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default WhatVisaDocumentation;
