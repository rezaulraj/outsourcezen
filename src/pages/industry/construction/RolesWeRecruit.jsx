import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  BrickWall,
  Brush,
  Cable,
  Drill,
  Hammer,
  HardHat,
  Pickaxe,
  Ruler,
  Truck,
  Wrench,
} from "lucide-react";

const roles = [
  {
    title: "Mason",
    group: "Skilled Trade",
    text: "Brickwork, blockwork, plastering and site finishing support.",
    icon: BrickWall,
    color: "#FFE994",
  },
  {
    title: "Carpenter",
    group: "Skilled Trade",
    text: "Formwork, framing, finishing and timber construction tasks.",
    icon: Hammer,
    color: "#CFF7BC",
  },
  {
    title: "Steel Fixer",
    group: "Structural",
    text: "Rebar cutting, bending, tying and structural reinforcement work.",
    icon: Wrench,
    color: "#A6E6EC",
  },
  {
    title: "Electrician",
    group: "Technical",
    text: "Electrical installation, wiring, maintenance and safety checks.",
    icon: Cable,
    color: "#FFF6C8",
  },
  {
    title: "Plumber",
    group: "Technical",
    text: "Pipe installation, drainage, sanitary fittings and water systems.",
    icon: Wrench,
    color: "#FFE994",
  },
  {
    title: "Painter",
    group: "Finishing",
    text: "Surface preparation, coating, painting and finishing works.",
    icon: Brush,
    color: "#CFF7BC",
  },
  {
    title: "Tile Setter",
    group: "Finishing",
    text: "Floor and wall tile installation with accurate alignment.",
    icon: Ruler,
    color: "#A6E6EC",
  },
  {
    title: "Crane Operator",
    group: "Equipment",
    text: "Safe lifting, crane handling and site equipment operation.",
    icon: Truck,
    color: "#FFF6C8",
  },
  {
    title: "Site Supervisor",
    group: "Leadership",
    text: "Team coordination, daily reporting and site productivity control.",
    icon: HardHat,
    color: "#FFE994",
  },
  {
    title: "General Helper",
    group: "Support",
    text: "Material handling, cleaning, lifting and general site assistance.",
    icon: Pickaxe,
    color: "#CFF7BC",
  },
  {
    title: "Welder",
    group: "Skilled Trade",
    text: "Metal joining, fabrication, repair and structural welding support.",
    icon: Drill,
    color: "#A6E6EC",
  },
  {
    title: "HVAC Technician",
    group: "Technical",
    text: "HVAC installation, servicing, ducting and maintenance support.",
    icon: Wrench,
    color: "#FFF6C8",
  },
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
      gsap.from(".role-word", {
        y: 55,
        opacity: 0,
        rotateX: 60,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".role-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".role-card", {
        y: 28,
        opacity: 1,
        duration: 0.65,
        stagger: 0.04,
        delay: 0.35,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % roles.length);
    }, 1800);

    return () => clearInterval(timer);
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

    const drawWorker = (x, y, scale, role) => {
      ctx.save();
      ctx.translate(x, y + Math.sin(time * 1.6 + role) * 4);
      ctx.scale(scale, scale);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -18, 8, 0, Math.PI * 2);
      ctx.fillStyle = role % 2 === 0 ? "#F4C542" : "#67D946";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -23, 9, Math.PI, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, -22);
      ctx.lineTo(12, -22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(-14, 8 + Math.sin(time * 4 + role) * 4);
      ctx.moveTo(0, -2);
      ctx.lineTo(15, 7 + Math.cos(time * 4 + role) * 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-10, 36);
      ctx.moveTo(0, 18);
      ctx.lineTo(10, 36);
      ctx.stroke();

      const tool = role % 4;

      if (tool === 0) {
        ctx.beginPath();
        ctx.moveTo(15, 7);
        ctx.lineTo(32, -4);
        ctx.stroke();
      }

      if (tool === 1) {
        rr(17, -3, 18, 14, 3);
        ctx.fillStyle = "#F4C542";
        ctx.fill();
        ctx.stroke();
      }

      if (tool === 2) {
        ctx.beginPath();
        ctx.moveTo(-22, 7);
        ctx.lineTo(-9, -2);
        ctx.lineTo(-1, 12);
        ctx.stroke();
      }

      if (tool === 3) {
        ctx.beginPath();
        ctx.moveTo(16, 8);
        ctx.lineTo(32, 8);
        ctx.moveTo(28, 2);
        ctx.lineTo(34, 8);
        ctx.lineTo(28, 14);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawBuildingSkeleton = (cx, cy) => {
      const bw = Math.min(w * 0.5, 360);
      const bh = Math.min(h * 0.65, 430);
      const floors = 6;
      const floorH = bh / floors;

      rr(cx - bw / 2, cy - bh / 2, bw, bh, 24);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      ctx.stroke();

      for (let i = 0; i <= floors; i++) {
        const y = cy - bh / 2 + i * floorH;
        ctx.beginPath();
        ctx.moveTo(cx - bw / 2, y);
        ctx.lineTo(cx + bw / 2, y);
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 9]);
        ctx.lineDashOffset = -time * 28;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (let i = 0; i < 4; i++) {
        const x = cx - bw / 2 + (bw / 3) * i;
        ctx.beginPath();
        ctx.moveTo(x, cy - bh / 2);
        ctx.lineTo(x, cy + bh / 2);
        ctx.strokeStyle = "rgba(0,0,0,0.14)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      return { bw, bh, floorH };
    };

    const drawRoleBadge = (cx, cy, roleIndex) => {
      const role = roles[roleIndex];

      rr(cx - 110, cy - 44, 220, 88, 24);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 13px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(role.group.toUpperCase(), cx, cy - 10);

      ctx.font = "800 20px Arimo";
      ctx.fillText(role.title, cx, cy + 18);

      ctx.beginPath();
      ctx.arc(cx + 92, cy - 28, 16, 0, Math.PI * 2);
      ctx.fillStyle = role.color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      const cx = w / 2;
      const cy = h * 0.54;
      const skeleton = drawBuildingSkeleton(cx, cy);

      roles.slice(0, 12).forEach((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = cx - skeleton.bw * 0.36 + col * (skeleton.bw * 0.24);
        const y = cy - skeleton.bh * 0.22 + row * (skeleton.floorH * 1.45);
        const isActive = i === activeRef.current;
        const scale = Math.min(w, h) / (isActive ? 560 : 690);

        drawWorker(x, y, scale, i);
      });

      const pathY = cy + skeleton.bh / 2 + 48;
      ctx.beginPath();
      ctx.moveTo(cx - skeleton.bw / 2 - 40, pathY);
      ctx.lineTo(cx + skeleton.bw / 2 + 40, pathY);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 16; i++) {
        const p = (time * 0.12 + i / 16) % 1;
        const x = cx - skeleton.bw / 2 - 30 + (skeleton.bw + 60) * p;
        const y = pathY - 20 + Math.sin(p * Math.PI) * -20;

        drawWorker(x, y, Math.min(w, h) / 850, i);
      }

      drawRoleBadge(cx, cy - skeleton.bh / 2 - 54, activeRef.current);

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
      className="font-arimo relative overflow-visible bg-[var(--color-primary-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[#CFF7BC]" />

      <svg
        className="absolute left-0 top-0 h-[120px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H1440V45C1180 95 900 20 720 55C470 100 230 70 0 25V0Z"
          fill="var(--color-primary-bg)"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0 150V95C210 35 470 75 720 52C980 28 1210 55 1440 105V150H0Z"
          fill="#CFF7BC"
        />
      </svg>
      <div className="container mx-auto overflow-visible px-4 sm:px-6 lg:px-8">
        <div className="role-reveal mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 inline-block border-b border-black text-sm font-medium text-black">
            Roles We Recruit
          </p>

          <h2 className="text-4xl font-normal tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">
            {["Skilled", "construction", "teams", "for", "every", "site"].map(
              (word) => (
                <span key={word} className="inline-block overflow-hidden px-1">
                  <span className="role-word inline-block">{word}</span>
                </span>
              ),
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/70">
            We recruit trade workers, technical staff, equipment operators and
            site leadership roles for construction projects.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="role-reveal relative h-[440px] sm:h-[560px] lg:sticky lg:top-24 lg:h-[650px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {roles.map(({ icon: Icon, ...role }, index) => {
              const isActive = active === index;

              return (
                <button
                  type="button"
                  key={role.title}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`role-card flex min-h-[210px] w-full flex-col rounded-[26px] border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-black bg-[#FFF9E6]"
                      : "border-black/10 bg-[#FFF9E6]/80 hover:border-black/30"
                  }`}
                >
                  <div
                    className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: role.color }}
                  >
                    <Icon size={22} strokeWidth={2.4} />
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                    {role.group}
                  </p>

                  <h3 className="text-base font-bold tracking-[-0.02em] text-black">
                    {role.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {role.text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesWeRecruit;
