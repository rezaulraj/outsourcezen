import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  ClipboardCheck,
  Cog,
  HardHat,
  Paintbrush,
  Radio,
  ShieldCheck,
  Ship,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

const roleGroups = [
  {
    title: "Shipyard Trades",
    roles: [
      "Welders",
      "Pipe Fitters",
      "Ship Fitters",
      "Steel Fabricators",
      "Hull Technicians",
      "CNC Operators",
    ],
    icon: Wrench,
    color: "#FFE994",
  },
  {
    title: "Marine Technical",
    roles: [
      "Marine Electricians",
      "Marine Mechanics",
      "Marine Engineers",
      "Naval Architects",
      "Engine Room Technicians",
      "Automation Technicians",
    ],
    icon: Cog,
    color: "#CFF7BC",
  },
  {
    title: "Deck & Offshore Crew",
    roles: [
      "Deck Crew",
      "Engine Room Crew",
      "Riggers",
      "Scaffolders",
      "Crane Assistants",
      "Offshore Support Crew",
    ],
    icon: Ship,
    color: "#A6E6EC",
  },
  {
    title: "Surface Treatment",
    roles: [
      "Painters",
      "Blasters",
      "Coating Inspectors",
      "Spray Painters",
      "Sandblasting Crew",
      "Surface Prep Workers",
    ],
    icon: Paintbrush,
    color: "#FFF6C8",
  },
  {
    title: "Safety & Quality",
    roles: [
      "QA/QC Inspectors",
      "HSE Officers",
      "Welding Inspectors",
      "Safety Supervisors",
      "NDT Technicians",
      "Compliance Coordinators",
    ],
    icon: ShieldCheck,
    color: "#FFE994",
  },
  {
    title: "Project Leadership",
    roles: [
      "Project Supervisors",
      "Foremen",
      "Site Coordinators",
      "Marine Project Managers",
      "Production Planners",
      "Team Leaders",
    ],
    icon: UsersRound,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "2200+", label: "Marine Workers" },
  { value: "120+", label: "Shipyard Projects" },
  { value: "30+", label: "Countries Supported" },
  { value: "24/7", label: "Recruitment Support" },
];

const RolesWeRecruit = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".marine-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".marine-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".marine-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".marine-role-stat", {
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
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % roleGroups.length);
    }, 2400);

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
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#FFF9E6");
      sky.addColorStop(0.5, "#F2E5C8");
      sky.addColorStop(0.76, "#D8C4A1");
      sky.addColorStop(1, "#A9B7BA");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

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

      for (let i = 0; i < 30; i++) {
        const x = ((i * 91) % w) + Math.sin(time + i) * 9;
        const y = ((i * 41) % (h * 0.58)) + Math.cos(time * 1.1 + i) * 7;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.sin(time * 2 + i) * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,181,58,0.25)";
        ctx.fill();
      }
    };

    const drawWater = () => {
      const y = h * 0.78;
      ctx.fillStyle = "#8EA5AA";
      ctx.fillRect(0, y, w, h - y);

      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const yy = y + 14 + i * 24;

        for (let x = -40; x <= w + 40; x += 26) {
          const waveY = yy + Math.sin(x * 0.02 + time * 2 + i) * 4;
          if (x === -40) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }

        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawDock = () => {
      const y = h * 0.78;

      ctx.fillStyle = "#2D2720";
      ctx.fillRect(0, y - 22, w, 28);

      for (let i = 0; i < 10; i++) {
        const x = i * (w / 9);

        ctx.beginPath();
        ctx.moveTo(x, y - 22);
        ctx.lineTo(x - 40, h);
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    };

    const drawShip = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(-220, -36);
      ctx.lineTo(210, -36);
      ctx.quadraticCurveTo(170, 62, -145, 58);
      ctx.quadraticCurveTo(-220, 35, -220, -36);
      ctx.closePath();

      const hull = ctx.createLinearGradient(0, -40, 0, 70);
      hull.addColorStop(0, "#1A242E");
      hull.addColorStop(0.58, "#243849");
      hull.addColorStop(0.59, "#8B3E2F");
      hull.addColorStop(1, "#5B2B25");

      ctx.fillStyle = hull;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.arc(-150 + i * 38, -13, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFE994";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rr(-85, -106, 165, 66, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        rr(-66 + i * 25, -88, 12, 12, 3);
        ctx.fillStyle = "#A6E6EC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCrane = (x, y, s, flip = false) => {
      ctx.save();
      ctx.translate(x, y);
      if (flip) ctx.scale(-1, 1);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -250);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -225);
      ctx.lineTo(200, -288);
      ctx.moveTo(0, -225);
      ctx.lineTo(165, -214);
      ctx.moveTo(40, -238);
      ctx.lineTo(55, -221);
      ctx.moveTo(80, -250);
      ctx.lineTo(98, -228);
      ctx.moveTo(120, -263);
      ctx.lineTo(138, -220);
      ctx.stroke();

      const hookX = 165 + Math.sin(time * 0.9) * 16;

      ctx.beginPath();
      ctx.moveTo(hookX, -274);
      ctx.lineTo(hookX, -142);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(hookX - 28, -128 + Math.sin(time * 1.4) * 5, 56, 46, 4);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-36, -20, 72, 28, 6);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawScaffold = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;

      for (let i = 0; i < 5; i++) {
        const xx = i * 28;
        ctx.beginPath();
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, -145);
        ctx.stroke();
      }

      for (let j = 0; j < 6; j++) {
        const yy = -j * 29;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(112, yy);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawWorker = (
      x,
      y,
      s,
      color = "#FFE994",
      action = "weld",
      flip = false,
      phase = 0
    ) => {
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
      ctx.moveTo(-8, 0);
      ctx.lineTo(-13, 28);
      ctx.moveTo(8, 0);
      ctx.lineTo(13, 28);
      ctx.stroke();

      rr(-18, -45, 36, 48, 8);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      let rightX = 40;
      let rightY = -26 + Math.sin(t * 3.5) * 4;

      if (action === "weld") {
        rightX = 45;
        rightY = -20;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
      }

      if (action === "rig") {
        rightX = 42;
        rightY = -52;
      }

      ctx.beginPath();
      ctx.moveTo(-15, -34);
      ctx.lineTo(-34, -18 + Math.sin(t * 3) * 3);
      ctx.moveTo(15, -34);
      ctx.lineTo(rightX, rightY);
      ctx.strokeStyle = color;
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

      if (action === "weld") {
        ctx.save();
        ctx.translate(rightX + 10, rightY);
        ctx.rotate(-0.2);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(28, 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
          const a = (Math.PI * 2 * i) / 8 + time * 5;
          const r = 8 + Math.sin(time * 8 + i) * 5;
          ctx.beginPath();
          ctx.moveTo(30, 8);
          ctx.lineTo(30 + Math.cos(a) * r, 8 + Math.sin(a) * r);
          ctx.strokeStyle = "#FFD36B";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      }

      if (action === "clipboard") {
        ctx.save();
        ctx.translate(rightX + 12, rightY);
        ctx.rotate(-0.18);
        rr(-10, -16, 20, 26, 4);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-4, -6);
        ctx.lineTo(5, -6);
        ctx.moveTo(-4, 1);
        ctx.lineTo(6, 1);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, -52);
      ctx.strokeStyle = "#E7B58B";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -66, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#E7B58B";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rr(-17, -82, 34, 12, 5);
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
      ctx.arc(-5, -65, 2, 0, Math.PI * 2);
      ctx.arc(5, -65, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, -58, 4, 0.1, Math.PI - 0.1);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawRoleBadge = () => {
      const item = roleGroups[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-155, -56, 310, 112, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-112, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE MARINE ROLE", 32, -14);

      ctx.font = "900 17px Arimo";
      ctx.fillText(item.title.toUpperCase(), 32, 16);

      ctx.beginPath();
      ctx.arc(135, -40, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawRoleOrbit = () => {
      const cx = w * 0.5;
      const cy = h * 0.45;
      const radius = Math.min(w, h) * 0.26;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 13]);
      ctx.lineDashOffset = -time * 45;
      ctx.stroke();
      ctx.setLineDash([]);

      roleGroups.forEach((item, index) => {
        const angle = (Math.PI * 2 * index) / roleGroups.length + time * 0.09;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.68;
        const isActive = index === activeRef.current;

        ctx.beginPath();
        ctx.arc(
          x,
          y,
          22 + (isActive ? Math.sin(time * 5) * 4 : 0),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = isActive ? item.color : "#FFF9E6";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = isActive ? 3 : 2.4;
        ctx.stroke();

        if (isActive) {
          ctx.beginPath();
          ctx.arc(x, y, 42 + Math.sin(time * 4) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(103,217,70,0.42)";
          ctx.lineWidth = 4;
          ctx.stroke();

          drawCheck(x + 22, y - 24, 0.45);
        }

        ctx.fillStyle = "#111";
        ctx.font = "900 9px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(String(index + 1).padStart(2, "0"), x, y + 3);
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

    const drawContainers = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      const colors = ["#A6E6EC", "#CFF7BC", "#FFE994"];

      for (let i = 0; i < 5; i++) {
        const xx = (i % 3) * 62;
        const yy = -Math.floor(i / 3) * 34;

        rr(xx, yy, 58, 30, 4);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      drawBackground();
      drawWater();
      drawDock();
      drawRoleBadge();
      drawRoleOrbit();

      const s = Math.min(w, h) / 820;

      drawCrane(w * 0.14, h * 0.78, s * 0.82, false);
      drawCrane(w * 0.88, h * 0.78, s * 0.74, true);

      drawShip(w * 0.52, h * 0.69, s * 0.9);
      drawScaffold(w * 0.59, h * 0.64, s * 0.7);

      drawContainers(w * 0.08, h * 0.75, s * 0.66);
      drawContainers(w * 0.73, h * 0.77, s * 0.62);

      drawWorker(w * 0.36, h * 0.86, s * 0.74, "#FFE994", "weld", false, 0);
      drawWorker(w * 0.62, h * 0.84, s * 0.69, "#CFF7BC", "rig", true, 1.1);
      drawWorker(w * 0.76, h * 0.86, s * 0.69, "#A6E6EC", "clipboard", false, 2.2);

      drawFloatingCard(w * 0.22, h * 0.25, "Shipyard Trades", "Welders", "#FFE994", 0);
      drawFloatingCard(w * 0.78, h * 0.25, "Technical", "Engineers", "#CFF7BC", 2);
      drawFloatingCard(w * 0.5, h * 0.94, "Deployment", "Crew ready ✓", "#A6E6EC", 4);

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
        <div className="marine-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Marine", "talent", "for", "every", "shipyard", "operation"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="marine-role-word inline-block">{word}</span>
                </span>
              )
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit skilled trades, marine technical workers, offshore crew,
            surface treatment teams, safety inspectors and project leadership.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            {roleGroups.map(({ icon: Icon, ...item }, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`marine-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6] shadow-xl"
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

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.roles.map((role) => (
                          <span
                            key={role}
                            className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold text-black/65"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="marine-role-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        {/* <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="marine-role-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="marine-role-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need certified marine workers for your project?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We support hiring for welding, pipe fitting, marine
                  electrical, rigging, painting, QA/QC, HSE, engineering and
                  shipyard project leadership.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Marine Staff
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>

        <div className="marine-role-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Welders",
            "Pipe Fitters",
            "Marine Electricians",
            "Riggers",
            "QA/QC",
            "HSE Officers",
            "Marine Engineers",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FFF9E6] px-4 py-2 text-sm font-bold text-black/65"
            >
              <ClipboardCheck size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesWeRecruit;