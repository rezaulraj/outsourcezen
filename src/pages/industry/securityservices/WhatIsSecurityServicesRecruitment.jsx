import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ClipboardCheck,
  Eye,
  Fingerprint,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Siren,
  UserCheck,
  UsersRound,
} from "lucide-react";

const servicePoints = [
  {
    title: "Site Protection",
    text: "Recruitment for guards, patrol officers, gate control staff and site security teams.",
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "CCTV & Control Room",
    text: "We help hire CCTV operators, control room staff and monitoring professionals.",
    icon: Camera,
    color: "#CFF7BC",
  },
  {
    title: "Access Control",
    text: "Security staff for building entrances, badge scanning, visitor control and reception points.",
    icon: Fingerprint,
    color: "#A6E6EC",
  },
  {
    title: "Event & Retail Security",
    text: "Security recruitment for events, malls, hotels, retail stores, warehouses and public spaces.",
    icon: UsersRound,
    color: "#FFF6C8",
  },
];

const steps = [
  "Security Need",
  "Guard Sourcing",
  "Background Review",
  "Training Check",
  "Client Selection",
  "Site Deployment",
];

const stats = [
  { value: "3200+", label: "Security Staff" },
  { value: "180+", label: "Sites Protected" },
  { value: "25+", label: "Countries Supported" },
  { value: "24/7", label: "Support Coverage" },
];

const WhatIsSecurityServicesRecruitment = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".security-what-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".security-what-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".security-what-card", {
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

    const drawCheck = (x, y, s = 1) => {
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

    const drawBackground = () => {
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#FFF9E6");
      bg.addColorStop(0.5, "#F1E7D0");
      bg.addColorStop(1, "#D3C3A6");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const floorY = h * 0.8;
      ctx.fillStyle = "#B7A98F";
      ctx.fillRect(0, floorY, w, h - floorY);

      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(w, floorY);
      ctx.stroke();

      ctx.save();
      ctx.globalAlpha = 0.07;
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

      for (let i = 0; i < 35; i++) {
        const x = ((i * 89) % w) + Math.sin(time + i) * 8;
        const y = ((i * 47) % h) + Math.cos(time * 1.1 + i) * 7;

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawBuilding = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-130, -250, 260, 270, 22);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      rr(-52, -62, 104, 82, 14);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          rr(-96 + c * 52, -212 + r * 40, 27, 23, 5);
          ctx.fillStyle =
            Math.sin(time * 2 + r + c) > 0.2 ? "#A6E6EC" : "#FFE994";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rr(-116, -274, 232, 34, 12);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.fillStyle = "#FFF9E6";
      ctx.font = "900 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURE FACILITY", 0, -252);

      ctx.restore();
    };

    const drawCctvWall = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.2) * 4);
      ctx.scale(s, s);

      rr(-145, -112, 290, 198, 22);
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.strokeStyle = "#CFF7BC";
      ctx.lineWidth = 2;
      ctx.stroke();

      const labels = ["Gate", "Lobby", "Parking", "Warehouse"];

      for (let i = 0; i < 4; i++) {
        const xx = -126 + (i % 2) * 132;
        const yy = -92 + Math.floor(i / 2) * 88;

        rr(xx, yy, 118, 72, 10);
        ctx.fillStyle = "#1E2B2A";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xx + 14, yy + 45 + Math.sin(time * 2 + i) * 8);
        ctx.lineTo(xx + 42, yy + 30);
        ctx.lineTo(xx + 72, yy + 46);
        ctx.lineTo(xx + 103, yy + 25);
        ctx.strokeStyle = "#67D946";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#CFF7BC";
        ctx.font = "800 9px Arimo";
        ctx.fillText(labels[i], xx + 18, yy + 16);

        ctx.beginPath();
        ctx.arc(
          xx + 100,
          yy + 14,
          5 + Math.sin(time * 5 + i) * 1.5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = i === 1 ? "#FFE994" : "#67D946";
        ctx.fill();
      }

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE CCTV MONITORING", 0, 68);

      ctx.restore();
    };

    const drawAccessGate = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-145, -88, 290, 90, 18);
      ctx.fillStyle = "#111";
      ctx.fill();

      rr(-130, -72, 260, 58, 14);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();

      const barX = -110 + ((time * 65) % 220);
      ctx.beginPath();
      ctx.moveTo(barX, -72);
      ctx.lineTo(barX, -14);
      ctx.strokeStyle = "rgba(103,217,70,0.65)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACCESS CONTROL", 0, -38);

      rr(-166, -120, 42, 122, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-145, -82, 12 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawGuard = (x, y, s, flip = false, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3 + phase) * 2);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      const t = time + phase;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(-15, 32);
      ctx.moveTo(9, 0);
      ctx.lineTo(15, 32);
      ctx.stroke();

      rr(-21, -50, 42, 54, 9);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.stroke();

      rr(-15, -42, 30, 38, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -38);
      ctx.lineTo(-39, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(18, -38);
      ctx.lineTo(42, -28 + Math.sin(t * 2.6) * 4);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-39, -18 + Math.sin(t * 3) * 3, 5, 0, Math.PI * 2);
      ctx.arc(42, -28 + Math.sin(t * 2.6) * 4, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(52, -30 + Math.sin(t * 2.6) * 4);
      ctx.rotate(-0.12);
      rr(-8, -12, 22, 28, 5);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(3, 2, 5 + Math.sin(time * 5) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(0, -58);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -72, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-19, -90, 38, 13, 5);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, -80);
      ctx.quadraticCurveTo(0, -102, 18, -80);
      ctx.fillStyle = "#1C1810";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-5, -71, 2, 0, Math.PI * 2);
      ctx.arc(5, -71, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -64, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawFlow = () => {
      const points = [
        { x: w * 0.15, y: h * 0.26, label: "NEED", color: "#FFE994" },
        { x: w * 0.32, y: h * 0.41, label: "SOURCE", color: "#CFF7BC" },
        { x: w * 0.5, y: h * 0.31, label: "VERIFY", color: "#A6E6EC" },
        { x: w * 0.68, y: h * 0.43, label: "TRAIN", color: "#FFF6C8" },
        { x: w * 0.85, y: h * 0.29, label: "DEPLOY", color: "#FFE994" },
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

        if (index <= Math.floor((time * 0.58) % points.length)) {
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
    };

    const drawDashboard = (x, y) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.3) * 5);

      rr(-118, -58, 236, 116, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURITY RECRUITMENT", 0, -30);

      ["Guards", "CCTV", "Patrol"].forEach((item, i) => {
        const yy = -2 + i * 25;

        ctx.beginPath();
        ctx.arc(-58, yy, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-58, yy, 0.36);

        ctx.fillStyle = "#111";
        ctx.font = "800 11px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -38, yy + 4);
      });

      ctx.restore();
    };

    const drawFloatingCard = (x, y, title, value, color, phase = 0) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.45 + phase) * 6);

      rr(-92, -32, 184, 64, 20);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-60, 0, 17, 0, Math.PI * 2);
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawFlow();

      const s = Math.min(w, h) / 820;

      drawBuilding(w * 0.52, h * 0.72, s * 0.78);
      drawAccessGate(w * 0.52, h * 0.82, s * 0.88);

      drawCctvWall(w * 0.23, h * 0.53, s * 0.66);
      drawGuard(w * 0.36, h * 0.88, s * 0.72, false, 0);
      drawGuard(w * 0.72, h * 0.88, s * 0.68, true, 1.2);

      drawDashboard(w * 0.77, h * 0.55);

      drawFloatingCard(
        w * 0.22,
        h * 0.18,
        "Site Security",
        "Guards",
        "#FFE994",
        0,
      );
      drawFloatingCard(w * 0.78, h * 0.18, "Monitoring", "CCTV", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.96,
        "Outcome",
        "Site protected ✓",
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
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="security-what-reveal mb-3 inline-block border-b border-black text-sm font-medium text-black">
              What Is Security Services Recruitment?
            </p>

            <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
              {["Reliable", "security", "staffing", "for", "safe", "sites"].map(
                (word) => (
                  <span
                    key={word}
                    className="inline-block overflow-hidden px-1"
                  >
                    <span className="security-what-word inline-block">
                      {word}
                    </span>
                  </span>
                ),
              )}
            </h2>

            <p className="security-what-reveal mt-6 max-w-xl text-base leading-7 text-black/75">
              Security Services Recruitment means sourcing, screening and
              deploying trained security personnel for buildings, events, retail
              stores, warehouses, construction sites, hotels, residential
              properties and control rooms.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {servicePoints.map(({ icon: Icon, ...item }) => (
                <article
                  key={item.title}
                  className="security-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-5"
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

            <div className="security-what-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
              >
                Request Security Staff
                <ArrowRight size={16} />
              </a>

              <a
                href="/industries/security-services"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-4 text-sm font-bold text-black"
              >
                View security roles
              </a>
            </div>
          </div>

          <div className="security-what-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:h-[680px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="security-what-card rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="security-what-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
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
                <LockKeyhole size={24} strokeWidth={2.4} />
              </div>

              <p className="max-w-2xl text-sm leading-6 text-black/70">
                This service helps employers build dependable security coverage
                with trained guards, verified profiles, monitoring support and
                smooth deployment coordination.
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

export default WhatIsSecurityServicesRecruitment;
