import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Flame,
  Gauge,
  HardHat,
  SearchCheck,
  ShieldCheck,
  Truck,
  UserCheck,
  UserSearch,
  Zap,
} from "lucide-react";

const points = [
  {
    title: "Specialist energy hiring",
    text: "Recruitment for oil, gas, refinery, EPC, power and renewable energy projects.",
    icon: Flame,
    color: "#FFE994",
  },
  {
    title: "Certified workforce focus",
    text: "We support sourcing workers with relevant technical skills, safety awareness and documentation readiness.",
    icon: ShieldCheck,
    color: "#CFF7BC",
  },
  {
    title: "Project-based staffing",
    text: "Support for shutdowns, turnarounds, offshore projects, plant maintenance and rapid mobilization.",
    icon: Gauge,
    color: "#A6E6EC",
  },
  {
    title: "Deployment coordination",
    text: "We assist with shortlisting, document flow, employer review and worker deployment support.",
    icon: Truck,
    color: "#FFF6C8",
  },
];

const steps = [
  "Employer Need",
  "Talent Search",
  "Screening",
  "Certification Check",
  "Employer Review",
  "Deployment",
];

const stats = [
  { value: "1500+", label: "Energy Professionals" },
  { value: "20+", label: "Energy Projects" },
  { value: "18+", label: "Countries Supported" },
  { value: "96%", label: "Client Satisfaction" },
];

const WhatIsOilGasEnergyRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".energy-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".energy-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-what-card", {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.4,
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

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.075;
      ctx.strokeStyle = "#111";

      for (let x = 0; x < w; x += 42) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += 42) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.restore();
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

    const drawPerson = (
      x,
      y,
      s,
      jacket = "#FFE994",
      action = "talk",
      flip = false,
      phase = 0,
    ) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.25 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(-11, 25);
      ctx.moveTo(7, 0);
      ctx.lineTo(11, 25);
      ctx.stroke();

      rr(-17, -42, 34, 45, 8);
      ctx.fillStyle = jacket;
      ctx.fill();
      ctx.stroke();

      let rightX = 34;
      let rightY = -24 + Math.sin(t * 3.5) * 4;

      if (action === "point") {
        rightX = 44;
        rightY = -50;
      }

      if (action === "doc") {
        rightX = 40;
        rightY = -28;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = jacket;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (action === "doc") {
        ctx.save();
        ctx.translate(rightX, rightY);
        ctx.rotate(-0.2);
        rr(-10, -16, 20, 22, 3);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(2, -16);
        ctx.lineTo(10, -8);
        ctx.lineTo(2, -8);
        ctx.closePath();
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -50);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -64, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -81, 34, 12, 5);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -74);
      ctx.quadraticCurveTo(0, -95, 18, -74);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -63, 2, 0, Math.PI * 2);
      ctx.arc(5, -63, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawIndustrialSite = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-125, -46, 250, 66, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const tower = (tx, hgt, color) => {
        rr(tx - 12, -46 - hgt, 24, hgt, 6);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.15;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(
            tx + Math.sin(time + i) * 8,
            -60 - hgt - i * 11,
            13 + i * 3,
            6 + i,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "#111";
          ctx.fill();
        }
        ctx.restore();
      };

      tower(-82, 126, "#1C1810");
      tower(-36, 94, "#2E2618");
      tower(72, 116, "#1C1810");

      rr(25, -150, 62, 104, 13);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(25, -126 + i * 26);
        ctx.lineTo(87, -126 + i * 26);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawMiniRig = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      rr(-72, -16, 144, 24, 8);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-54, -16);
      ctx.lineTo(0, -145);
      ctx.lineTo(54, -16);
      ctx.moveTo(-30, -16);
      ctx.lineTo(0, -95);
      ctx.lineTo(30, -16);
      ctx.moveTo(-35, -70);
      ctx.lineTo(35, -70);
      ctx.moveTo(-20, -110);
      ctx.lineTo(20, -110);
      ctx.stroke();

      rr(28, -96, 44, 22, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawFlow = () => {
      const points = [
        { x: w * 0.16, y: h * 0.28, label: "NEED", color: "#FFE994" },
        { x: w * 0.32, y: h * 0.42, label: "SEARCH", color: "#CFF7BC" },
        { x: w * 0.5, y: h * 0.34, label: "SCREEN", color: "#A6E6EC" },
        { x: w * 0.68, y: h * 0.45, label: "VERIFY", color: "#FFF6C8" },
        { x: w * 0.84, y: h * 0.32, label: "DEPLOY", color: "#FFE994" },
      ];

      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(
          point.x,
          point.y,
          25 + Math.sin(time * 3 + index) * 2,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (index <= Math.floor((time * 0.55) % points.length)) {
          ctx.beginPath();
          ctx.arc(point.x + 22, point.y - 24, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#67D946";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();

          drawCheck(point.x + 22, point.y - 24, 0.45);
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(point.label, point.x, point.y + 45);
      });

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.16 + i * 0.25) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const a = points[seg];
        const b = points[seg + 1];

        const x = a.x + (b.x - a.x) * local;
        const y = a.y + (b.y - a.y) * local;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 2 + i) * 0.12);

        rr(-11, -15, 22, 22, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    };

    const drawCertificationPanel = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.4) * 5);

      rr(-110, -54, 220, 108, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("CERTIFICATION CHECK", 0, -27);

      ["HSE", "Technical", "Documents"].forEach((item, i) => {
        const yy = 2 + i * 24;

        ctx.beginPath();
        ctx.arc(-58, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-58, yy, 0.38);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -38, yy + 4);
      });

      ctx.restore();
    };

    const drawPipeline = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.1, y);
      ctx.lineTo(w * 0.9, y);
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 3;
      ctx.setLineDash([14, 16]);
      ctx.lineDashOffset = -time * 55;
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < 6; i++) {
        const x = w * 0.13 + ((time * 50 + i * 110) % (w * 0.74));

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-88, -32, 176, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-58, 0, 17, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 11px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(title, 20, -6);

      ctx.font = "900 15px Arimo";
      ctx.fillText(value, 20, 14);

      ctx.restore();
    };

    const drawParticles = () => {
      for (let i = 0; i < 32; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.26)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawGrid();
      drawParticles();
      drawFlow();
      drawPipeline();

      const s = Math.min(w, h) / 780;

      drawIndustrialSite(w * 0.27, h * 0.72, s);
      drawMiniRig(w * 0.73, h * 0.75, s);

      drawPerson(w * 0.38, h * 0.84, s * 0.9, "#FFE994", "point", false, 0);
      drawPerson(w * 0.6, h * 0.84, s * 0.9, "#CFF7BC", "doc", true, 1.3);

      drawCertificationPanel(w * 0.5, h * 0.58);

      drawFloatingCard(
        w * 0.22,
        h * 0.16,
        "Recruitment",
        "Energy talent",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.17,
        "Safety",
        "HSE checked",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.93,
        "Outcome",
        "Project ready ✓",
        "#A6E6EC",
        4,
      );

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
      className="font-arimo relative bg-[var(--color-primary-bg)] py-24 lg:py-40"
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-[#FFE994]"
        style={{
          clipPath: "ellipse(82% 45% at 50% 48%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="energy-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Oil, Gas & Energy Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {[
                "Specialist",
                "hiring",
                "for",
                "critical",
                "energy",
                "operations",
              ].map((word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="energy-what-word inline-block">{word}</span>
                </span>
              ))}
            </h2>

            <p className="energy-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Oil, gas and energy recruitment means sourcing, screening and
              coordinating skilled workers for refineries, offshore platforms,
              gas plants, EPC projects, renewables, power infrastructure and
              technical maintenance operations.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="energy-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <h3 className="text-lg font-bold tracking-[-0.03em] text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="energy-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Energy Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/oil-gas-energy"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View energy roles
              </a>
            </div>
          </div>

          <div className="energy-what-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:h-[680px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="energy-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div>

        <div className="energy-what-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] border border-black/10 bg-white/55 p-4"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#CFF7BC] text-sm font-bold text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="text-sm font-bold leading-5 text-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFE994]">
                <HardHat size={24} strokeWidth={2.4} />
              </div>

              <p className="max-w-2xl text-sm leading-6 text-black/70">
                This recruitment support is designed for energy projects where
                technical skill, safety awareness and readiness matter.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Start Hiring
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsOilGasEnergyRecruitment;
