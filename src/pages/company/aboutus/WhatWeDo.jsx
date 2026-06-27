import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  SearchCheck,
  ShieldCheck,
  Truck,
  UserCheck,
  UserSearch,
  UsersRound,
} from "lucide-react";

const services = [
  {
    title: "Workforce Sourcing",
    text: "We identify suitable workers based on role, industry, location, quantity and employer requirements.",
    icon: UserSearch,
    color: "#FFE994",
  },
  {
    title: "Candidate Screening",
    text: "We review candidate readiness, experience, communication, reliability and role suitability.",
    icon: SearchCheck,
    color: "#CFF7BC",
  },
  {
    title: "Documentation Support",
    text: "We support candidate file preparation, required document flow and employer coordination.",
    icon: FileCheck2,
    color: "#A6E6EC",
  },
  {
    title: "Employer Coordination",
    text: "We help employers review shortlisted profiles and move forward with clear communication.",
    icon: Handshake,
    color: "#FFF6C8",
  },
  {
    title: "Deployment Support",
    text: "We support the practical steps needed to prepare workers for placement and arrival.",
    icon: Truck,
    color: "#FFE994",
  },
  {
    title: "Ongoing Workforce Support",
    text: "We stay connected to support smoother hiring, replacement needs and long-term workforce planning.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const process = [
  "Understand hiring need",
  "Source suitable workers",
  "Screen and shortlist",
  "Coordinate documents",
  "Employer approval",
  "Deployment support",
];

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".what-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 2600);

    return () => clearInterval(timer);
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
      jacket,
      skin,
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
      ctx.lineTo(-12 + Math.sin(t * 2) * 2, 25);
      ctx.moveTo(7, 0);
      ctx.lineTo(12 + Math.cos(t * 2) * 2, 25);
      ctx.stroke();

      rr(-17, -42, 34, 45, 8);
      ctx.fillStyle = jacket;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-6, -42);
      ctx.lineTo(0, -18);
      ctx.lineTo(6, -42);
      ctx.fillStyle = "#fff";
      ctx.fill();

      let rightX = 34;
      let rightY = -24 + Math.sin(t * 3.5) * 4;

      if (action === "point") {
        rightX = 42;
        rightY = -48;
      }

      if (action === "doc") {
        rightX = 42;
        rightY = -28;
      }

      if (action === "handshake") {
        rightX = 43;
        rightY = -28;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -17 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = jacket;
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-34, -17 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(rightX, rightY, 5, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();

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
      ctx.strokeStyle = skin;
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -64, 14, 0, Math.PI * 2);
      ctx.fillStyle = skin;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -68, 15, Math.PI * 0.85, Math.PI * 2.15);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

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

    const drawOffice = () => {
      const floorY = h * 0.78;

      const wall = ctx.createLinearGradient(0, 0, 0, floorY);
      wall.addColorStop(0, "#FFF9E6");
      wall.addColorStop(1, "#F5ECD7");
      ctx.fillStyle = wall;
      ctx.fillRect(0, 0, w, floorY);

      const floor = ctx.createLinearGradient(0, floorY, 0, h);
      floor.addColorStop(0, "#E8DFC8");
      floor.addColorStop(1, "#D8CDB2");
      ctx.fillStyle = floor;
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

      for (let i = 0; i <= 8; i++) {
        const x = (i / 8) * w;
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.12, floorY);
        ctx.lineTo(x, h);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) {
        const y = floorY + (h - floorY) * Math.pow(i / 6, 1.6);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = "rgba(0,0,0,0.07)";
        ctx.stroke();
      }
    };

    const drawDesk = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-126, -22, 252, 38, 15);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#E7B53A";
      ctx.lineWidth = 2;
      ctx.stroke();

      rr(-42, -66, 84, 48, 9);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(0, -8);
      ctx.moveTo(-22, -8);
      ctx.lineTo(22, -8);
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawPipeline = () => {
      const points = [
        [w * 0.16, h * 0.25],
        [w * 0.34, h * 0.38],
        [w * 0.5, h * 0.3],
        [w * 0.66, h * 0.4],
        [w * 0.84, h * 0.28],
      ];

      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 12]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach(([x, y], index) => {
        const isActive =
          index === activeRef.current || index < activeRef.current;

        ctx.beginPath();
        ctx.arc(x, y, 22 + Math.sin(time * 3 + index) * 2, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#67D946" : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (isActive) drawCheck(x, y, 0.55);
      });

      for (let i = 0; i < 4; i++) {
        const p = (time * 0.15 + i * 0.25) % 1;
        const total = points.length - 1;
        const seg = Math.min(Math.floor(p * total), total - 1);
        const local = p * total - seg;

        const [x1, y1] = points[seg];
        const [x2, y2] = points[seg + 1];

        const x = x1 + (x2 - x1) * local;
        const y = y1 + (y2 - y1) * local;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time * 2 + i) * 0.12);

        rr(-12, -16, 24, 22, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    };

    const drawActiveServiceBadge = () => {
      const service = services[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.12 + Math.sin(time * 1.2) * 5);

      rr(-148, -54, 296, 108, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-106, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = service.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("WHAT WE DO", 28, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(service.title.toUpperCase(), 28, 16);

      ctx.beginPath();
      ctx.arc(128, -38, 7 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
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
      for (let i = 0; i < 30; i++) {
        const x = ((i * 83) % w) + Math.sin(time + i) * 9;
        const y = ((i * 47) % h) + Math.cos(time * 1.15 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.3 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawOffice();
      drawGrid();
      drawParticles();
      drawActiveServiceBadge();
      drawPipeline();

      const floorY = h * 0.78;
      const s = Math.min(w, h) / 760;

      drawDesk(w * 0.5, floorY, s);

      drawPerson(w * 0.27, floorY, s, "#1C1810", "#E7B58B", "point", false, 0);
      drawPerson(w * 0.5, floorY, s, "#2C3F68", "#C7895C", "doc", false, 1);
      drawPerson(
        w * 0.72,
        floorY,
        s,
        "#2E6A3F",
        "#F0C39A",
        "handshake",
        true,
        2,
      );

      drawFloatingCard(
        w * 0.22,
        h * 0.56,
        "Employers",
        "Need workers",
        "#FFE994",
        0,
      );
      drawFloatingCard(
        w * 0.78,
        h * 0.56,
        "Candidates",
        "Ready to work",
        "#CFF7BC",
        2,
      );
      drawFloatingCard(
        w * 0.5,
        h * 0.9,
        "Result",
        "Placement support ✓",
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
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="what-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            What We Do
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Practical",
              "recruitment",
              "support",
              "from",
              "need",
              "to",
              "placement",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="what-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We support employers with sourcing, screening, documentation
            coordination, shortlist management and workforce deployment.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="what-reveal relative h-[500px] overflow-hidden sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {services.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`what-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/75 hover:border-black/30"
                  }`}
                >
                  <div className="flex gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon size={24} strokeWidth={2.4} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/70">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="what-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {process.map((item, index) => (
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
                <BadgeCheck size={24} strokeWidth={2.4} />
              </div>

              <p className="max-w-2xl text-sm leading-6 text-black/70">
                Our work connects employer requirements with practical candidate
                preparation and placement support.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Start Hiring
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
