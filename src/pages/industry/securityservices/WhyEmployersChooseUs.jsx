import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  Clock3,
  Fingerprint,
  Globe2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

const benefits = [
  {
    title: "Verified Security Staff",
    text: "Candidates are reviewed for discipline, appearance, communication, experience and site readiness.",
    icon: Fingerprint,
    color: "#FFE994",
  },
  {
    title: "Fast Deployment",
    text: "Quick shortlisting for urgent guards, CCTV operators, patrol officers and supervisors.",
    icon: Zap,
    color: "#CFF7BC",
  },
  {
    title: "24/7 Coverage Support",
    text: "We support day-night shift coverage, replacement needs and emergency staffing requests.",
    icon: Clock3,
    color: "#A6E6EC",
  },
  {
    title: "Compliance Focused",
    text: "Security staff are matched with site rules, reporting duties and client safety expectations.",
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Multi-Site Experience",
    text: "Recruitment support for offices, hotels, malls, warehouses, factories, events and residential sites.",
    icon: Building2,
    color: "#FFE1A6",
  },
  {
    title: "Reliable Workforce",
    text: "We help reduce missed shifts, weak attendance and unstable security coverage.",
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "3200+", label: "Security Staff" },
  { value: "180+", label: "Sites Protected" },
  { value: "48h", label: "Initial Shortlist" },
  { value: "24/7", label: "Support Coverage" },
];

const trustTags = [
  "Verified Guards",
  "CCTV Operators",
  "Access Control",
  "24/7 Support",
  "Fast Deployment",
  "Compliance Ready",
];

const WhyEmployersChooseUs = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".security-why-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".security-why-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".security-why-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".security-why-stat", {
        y: 25,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.55,
        ease: "back.out(1.5)",
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

      for (let i = 0; i < 34; i++) {
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

      rr(-128, -250, 256, 270, 22);
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
          rr(-94 + c * 52, -212 + r * 40, 27, 23, 5);
          ctx.fillStyle =
            Math.sin(time * 2 + r + c) > 0.2 ? "#A6E6EC" : "#FFE994";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      rr(-112, -276, 224, 34, 12);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.fillStyle = "#FFF9E6";
      ctx.font = "900 15px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("SECURE HQ", 0, -253);

      ctx.restore();
    };

    const drawShield = (cx, cy, s) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const pulse = 1 + Math.sin(time * 2) * 0.04;
      ctx.scale(pulse, pulse);

      ctx.beginPath();
      ctx.moveTo(0, -160);
      ctx.quadraticCurveTo(95, -125, 105, -35);
      ctx.quadraticCurveTo(85, 95, 0, 160);
      ctx.quadraticCurveTo(-85, 95, -105, -35);
      ctx.quadraticCurveTo(-95, -125, 0, -160);
      ctx.closePath();

      ctx.fillStyle = "rgba(103,217,70,0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(103,217,70,0.55)";
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-44, 0);
      ctx.lineTo(-12, 36);
      ctx.lineTo(58, -50);
      ctx.strokeStyle = "rgba(103,217,70,0.75)";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.restore();
    };

    const drawRadar = (cx, cy, r) => {
      ctx.save();
      ctx.translate(cx, cy);

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.14)";
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, (r / 3) * i, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.stroke();
      }

      const a = time * 1.6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      ctx.strokeStyle = "rgba(103,217,70,0.85)";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

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
          Math.PI * 2
        );
        ctx.fillStyle = i === 1 ? "#FFE994" : "#67D946";
        ctx.fill();
      }

      ctx.fillStyle = "#CFF7BC";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("LIVE SECURITY DASHBOARD", 0, 68);

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

    const drawAccessPanel = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.35) * 5);
      ctx.scale(s, s);

      rr(-110, -78, 220, 156, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "900 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("VERIFICATION FLOW", 0, -48);

      const rows = ["Background", "Training", "Client Ready"];

      rows.forEach((item, i) => {
        const yy = -14 + i * 34;

        ctx.beginPath();
        ctx.arc(-62, yy, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawCheck(-62, yy, 0.4);

        ctx.fillStyle = "#111";
        ctx.font = "800 12px Arimo";
        ctx.textAlign = "left";
        ctx.fillText(item, -40, yy + 4);
      });

      ctx.restore();
    };

    const drawNetwork = () => {
      const center = { x: w * 0.52, y: h * 0.45 };
      const nodes = [
        { x: w * 0.24, y: h * 0.3 },
        { x: w * 0.78, y: h * 0.3 },
        { x: w * 0.25, y: h * 0.68 },
        { x: w * 0.78, y: h * 0.68 },
      ];

      nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = "rgba(103,217,70,0.32)";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 40;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(node.x, node.y, 9 + Math.sin(time * 3 + i) * 2, 0, Math.PI * 2);
        ctx.fillStyle = "#67D946";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
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

      const s = Math.min(w, h) / 820;

      drawNetwork();
      drawRadar(w * 0.52, h * 0.45, Math.min(w, h) * 0.28);
      drawShield(w * 0.52, h * 0.48, s * 0.9);

      drawBuilding(w * 0.52, h * 0.73, s * 0.74);
      drawCctvWall(w * 0.24, h * 0.45, s * 0.62);
      drawAccessPanel(w * 0.78, h * 0.45, s * 0.7);

      drawGuard(w * 0.34, h * 0.88, s * 0.72, false, 0);
      drawGuard(w * 0.72, h * 0.88, s * 0.68, true, 1.2);

      drawFloatingCard(w * 0.22, h * 0.18, "Verified", "Staff", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.18, "Coverage", "24/7", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.96, "Trust", "Site protected ✓", "#A6E6EC", 4);

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
        <div className="security-why-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Why Employers Choose Us
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Trusted", "security", "staffing", "for", "critical", "sites"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="security-why-word inline-block">{word}</span>
                </span>
              )
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            Employers choose us because we provide reliable, verified and
            deployment-ready security staff for offices, hotels, malls,
            warehouses, construction sites, events and residential properties.
          </p>
        </div>

        <div className="security-why-reveal mb-12 h-[500px] overflow-hidden rounded-[42px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[620px] lg:h-[720px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, ...item }) => (
            <article
              key={item.title}
              className="security-why-card group rounded-[30px] border border-black/10 bg-[#FFF9E6] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black/25"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ backgroundColor: item.color }}
              >
                <Icon size={24} strokeWidth={2.4} />
              </div>

              <h3 className="text-xl font-bold tracking-[-0.03em] text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="security-why-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
            >
              <p className="text-4xl font-normal tracking-[-0.06em] text-black">
                {item.value}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                {item.label}
              </p>
            </article>
          ))}
        </div> */}

        <div className="security-why-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <LockKeyhole size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need trusted security professionals?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We help employers hire verified security guards, CCTV
                  operators, access control officers, event security, retail
                  security, supervisors and 24/7 site coverage teams.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Security Staff
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="security-why-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {trustTags.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <Sparkles size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEmployersChooseUs;