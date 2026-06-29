import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BadgeCheck,
  Cable,
  ClipboardCheck,
  Flame,
  Gauge,
  Hammer,
  HardHat,
  ShieldCheck,
  Sun,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

const roleGroups = [
  {
    title: "Engineering & Technical",
    roles: [
      "Petroleum Engineer",
      "Mechanical Engineer",
      "Electrical Engineer",
      "Instrumentation Engineer",
      "Pipeline Engineer",
      "Drilling Engineer",
    ],
    icon: Gauge,
    color: "#FFE994",
  },
  {
    title: "Offshore & Rig Crew",
    roles: [
      "Rig Electrician",
      "Rig Mechanic",
      "Crane Operator",
      "Rigger",
      "Derrickman",
      "Roustabout",
    ],
    icon: Flame,
    color: "#CFF7BC",
  },
  {
    title: "Construction & Fabrication",
    roles: [
      "Welder",
      "Pipe Fitter",
      "Scaffolder",
      "Fabricator",
      "Steel Fixer",
      "Mechanical Fitter",
    ],
    icon: Hammer,
    color: "#A6E6EC",
  },
  {
    title: "HSE & Quality",
    roles: [
      "HSE Officer",
      "Safety Supervisor",
      "QA/QC Inspector",
      "Permit Coordinator",
      "Site Safety Officer",
      "Quality Technician",
    ],
    icon: ShieldCheck,
    color: "#FFF6C8",
  },
  {
    title: "Operations & Maintenance",
    roles: [
      "Production Operator",
      "Maintenance Technician",
      "Plant Operator",
      "Control Room Operator",
      "Valve Technician",
      "Rotating Equipment Technician",
    ],
    icon: Wrench,
    color: "#FFE994",
  },
  {
    title: "Renewable Energy",
    roles: [
      "Wind Turbine Technician",
      "Solar Installation Technician",
      "Electrical Technician",
      "Grid Technician",
      "Energy Storage Technician",
      "Power Systems Technician",
    ],
    icon: Sun,
    color: "#CFF7BC",
  },
];

const stats = [
  { value: "1500+", label: "Energy Professionals" },
  { value: "20+", label: "Energy Projects" },
  { value: "18+", label: "Countries Supported" },
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
      gsap.from(".energy-role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.055,
        ease: "power4.out",
      });

      gsap.from(".energy-role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".energy-role-card", {
        y: 35,
        opacity: 1,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.07,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".energy-role-stat", {
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

    const drawWorker = (
      x,
      y,
      s,
      color = "#FFE994",
      action = "tool",
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
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      let rightX = 35;
      let rightY = -24 + Math.sin(t * 3.5) * 4;

      if (action === "point") {
        rightX = 44;
        rightY = -50;
      }

      if (action === "wrench") {
        rightX = 42;
        rightY = -25;
      }

      if (action === "clipboard") {
        rightX = 38;
        rightY = -32;
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

      if (action === "wrench") {
        ctx.beginPath();
        ctx.moveTo(rightX, rightY);
        ctx.lineTo(rightX + 24, rightY - 18);
        ctx.moveTo(rightX + 24, rightY - 18);
        ctx.lineTo(rightX + 31, rightY - 8);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;
        ctx.stroke();
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

    const drawRig = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      rr(-88, -18, 176, 26, 8);
      ctx.fillStyle = "#1C1810";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-68, -18);
      ctx.lineTo(0, -165);
      ctx.lineTo(68, -18);
      ctx.moveTo(-40, -18);
      ctx.lineTo(0, -115);
      ctx.lineTo(40, -18);
      ctx.moveTo(-42, -78);
      ctx.lineTo(42, -78);
      ctx.moveTo(-24, -125);
      ctx.lineTo(24, -125);
      ctx.stroke();

      rr(32, -105, 48, 24, 7);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const drawRefinery = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-105, -42, 210, 58, 12);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      const tower = (tx, height, color) => {
        rr(tx - 10, -42 - height, 20, height, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.globalAlpha = 0.14;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(
            tx + Math.sin(time + i) * 8,
            -54 - height - i * 11,
            12 + i * 3,
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

      tower(-72, 116, "#1C1810");
      tower(-28, 88, "#2E2618");
      tower(70, 108, "#1C1810");

      rr(20, -135, 56, 94, 12);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.stroke();

      ctx.restore();
    };

    const drawWindTurbine = (x, y, s, phase = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -120);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -120, 11, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(0, -120);
      ctx.rotate(time * 1.2 + phase);

      for (let i = 0; i < 3; i++) {
        ctx.rotate((Math.PI * 2) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -58);
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 5;
        ctx.stroke();

        rr(-5, -63, 10, 40, 7);
        ctx.fillStyle = "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
      ctx.restore();
    };

    const drawSolarPanels = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          ctx.save();
          ctx.translate(col * 44, row * 32);
          ctx.rotate(-0.18);

          rr(-18, -11, 36, 22, 5);
          ctx.fillStyle = "#A6E6EC";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-18, 0);
          ctx.lineTo(18, 0);
          ctx.moveTo(-6, -11);
          ctx.lineTo(-6, 11);
          ctx.moveTo(6, -11);
          ctx.lineTo(6, 11);
          ctx.strokeStyle = "rgba(0,0,0,0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        }
      }

      ctx.restore();
    };

    const drawRoleBadge = () => {
      const item = roleGroups[activeRef.current];

      ctx.save();
      ctx.translate(w * 0.5, h * 0.13 + Math.sin(time * 1.2) * 5);

      rr(-150, -54, 300, 108, 30);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-108, 0, 24, 0, Math.PI * 2);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("ACTIVE ROLE GROUP", 30, -14);

      ctx.font = "900 18px Arimo";
      ctx.fillText(item.title.toUpperCase(), 30, 16);

      ctx.beginPath();
      ctx.arc(130, -38, 7 + Math.sin(time * 5) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();

      ctx.restore();
    };

    const drawPipeline = () => {
      const y = h * 0.8;

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
      ctx.strokeStyle = "#1C1810";
      ctx.lineWidth = 9;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(w * 0.08, y);
      ctx.lineTo(w * 0.92, y);
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
          Math.PI * 2,
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
      drawRoleBadge();
      drawRoleOrbit();
      drawPipeline();

      const s = Math.min(w, h) / 800;

      drawRefinery(w * 0.23, h * 0.72, s * 0.86);
      drawRig(w * 0.5, h * 0.76, s * 0.9);
      drawWindTurbine(w * 0.78, h * 0.74, s * 0.8);
      drawSolarPanels(w * 0.68, h * 0.82, s * 0.75);

      drawWorker(w * 0.33, h * 0.86, s * 0.82, "#FFE994", "point", false, 0);
      drawWorker(
        w * 0.6,
        h * 0.86,
        s * 0.82,
        "#CFF7BC",
        "clipboard",
        true,
        1.2,
      );
      drawWorker(w * 0.72, h * 0.86, s * 0.78, "#A6E6EC", "wrench", false, 2.2);

      drawFloatingCard(
        w * 0.22,
        h * 0.23,
        "Technical",
        "Engineers",
        "#FFE994",
        0,
      );
      drawFloatingCard(w * 0.78, h * 0.24, "HSE", "Safety roles", "#CFF7BC", 2);
      drawFloatingCard(
        w * 0.5,
        h * 0.93,
        "Deployment",
        "Skilled crew ✓",
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
      id="energy-roles"
      className="font-arimo bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="energy-role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {[
              "Skilled",
              "professionals",
              "for",
              "critical",
              "energy",
              "projects",
            ].map((word) => (
              <span key={word} className="inline-block overflow-hidden px-1">
                <span className="energy-role-word inline-block">{word}</span>
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit engineers, offshore crew, fabrication workers, HSE
            professionals, maintenance teams and renewable energy technicians.
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
                  className={`energy-role-card w-full rounded-[30px] border p-6 text-left transition-all duration-300 ${
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

          <div className="energy-role-reveal relative h-[500px] overflow-hidden rounded-[40px] border border-black/10 bg-[#FFF9E6] shadow-xl sm:h-[600px] lg:sticky lg:top-24 lg:h-[690px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="energy-role-stat rounded-[28px] border border-black/10 bg-[#FFF9E6] p-6 text-center"
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

        <div className="energy-role-reveal mt-10 rounded-[34px] border border-black/10 bg-[#FFF9E6] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#CFF7BC]">
                <HardHat size={28} strokeWidth={2.4} />
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-black">
                  Need a specific energy role?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
                  We can support project-based hiring, shutdown staffing,
                  offshore recruitment, technical maintenance teams and
                  renewable energy workforce needs.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Request Roles
              <BadgeCheck size={16} />
            </a>
          </div>
        </div>

        <div className="energy-role-reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            "Engineers",
            "HSE",
            "Offshore Crew",
            "Welders",
            "Technicians",
            "Renewables",
            "QA/QC",
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
